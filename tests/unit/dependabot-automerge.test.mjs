import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { parse } from 'yaml';
import {
  isCurrentDependabotPull,
  eligibleBumpSubject,
} from '../../scripts/deployment/dependabot-automerge.mjs';

const sha = 'a'.repeat(40);
const repository = 'mtmarctoni/chispaconcalma';
const author = { login: 'dependabot[bot]' };
const repo = { full_name: repository };
const pull = {
  state: 'open',
  draft: false,
  user: author,
  commits: 1,
  base: { ref: 'main', repo },
  head: { sha, repo },
};

test('only the current single-commit Dependabot PR to main can be merged', () => {
  assert.equal(isCurrentDependabotPull(pull, repository, sha), true);
  for (const change of [
    { state: 'closed' },
    { draft: true },
    { user: { login: 'contributor' } },
    { commits: 2 },
    { base: { ...pull.base, ref: 'other' } },
    { head: { ...pull.head, sha: 'b'.repeat(40) } },
    { head: { ...pull.head, repo: { full_name: 'fork/chispaconcalma' } } },
  ]) {
    assert.equal(
      isCurrentDependabotPull({ ...pull, ...change }, repository, sha),
      false,
    );
  }
});

function signedBump(
  from,
  to,
  subject = `chore(deps): bump urllib3 from ${from} to ${to}`,
) {
  return {
    sha,
    author,
    commit: { message: subject, verification: { verified: true } },
    parents: [{ sha: 'b'.repeat(40) }],
    files: [
      {
        filename: 'requirements.txt',
        status: 'modified',
        additions: 1,
        deletions: 1,
        patch: `@@ -1 +1 @@\n-urllib3==${from}\n+urllib3==${to}`,
      },
    ],
  };
}

test('only verified forward minor and patch bumps qualify', () => {
  for (const [from, to, allowed] of [
    ['1.2.3', '1.2.10', true],
    ['2.9.0', '2.10.0', true],
    ['1.2.3', '2.0.0', false],
    ['1.2.3', '1.2.2', false],
    ['1.2.3', '1.2.3', false],
    ['1.2.3', '1.3.0-rc.1', false],
  ]) {
    const bump = signedBump(from, to);
    assert.equal(
      eligibleBumpSubject(bump, sha),
      allowed ? bump.commit.message : null,
    );
  }
  const bump = signedBump('1.2.3', '1.3.0');
  assert.equal(eligibleBumpSubject(bump, 'b'.repeat(40)), null);
  assert.equal(
    eligibleBumpSubject({ ...bump, author: { login: 'contributor' } }, sha),
    null,
  );
  assert.equal(
    eligibleBumpSubject(
      {
        ...bump,
        commit: { ...bump.commit, verification: { verified: false } },
      },
      sha,
    ),
    null,
  );
});

test('a signed security update qualifies only within the same major', () => {
  for (const [to, qualifies] of [
    ['2.8.0', true],
    ['3.0.0', false],
  ]) {
    const subject = `chore(deps): [Security] Bump urllib3 from 2.6.3 to ${to}`;
    const bump = signedBump('2.6.3', to, subject);
    assert.equal(eligibleBumpSubject(bump, sha), qualifies ? subject : null);
  }
});

test('the signed subject must match the sole change to the dependency pin', () => {
  const bump = signedBump('2.6.3', '2.8.0');
  const [file] = bump.files;
  assert.equal(eligibleBumpSubject(bump, sha), bump.commit.message);
  assert.equal(
    eligibleBumpSubject(
      signedBump(
        '2.6.3',
        '2.8.0',
        'chore(deps): bump the dependencies group with 2 updates',
      ),
      sha,
    ),
    null,
  );
  assert.equal(
    eligibleBumpSubject(
      { ...bump, files: [file, { filename: '.github/workflows/checks.yml' }] },
      sha,
    ),
    null,
  );
  assert.equal(
    eligibleBumpSubject({ ...bump, parents: [...bump.parents, { sha }] }, sha),
    null,
  );
  for (const change of [
    { filename: 'pnpm-lock.yaml' },
    { status: 'renamed' },
    { additions: 2 },
    { patch: undefined },
    { patch: file.patch.replace('+urllib3==2.8.0', '+urllib3==3.0.0') },
    { patch: file.patch.replaceAll('urllib3', 'requests') },
    { patch: `${file.patch}\n-requests==2.0.0\n+requests==3.0.0` },
  ]) {
    assert.equal(
      eligibleBumpSubject({ ...bump, files: [{ ...file, ...change }] }, sha),
      null,
    );
  }
});

function modifiedFile(filename, ...hunks) {
  const lines = hunks.join('\n').split('\n');
  return {
    filename,
    status: 'modified',
    additions: lines.filter((line) => line.startsWith('+')).length,
    deletions: lines.filter((line) => line.startsWith('-')).length,
    patch: hunks.join('\n'),
  };
}

function pnpmLock(name, version, specifier = `^${version}`) {
  return {
    lockfileVersion: '9.0',
    settings: { autoInstallPeers: true },
    importers: {
      '.': {
        dependencies: {
          [name]: { specifier, version },
          react: { specifier: '^19.3.1', version: '19.3.1' },
        },
      },
    },
    packages: {
      [`${name}@${version}`]: { resolution: { integrity: 'sha512-YWJj' } },
      'react@19.3.1': { resolution: { integrity: 'sha512-ZGVm' } },
    },
    snapshots: { [`${name}@${version}`]: {}, 'react@19.3.1': {} },
  };
}

test('accepts a scoped pnpm minor bump with a manifest and lockfile update', () => {
  const subject = 'chore(deps-dev): bump @astrojs/check from 0.9.12 to 0.10.0';
  const manifest = modifiedFile(
    'package.json',
    '@@ -27 +27 @@\n-    "@astrojs/check": "^0.9.12",\n+    "@astrojs/check": "^0.10.0",',
  );
  const lock = modifiedFile(
    'pnpm-lock.yaml',
    "@@ -64,2 +64,2 @@\n-  '@astrojs/check@0.9.12':\n-    resolution: {integrity: sha512-old}\n+  '@astrojs/check@0.10.0':\n+    resolution: {integrity: sha512-new}",
  );
  const bump = { ...signedBump('', '', subject), files: [manifest, lock] };
  const locks = [
    pnpmLock('@astrojs/check', '0.9.12'),
    pnpmLock('@astrojs/check', '0.10.0'),
  ];
  assert.equal(eligibleBumpSubject(bump, sha, '', locks), subject);
  for (const files of [
    [manifest],
    [manifest, { ...lock, patch: undefined }],
    [manifest, lock, modifiedFile('pnpm-workspace.yaml', '-a\n+b')],
    [
      {
        ...manifest,
        patch: manifest.patch.replace('^0.10.0', '^1.0.0'),
      },
      lock,
    ],
  ]) {
    assert.equal(eligibleBumpSubject({ ...bump, files }, sha, '', locks), null);
  }
});

test('accepts a pnpm lockfile-only patch while keeping major bumps manual', () => {
  const subject = 'chore(deps): bump astro from 7.4.13 to 7.4.14';
  const lock = modifiedFile(
    'pnpm-lock.yaml',
    '@@ -64,2 +64,2 @@\n-  astro@7.4.13:\n-    resolution: {integrity: sha512-old}\n+  astro@7.4.14:\n+    resolution: {integrity: sha512-new}',
  );
  const bump = { ...signedBump('', '', subject), files: [lock] };
  const locks = [
    pnpmLock('astro', '7.4.13'),
    pnpmLock('astro', '7.4.14', '^7.4.13'),
  ];
  assert.equal(eligibleBumpSubject(bump, sha, '', locks), subject);
  assert.equal(eligibleBumpSubject(bump, sha), null);
  assert.equal(
    eligibleBumpSubject(
      {
        ...bump,
        commit: { ...bump.commit, message: subject.replace('7.4.14', '8.0.0') },
        files: [{ ...lock, patch: lock.patch.replace('7.4.14', '8.0.0') }],
      },
      sha,
      '',
      locks,
    ),
    null,
  );
});

test('pnpm rejects unrelated importer, registry and settings changes', () => {
  const subject = 'chore(deps): bump astro from 7.4.13 to 7.4.14';
  const lock = modifiedFile(
    'pnpm-lock.yaml',
    '@@ -64 +64 @@\n-  astro@7.4.13:\n+  astro@7.4.14:',
  );
  const bump = { ...signedBump('', '', subject), files: [lock] };
  const before = pnpmLock('astro', '7.4.13');
  const after = pnpmLock('astro', '7.4.14', '^7.4.13');
  for (const tamper of [
    (lock) => {
      lock.importers['.'].dependencies.react.version = '20.0.0';
    },
    (lock) => {
      lock.settings.autoInstallPeers = false;
    },
    (lock) => {
      lock.packages['react@19.3.1'].resolution.integrity = 'sha512-YWJj';
    },
    (lock) => {
      lock.packages['astro@7.4.14'].resolution.tarball =
        'https://example.com/package.tgz';
    },
    (lock) => {
      lock.snapshots['react@19.3.1'].dependencies = { unrelated: '2.0.0' };
    },
  ]) {
    const changed = structuredClone(after);
    tamper(changed);
    assert.equal(eligibleBumpSubject(bump, sha, '', [before, changed]), null);
  }
  const wrongBase = pnpmLock('astro', '7.4.12');
  assert.equal(eligibleBumpSubject(bump, sha, '', [wrongBase, after]), null);
});

test('accepts a patch to the same SHA-pinned action across workflows', () => {
  const subject = 'chore(deps): bump actions/checkout from v6.0.1 to v6.0.2';
  const oldRef = 'a'.repeat(40);
  const newRef = 'c'.repeat(40);
  const diff = `@@ -22 +22 @@\n-      - uses: actions/checkout@${oldRef} # v6\n+      - uses: actions/checkout@${newRef} # v6.0.2`;
  const checks = modifiedFile('.github/workflows/checks.yml', diff);
  const preview = modifiedFile('.github/workflows/preview.yml', diff);
  const bump = { ...signedBump('', '', subject), files: [checks, preview] };
  assert.equal(eligibleBumpSubject(bump, sha), subject);
  for (const changed of [
    modifiedFile(checks.filename, diff, '@@ -28 +28 @@\n-  read\n+  write'),
    { ...checks, patch: diff.replace(newRef, 'v6.0.2') },
    {
      ...checks,
      patch: diff.replaceAll('actions/checkout', 'actions/setup-node'),
    },
    { ...checks, patch: diff.replace(newRef, 'd'.repeat(40)) },
    { ...checks, patch: diff.replace('+      ', '@@ -30 +30 @@\n+      ') },
    { ...checks, patch: diff.replace('# v6.0.2', '# v7.0.0') },
    { ...checks, additions: 2 },
    { ...checks, filename: '.github/dependabot.yml' },
  ]) {
    assert.equal(
      eligibleBumpSubject({ ...bump, files: [changed, preview] }, sha),
      null,
    );
  }
  assert.equal(
    eligibleBumpSubject(
      {
        ...bump,
        commit: {
          ...bump.commit,
          message: subject.replace('v6.0.2', 'v7.0.0'),
        },
      },
      sha,
    ),
    null,
  );
});

test('a third-party action needs approval for the exact replacement SHA', () => {
  const subject = 'chore(deps): bump pnpm/action-setup from 4.2.0 to 4.2.1';
  const oldRef = 'a'.repeat(40);
  const newRef = 'b'.repeat(40);
  const workflow = modifiedFile(
    '.github/workflows/checks.yml',
    `@@ -26 +26 @@\n-      - uses: pnpm/action-setup@${oldRef} # v4\n+      - uses: pnpm/action-setup@${newRef} # v4.2.1`,
  );
  const bump = { ...signedBump('', '', subject), files: [workflow] };
  assert.equal(eligibleBumpSubject(bump, sha), null);
  assert.equal(eligibleBumpSubject(bump, sha, 'pnpm/action-setup@*'), null);
  assert.equal(
    eligibleBumpSubject(bump, sha, `pnpm/action-setup@${newRef}`),
    subject,
  );
});

test('the workflow refuses an incomplete commit file list', async () => {
  const preview = parse(
    await readFile('.github/workflows/preview.yml', 'utf8'),
  );
  const step = preview.jobs['classify-dependabot'].steps.find(
    (candidate) => candidate.id === 'eligible',
  );
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  const classify = new AsyncFunction(
    'require',
    'process',
    'github',
    'context',
    'core',
    step.with.script,
  );
  const bump = signedBump('1.2.3', '1.2.4');
  for (const changedFiles of [1, 2]) {
    const result = await classify(
      createRequire(new URL('../../package.json', import.meta.url)),
      {
        env: {
          EXPECTED_SHA: sha,
          GITHUB_REPOSITORY: repository,
          PR_NUMBER: '1',
        },
      },
      {
        rest: {
          pulls: {
            get: async () => ({
              data: { ...pull, changed_files: changedFiles },
            }),
          },
          repos: { getCommit: async () => ({ data: bump }) },
        },
      },
      { repo: { owner: 'mtmarctoni', repo: 'chispaconcalma' } },
      { setOutput() {} },
    );
    assert.equal(result, changedFiles === 1);
  }
});

test('the merge job waits for successful Preview and sends GitHub the checked head SHA', async () => {
  const preview = parse(
    await readFile('.github/workflows/preview.yml', 'utf8'),
  );
  const job = preview.jobs['merge-dependabot'];
  const classify = preview.jobs['classify-dependabot'];
  assert.deepEqual(classify.needs, ['identify', 'e2e', 'notify']);
  assert.match(classify.if, /DEPENDABOT_AUTOMERGE_ENABLED == 'true'/);
  assert.equal(classify.environment, undefined);
  assert.deepEqual(job.needs, ['identify', 'classify-dependabot']);
  assert.equal(job.if, "needs.classify-dependabot.outputs.subject != ''");
  assert.doesNotMatch(job.if, /always\(|failure\(|cancelled\(|success\(/);
  assert.equal(job.environment, 'dependabot-automerge');
  assert.equal(job.env.EXPECTED_SHA, '${{ needs.identify.outputs.sha }}');
  const merge = job.steps.at(-1);
  assert.match(
    job.steps.find((step) => step.id === 'app').with['permission-workflows'],
    /workflow_update == 'true' && 'write'/,
  );
  assert.match(
    merge.with.script,
    /pulls\.merge\(\{\s*\.\.\.params, sha, merge_method: 'squash'/,
  );
});

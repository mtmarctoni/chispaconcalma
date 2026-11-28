import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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

test('the merge job waits for successful Preview and sends GitHub the checked head SHA', async () => {
  const preview = parse(
    await readFile('.github/workflows/preview.yml', 'utf8'),
  );
  const job = preview.jobs['merge-dependabot'];
  assert.deepEqual(job.needs, ['identify', 'e2e', 'notify']);
  assert.match(job.if, /DEPENDABOT_AUTOMERGE_ENABLED == 'true'/);
  assert.doesNotMatch(job.if, /always\(|failure\(|cancelled\(|success\(/);
  assert.equal(job.environment, 'dependabot-automerge');
  assert.equal(job.env.EXPECTED_SHA, '${{ needs.identify.outputs.sha }}');
  const merge = job.steps.at(-1);
  assert.equal(merge.if, "steps.eligible.outputs.result == 'true'");
  assert.match(
    merge.with.script,
    /pulls\.merge\(\{\s*\.\.\.params, sha, merge_method: 'squash'/,
  );
});

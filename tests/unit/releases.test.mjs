import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

test('release policy pins a published stable tag and refuses unsafe substitutions', async () => {
  const { validateRelease } =
    await import('../../scripts/releases/resolve-release.mjs');
  const sha = 'a'.repeat(40);
  const valid = {
    tag: 'v0.1.0',
    release: {
      tag_name: 'v0.1.0',
      draft: false,
      prerelease: false,
      published_at: '2026-11-21T00:00:00Z',
    },
    tagSha: sha,
    gitSha: sha,
    expectedSha: sha,
    isAncestor: true,
  };
  assert.deepEqual(validateRelease(valid), { tag: 'v0.1.0', sha });
  // Older published tags are accepted without substituting main HEAD.
  assert.deepEqual(validateRelease({ ...valid, expectedSha: undefined }), {
    tag: 'v0.1.0',
    sha,
  });
  for (const change of [
    { tag: 'v01.0.0' },
    { tag: 'v1.0.0; echo unsafe' },
    { tag: 'main' },
    { release: null },
    { release: { ...valid.release, draft: true } },
    { release: { ...valid.release, prerelease: true } },
    { release: { ...valid.release, published_at: null } },
    { release: { ...valid.release, tag_name: 'v0.2.0' } },
    { tagSha: 'b'.repeat(40) },
    { gitSha: 'b'.repeat(40) },
    { expectedSha: 'b'.repeat(40) },
    { isAncestor: false },
    { tagSha: 'not-a-sha' },
  ])
    assert.throws(
      () => validateRelease({ ...valid, ...change }),
      /release|tag|commit/i,
    );
});

test('production resolver refuses disabled or off-main execution before external operations', async (t) => {
  const dir = await mkdtemp(path.join(tmpdir(), 'chispa-release-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const output = path.join(dir, 'output');
  await writeFile(output, '');
  for (const env of [
    { PRODUCTION_DEPLOY_ENABLED: '', GITHUB_REF: 'refs/heads/main' },
    {
      PRODUCTION_DEPLOY_ENABLED: 'true',
      GITHUB_REF: 'refs/heads/owner/change',
    },
  ]) {
    const result = spawnSync(
      process.execPath,
      ['scripts/releases/resolve-release.mjs'],
      {
        env: { ...process.env, ...env, GITHUB_OUTPUT: output },
        encoding: 'utf8',
      },
    );
    assert.notEqual(result.status, 0);
    assert.match(
      result.stderr,
      /Production deployment is disabled|Production deployment must run from main/,
    );
  }
  assert.equal(await readFile(output, 'utf8'), '');
});

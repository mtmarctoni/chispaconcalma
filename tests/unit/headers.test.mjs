import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

test('deployment CSP hashes inline hydration without enabling arbitrary inline scripts', async (t) => {
  const directory = await mkdtemp(path.join(tmpdir(), 'chispa-headers-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await writeFile(
    path.join(directory, 'index.html'),
    '<script>alert(1)</script>',
  );
  const result = spawnSync(
    process.execPath,
    ['scripts/staging/add-headers.mjs', directory],
    { encoding: 'utf8' },
  );
  assert.equal(result.status, 0, result.stderr);
  const headers = await readFile(path.join(directory, '_headers'), 'utf8');
  assert.ok(
    headers.includes("'sha256-bhHHL3z2vDgxUt0W3dWQOrprscmda2Y5pLsLg4GF+pI='"),
  );
  assert.doesNotMatch(headers, /script-src[^;]*'unsafe-inline'/);
  assert.match(headers, /Cache-Control: no-store/);
});

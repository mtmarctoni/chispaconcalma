import assert from 'node:assert/strict';
import {
  mkdtemp,
  mkdir,
  writeFile,
  symlink,
  rm,
  readFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const sha = '1234567890abcdef1234567890abcdef12345678';
const run = (script, args = [], env = {}) =>
  spawnSync(process.execPath, [`scripts/staging/${script}.mjs`, ...args], {
    encoding: 'utf8',
    env: { ...process.env, ...env },
  });

async function fixture(t) {
  const dir = await mkdtemp(path.join(tmpdir(), 'chispa-test-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await writeFile(path.join(dir, 'index.html'), '<h1>Staging</h1>');
  await writeFile(path.join(dir, 'deployment.json'), JSON.stringify({ sha }));
  return dir;
}

test('metadata writes the requested commit rather than an implicit or stale revision', async (t) => {
  const dir = await fixture(t);
  const next = 'abcdef1234567890abcdef1234567890abcdef12';
  const result = run('metadata', [dir], { BUILD_SHA: next });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(
    JSON.parse(await readFile(path.join(dir, 'deployment.json'))),
    { sha: next },
  );
});

test('metadata refuses invalid revisions', async (t) => {
  const dir = await fixture(t);
  const result = run('metadata', [dir], { BUILD_SHA: '../../bad' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /40-character/);
});

test('static validator accepts local site assets and exact revision', async (t) => {
  const dir = await fixture(t);
  await mkdir(path.join(dir, '_astro'));
  await writeFile(
    path.join(dir, '_astro', 'home.js'),
    'console.log("client code")',
  );
  const result = run('validate-assets', [dir], { EXPECTED_SHA: sha });
  assert.equal(result.status, 0, result.stderr);
});

for (const filename of [
  '_worker.js',
  '_redirects',
  '_headers',
  'cloudflare.config.ts',
  '.env',
  'escape.sh',
]) {
  test(`static validator rejects deployment control or executable file ${filename}`, async (t) => {
    const dir = await fixture(t);
    await writeFile(path.join(dir, filename), 'untrusted');
    const result = run('validate-assets', [dir], { EXPECTED_SHA: sha });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Forbidden|Unsupported/);
  });
}

test('static validator rejects symlinks instead of following them', async (t) => {
  const dir = await fixture(t);
  await symlink('/etc/passwd', path.join(dir, 'leak.txt'));
  const result = run('validate-assets', [dir], { EXPECTED_SHA: sha });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /link/i);
});

test('static validator rejects a stale revision', async (t) => {
  const dir = await fixture(t);
  const result = run('validate-assets', [dir], {
    EXPECTED_SHA: 'f'.repeat(40),
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /revision/i);
});

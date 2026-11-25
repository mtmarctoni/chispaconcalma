import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { install } from '../../scripts/git-hooks/install.mjs';

// Isolate from the developer's or runner's own Git configuration.
process.env.GIT_CONFIG_GLOBAL = '/dev/null';
process.env.GIT_CONFIG_NOSYSTEM = '1';

const quiet = () => {};

function git(cwd, ...args) {
  return spawnSync(
    'git',
    ['-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', ...args],
    { cwd, encoding: 'utf8' },
  );
}

async function repo(t) {
  const dir = await mkdtemp(path.join(tmpdir(), 'chispa-hooks-'));
  t.after(() => rm(dir, { force: true, recursive: true }));
  assert.equal(git(dir, 'init', '-q', '-b', 'main').status, 0);
  return dir;
}

function prePush(dir, remoteRef) {
  return spawnSync(path.join(dir, '.git/hooks/pre-push'), ['origin', 'url'], {
    cwd: dir,
    encoding: 'utf8',
    input: `refs/heads/task abc ${remoteRef} def\n`,
  });
}

test('guard refuses commits on main and allows task branches', async (t) => {
  const dir = await repo(t);
  const result = await install(dir, quiet);
  assert.deepEqual(result.installed.sort(), [
    'pre-commit',
    'pre-merge-commit',
    'pre-push',
  ]);

  const onMain = git(dir, 'commit', '-q', '--allow-empty', '-m', 'x');
  assert.notEqual(onMain.status, 0);
  assert.match(onMain.stderr, /BLOQUEADO/);
  assert.equal(git(dir, 'rev-list', '--all').stdout, '');

  assert.equal(git(dir, 'switch', '-q', '-c', 'owner/task').status, 0);
  const onTask = git(dir, 'commit', '-q', '--allow-empty', '-m', 'x');
  assert.equal(onTask.status, 0, onTask.stderr);
});

test('guard refuses merge commits on main', async (t) => {
  const dir = await repo(t);
  await install(dir, quiet);
  assert.equal(git(dir, 'switch', '-q', '-c', 'base').status, 0);
  assert.equal(git(dir, 'commit', '-q', '--allow-empty', '-m', 'a').status, 0);
  assert.equal(git(dir, 'branch', 'owner/task').status, 0);
  assert.equal(git(dir, 'commit', '-q', '--allow-empty', '-m', 'b').status, 0);
  assert.equal(git(dir, 'switch', '-q', 'owner/task').status, 0);
  assert.equal(git(dir, 'commit', '-q', '--allow-empty', '-m', 'c').status, 0);
  assert.equal(git(dir, 'switch', '-q', '-c', 'main', 'base').status, 0);

  const merge = git(dir, 'merge', '--no-ff', '--no-edit', 'owner/task');
  assert.notEqual(merge.status, 0);
  assert.match(merge.stderr, /BLOQUEADO/);
});

test('guard refuses pushes to main only', async (t) => {
  const dir = await repo(t);
  await install(dir, quiet);
  const toMain = prePush(dir, 'refs/heads/main');
  assert.equal(toMain.status, 1);
  assert.match(toMain.stderr, /BLOQUEADO/);
  assert.equal(prePush(dir, 'refs/heads/owner/task').status, 0);
});

test('installer keeps hooks it did not install', async (t) => {
  const dir = await repo(t);
  const own = path.join(dir, '.git/hooks/pre-commit');
  await writeFile(own, '#!/bin/sh\nexit 0\n');
  const result = await install(dir, quiet);
  assert.deepEqual(result.skipped, ['pre-commit']);
  assert.equal(await readFile(own, 'utf8'), '#!/bin/sh\nexit 0\n');
});

test('installer respects a configured core.hooksPath', async (t) => {
  const dir = await repo(t);
  assert.equal(git(dir, 'config', 'core.hooksPath', 'custom').status, 0);
  const result = await install(dir, quiet);
  assert.deepEqual(result.installed, []);
});

test('installer skips directories outside Git', async (t) => {
  const dir = await mkdtemp(path.join(tmpdir(), 'chispa-nogit-'));
  t.after(() => rm(dir, { force: true, recursive: true }));
  const result = await install(dir, quiet);
  assert.deepEqual(result.installed, []);
});

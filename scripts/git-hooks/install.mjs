// Installs the local main-branch guard hooks into the shared Git hooks folder,
// so every worktree of this clone is covered. Runs from `pnpm install` (prepare).
// It never overwrites a hook it did not install and never fails the install.
import { spawnSync } from 'node:child_process';
import { chmod, copyFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKER = 'chispaconcalma-main-guard';
const SOURCE_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'hooks',
);
// Git calls pre-merge-commit before recording an automatic merge commit.
const HOOKS = {
  'pre-commit': 'pre-commit',
  'pre-merge-commit': 'pre-commit',
  'pre-push': 'pre-push',
};

function git(cwd, ...args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : null;
}

async function readIfExists(file) {
  try {
    return await readFile(file, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

export async function install(cwd = process.cwd(), log = console.log) {
  const commonDir = git(
    cwd,
    'rev-parse',
    '--path-format=absolute',
    '--git-common-dir',
  );
  if (!commonDir) {
    log('git-hooks: not a Git checkout; skipped.');
    return { installed: [], skipped: Object.keys(HOOKS) };
  }
  if (git(cwd, 'config', '--get', 'core.hooksPath') !== null) {
    log('git-hooks: core.hooksPath is set; main guard not installed.');
    return { installed: [], skipped: Object.keys(HOOKS) };
  }
  const hooksDir = path.join(commonDir, 'hooks');
  await mkdir(hooksDir, { recursive: true });
  const installed = [];
  const skipped = [];
  for (const [name, source] of Object.entries(HOOKS)) {
    const target = path.join(hooksDir, name);
    const existing = await readIfExists(target);
    if (existing !== null && !existing.includes(MARKER)) {
      log(`git-hooks: ${name} already exists and was not replaced.`);
      skipped.push(name);
      continue;
    }
    await copyFile(path.join(SOURCE_DIR, source), target);
    await chmod(target, 0o755);
    installed.push(name);
  }
  return { installed, skipped };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.env.CI) {
    console.log('git-hooks: CI detected; skipped.');
  } else {
    try {
      const { installed } = await install();
      if (installed.length) {
        console.log(
          `git-hooks: main guard installed (${installed.join(', ')}).`,
        );
      }
    } catch (error) {
      console.warn(`git-hooks: could not install main guard: ${error.message}`);
    }
  }
}

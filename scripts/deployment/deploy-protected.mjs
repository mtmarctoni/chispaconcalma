import { spawnSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  isValidPassword,
  isValidUsername,
  passwordBinding,
  protectedOrigin,
  usernameBinding,
} from './prelaunch-access.mjs';

const [mode] = process.argv.slice(2);
protectedOrigin(mode, process.env.DEPLOY_URL);
const {
  DEPLOY_SHA: sha,
  [usernameBinding]: username,
  [passwordBinding]: password,
} = process.env;
if (!/^[a-f0-9]{40}$/.test(sha || '')) {
  throw new Error('Expected an exact deployment SHA');
}
if (!isValidUsername(username)) {
  throw new Error(`${usernameBinding} must be a nonempty URL-safe username`);
}
if (!isValidPassword(password)) {
  throw new Error(`${passwordBinding} must be a nonempty URL-safe password`);
}

const directory = await mkdtemp(path.join(os.tmpdir(), 'prelaunch-auth-'));
try {
  const secrets = path.join(directory, 'secrets.json');
  await writeFile(
    secrets,
    JSON.stringify({
      [usernameBinding]: username,
      [passwordBinding]: password,
    }),
    { mode: 0o600 },
  );
  const {
    [usernameBinding]: _username,
    [passwordBinding]: _password,
    ...env
  } = process.env;
  const result = spawnSync(
    'pnpm',
    [
      'exec',
      'cf',
      'deploy',
      '--prebuilt',
      '--mode',
      mode,
      '--no-provision',
      '--message',
      sha,
      '--secrets-file',
      secrets,
    ],
    { env, stdio: 'inherit' },
  );
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  await rm(directory, { recursive: true, force: true });
}

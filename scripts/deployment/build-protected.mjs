import { copyFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  cleanBuildOutputDir,
  getWorkerBundleDir,
  writeAssets,
  writeRootConfig,
  writeWorkerConfig,
} from '@cloudflare/build-output-utils';
import { bindings } from 'cf/config';
import cloudflareConfig from '../../cloudflare.config.ts';

const [mode, directory] = process.argv.slice(2);
if (!['staging', 'production'].includes(mode) || !directory) {
  throw new Error(
    'Expected staging or production and a validated asset directory',
  );
}
const root = process.cwd();
const sourceDirectory = path.resolve(root, directory);
const buildContext = { mode, isPreview: false };
const { worker } = cloudflareConfig(buildContext);

// Deploy workflows generate this file from the trusted header template after validation.
const sourceHeaders = await readFile(
  path.join(sourceDirectory, '_headers'),
  'utf8',
);
const [wildcard] = sourceHeaders.trimEnd().split(/\r?\n\r?\n/);
const [route, ...lines] = wildcard.split(/\r?\n/);
if (route !== '/*') throw new Error('Missing trusted wildcard headers');
const headers = new Headers(
  lines.map((line) => {
    const [, name, value] = /^\s+([\w-]+): (.+)$/.exec(line) || [];
    if (!name) throw new Error('Invalid trusted wildcard header');
    return [name, value];
  }),
);
for (const name of [
  'content-security-policy',
  'x-content-type-options',
  'permissions-policy',
  'referrer-policy',
]) {
  if (!headers.has(name)) throw new Error(`Missing trusted header: ${name}`);
}
headers.delete('X-Robots-Tag'); // The Worker sets this on every response.

await cleanBuildOutputDir(root);
await writeRootConfig({ root, buildContext });
await writeAssets({ root, sourceDirectory });
const bundleDirectory = getWorkerBundleDir(root);
await mkdir(bundleDirectory, { recursive: true });
const mainModule = path.basename(worker.entrypoint);
const modules = {
  [mainModule]: { type: 'esm' },
  'prelaunch-access.mjs': { type: 'esm' },
};
for (const module of Object.keys(modules)) {
  await copyFile(
    new URL(module, import.meta.url),
    path.join(bundleDirectory, module),
  );
}
await writeWorkerConfig({
  root,
  config: {
    ...worker,
    env: {
      ...worker.env,
      PRELAUNCH_SITE_HEADERS: bindings.json(Object.fromEntries(headers)),
    },
  },
  manifest: { type: 'complete', mainModule, modules },
});

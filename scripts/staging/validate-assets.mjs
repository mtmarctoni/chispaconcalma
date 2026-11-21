import { lstat, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'dist');
const allowed = new Set([
  '.html',
  '.css',
  '.js',
  '.json',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.avif',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.txt',
  '.xml',
  '.pdf',
]);
let count = 0;
let bytes = 0;

async function walk(directory) {
  for (const name of await readdir(directory)) {
    const file = path.join(directory, name);
    const info = await lstat(file);
    if (info.isSymbolicLink()) throw new Error(`Forbidden symlink: ${name}`);
    if (
      name.startsWith('.') ||
      /^_(?:worker|headers|redirects|routes)/i.test(name) ||
      /^(?:wrangler|cloudflare|package|pnpm-lock)/i.test(name)
    ) {
      throw new Error(`Forbidden deployment control file: ${name}`);
    }
    if (info.isDirectory()) {
      await walk(file);
    } else if (info.isFile()) {
      if (!allowed.has(path.extname(name)))
        throw new Error(`Unsupported asset: ${name}`);
      if (info.size > 25 * 1024 * 1024)
        throw new Error(`Asset too large: ${name}`);
      count++;
      bytes += info.size;
      if (count > 2000 || bytes > 100 * 1024 * 1024)
        throw new Error('Artifact exceeds staging budget');
    } else {
      throw new Error(`Forbidden special file: ${name}`);
    }
  }
}

await walk(root);
await lstat(path.join(root, 'index.html'));
const metadata = JSON.parse(
  await readFile(path.join(root, 'deployment.json'), 'utf8'),
);
const expected = process.env.EXPECTED_SHA;
if (
  !/^[a-f0-9]{40}$/.test(metadata.sha || '') ||
  Object.keys(metadata).length !== 1 ||
  (expected && metadata.sha !== expected)
) {
  throw new Error('Deployment revision is invalid or stale');
}
console.log(
  `Validated ${count} static assets (${bytes} bytes), revision ${metadata.sha}`,
);

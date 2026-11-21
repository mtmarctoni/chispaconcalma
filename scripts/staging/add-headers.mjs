import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2]);
const hashes = new Set();
async function collect(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) await collect(file);
    else if (item.name.endsWith('.html')) {
      const html = await readFile(file, 'utf8');
      for (const match of html.matchAll(
        /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi,
      )) {
        if (/\bsrc\s*=/i.test(match[1]) || !match[2].trim()) continue;
        hashes.add(
          `'sha256-${createHash('sha256').update(match[2]).digest('base64')}'`,
        );
      }
    }
  }
}
await collect(root);
if (hashes.size > 100)
  throw new Error('Too many inline scripts for staging CSP');
const template = await readFile(
  new URL('./headers.txt', import.meta.url),
  'utf8',
);
await writeFile(
  path.join(root, '_headers'),
  template.replace('__SCRIPT_HASHES__', [...hashes].join(' ')),
);
console.log(
  `Added trusted headers with ${hashes.size} inline hydration script hashes`,
);

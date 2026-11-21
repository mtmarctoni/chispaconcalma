import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const sha = process.env.BUILD_SHA;
if (!/^[a-f0-9]{40}$/.test(sha || '')) {
  throw new Error('BUILD_SHA must be a 40-character lowercase commit SHA');
}
await writeFile(
  path.join(process.argv[2] || 'dist', 'deployment.json'),
  JSON.stringify({ sha }) + '\n',
);

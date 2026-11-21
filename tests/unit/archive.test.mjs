import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

async function archive(t, entries) {
  const dir = await mkdtemp(path.join(tmpdir(), 'chispa-zip-'));
  t.after(() => rm(dir, { force: true, recursive: true }));
  const zip = path.join(dir, 'input.zip');
  const result = spawnSync(
    'python3',
    [
      '-c',
      'import zipfile,json,sys\nwith zipfile.ZipFile(sys.argv[1],"w") as z:\n for name,data in json.loads(sys.argv[2]):z.writestr(name,data)',
      zip,
      JSON.stringify(entries),
    ],
    { encoding: 'utf8' },
  );
  assert.equal(result.status, 0, result.stderr);
  return { zip, output: path.join(dir, 'output') };
}

test('extractor accepts an ordinary static artifact', async (t) => {
  const { zip, output } = await archive(t, [['index.html', 'hello']]);
  const result = spawnSync(
    'python3',
    ['scripts/staging/extract-artifact.py', zip, output],
    { encoding: 'utf8' },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    await readFile(path.join(output, 'index.html'), 'utf8'),
    'hello',
  );
});

for (const entries of [
  [['../outside.html', 'bad']],
  [['/absolute.html', 'bad']],
  [
    ['index.html', 'one'],
    ['index.html', 'two'],
  ],
  [['folder\\escape.html', 'bad']],
  [['folder/../index.html', 'bad']],
]) {
  test(`extractor rejects unsafe paths or duplicate entries: ${entries.map((e) => e[0]).join(', ')}`, async (t) => {
    const { zip, output } = await archive(t, entries);
    const result = spawnSync(
      'python3',
      ['scripts/staging/extract-artifact.py', zip, output],
      { encoding: 'utf8' },
    );
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Unsafe|Duplicate/);
  });
}

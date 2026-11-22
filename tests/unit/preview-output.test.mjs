import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { parse } from 'yaml';

// Format inspected in pinned cf's static-assets module: UUID.slice(0, 8) + suffix.
const output = `Uploaded chispaconcalma-staging (1 sec)
Worker Version ID: 1234abcd-1234-1234-1234-123456789abc
Version Preview URL: https://1234abcd-chispaconcalma-staging.example.workers.dev
Version Preview Alias URL: https://pr-42-chispaconcalma-staging.example.workers.dev
`;
const options = {
  workerName: 'chispaconcalma-staging',
  accountSubdomain: 'example',
  pr: 42,
};
test('preview output returns validated immutable version and per-PR alias', async () => {
  const { parsePreviewOutput } =
    await import('../../scripts/deployment/preview-output.mjs');
  assert.deepEqual(parsePreviewOutput(output, options), {
    versionUrl: 'https://1234abcd-chispaconcalma-staging.example.workers.dev',
    aliasUrl: 'https://pr-42-chispaconcalma-staging.example.workers.dev',
  });
  for (const text of [
    '',
    output.replaceAll('example.workers.dev', 'evil.workers.dev'),
    output.replaceAll('chispaconcalma-staging', 'production'),
    output.replace('pr-42-', 'pr-43-'),
    output.replace('https://1234abcd-', 'https://user:pass@1234abcd-'),
    output.replace('https://1234abcd-', 'https://aaaaaaaa-'),
    output + output,
  ])
    assert.throws(() => parsePreviewOutput(text, options), /preview/i);
});

test('preview parser accepts cf guide prefixes while preserving origin and ambiguity checks', async () => {
  const { parsePreviewOutput } =
    await import('../../scripts/deployment/preview-output.mjs');
  // Real cf 1.0.0-rc.2 output observed in Preview run 45006380415.
  const rendered =
    output
      .trimEnd()
      .split('\n')
      .map((line) => `\x1b[90m│\x1b[0m  ${line}`)
      .join('\r\n') + '\r\n';
  assert.deepEqual(parsePreviewOutput(rendered, options), {
    versionUrl: 'https://1234abcd-chispaconcalma-staging.example.workers.dev',
    aliasUrl: 'https://pr-42-chispaconcalma-staging.example.workers.dev',
  });
  for (const text of [
    rendered + rendered,
    rendered.replaceAll('example.workers.dev', 'evil.workers.dev'),
    rendered.replace('pr-42-', 'pr-43-'),
    rendered.replace('https://1234abcd-', 'https://aaaaaaaa-'),
  ])
    assert.throws(() => parsePreviewOutput(text, options), /preview/i);
});

test('actual preview upload shell captures cf stderr for the parser', async (t) => {
  const directory = await mkdtemp(
    path.join(tmpdir(), 'chispa-preview-output-'),
  );
  t.after(() => rm(directory, { recursive: true, force: true }));
  // Substitute only the external CLI; execute the actual workflow shell unchanged.
  await writeFile(
    path.join(directory, 'pnpm'),
    '#!/bin/sh\nprintf "%s" "$CF_RESULT" >&2\n',
    { mode: 0o755 },
  );
  const workflow = parse(
    await readFile('.github/workflows/preview.yml', 'utf8'),
  );
  const upload = workflow.jobs.upload.steps.find((step) =>
    step.name?.startsWith('Upload version only'),
  );
  const result = spawnSync('bash', ['-e', '-c', upload.run], {
    cwd: directory,
    encoding: 'utf8',
    env: {
      PATH: `${directory}:/usr/bin:/bin`,
      PR_NUMBER: '42',
      DEPLOY_SHA: 'a'.repeat(40),
      CF_RESULT: output,
    },
  });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(
    await readFile(path.join(directory, 'preview-upload.log'), 'utf8'),
    output,
    'cf writes version results to stderr, not stdout',
  );
});

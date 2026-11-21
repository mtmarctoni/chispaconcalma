import assert from 'node:assert/strict';
import { test } from 'node:test';

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

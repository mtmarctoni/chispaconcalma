import assert from 'node:assert/strict';
import { test } from 'node:test';

test('main deployment accepts only successful Checks for the current main head', async () => {
  const { selectMainRun } =
    await import('../../scripts/deployment/main-policy.mjs');
  const sha = 'a'.repeat(40);
  const repository = 'developer/site';
  const run = {
    event: 'push',
    status: 'completed',
    conclusion: 'success',
    path: '.github/workflows/checks.yml',
    workflow_id: 12,
    head_branch: 'main',
    head_sha: sha,
    repository: { full_name: repository },
    head_repository: { full_name: repository },
  };
  const options = { repository, workflowId: 12, currentMainSha: sha };
  assert.deepEqual(selectMainRun(run, options), { sha });
  for (const change of [
    { event: 'pull_request' },
    { head_branch: 'v1.0.0' },
    { workflow_id: 13 },
    { conclusion: 'failure' },
    { path: '.github/workflows/evil.yml' },
    { head_repository: { full_name: 'fork/site' } },
  ]) {
    assert.throws(() => selectMainRun({ ...run, ...change }, options));
  }
  assert.throws(
    () => selectMainRun(run, { ...options, currentMainSha: 'b'.repeat(40) }),
    /obsolete/,
  );
});

import assert from 'node:assert/strict';
import { test } from 'node:test';

const sha = 'a'.repeat(40);
const repository = 'developer/site';
const run = {
  id: 10,
  run_attempt: 1,
  event: 'pull_request',
  status: 'completed',
  conclusion: 'success',
  workflow_id: 12,
  path: '.github/workflows/checks.yml',
  head_sha: sha,
  repository: { full_name: repository },
  head_repository: { full_name: repository },
};
const pr = {
  number: 42,
  draft: true,
  state: 'open',
  head: { sha, repo: { full_name: repository } },
  base: { ref: 'main', repo: { full_name: repository } },
};

test('preview identifies drafts and failures without weakening deployment eligibility', async () => {
  const { selectPreviewRun } =
    await import('../../scripts/deployment/context.mjs');
  assert.equal(selectPreviewRun(run, [pr], repository, 12).number, 42);
  assert.equal(
    selectPreviewRun(
      { ...run, conclusion: 'failure' },
      [pr],
      repository,
      12,
      true,
    ).number,
    42,
  );
  for (const changed of [
    { conclusion: 'failure' },
    { event: 'push' },
    { workflow_id: 99 },
    { head_repository: { full_name: 'fork/site' } },
  ]) {
    assert.throws(() =>
      selectPreviewRun({ ...run, ...changed }, [pr], repository, 12),
    );
  }
  for (const prs of [
    [],
    [pr, pr],
    [{ ...pr, state: 'closed' }],
    [{ ...pr, head: { ...pr.head, sha: 'b'.repeat(40) } }],
  ]) {
    assert.throws(() => selectPreviewRun(run, prs, repository, 12));
  }
});

test('artifact selection requires one bounded unexpired artifact from the exact run', async () => {
  const { selectArtifact } =
    await import('../../scripts/deployment/artifact.mjs');
  const artifact = {
    id: 20,
    name: 'staging-assets',
    expired: false,
    size_in_bytes: 100,
    workflow_run: { id: 10, head_sha: sha },
  };
  assert.equal(selectArtifact([artifact], run).id, 20);
  for (const artifacts of [
    [],
    [artifact, artifact],
    [{ ...artifact, expired: true }],
    [{ ...artifact, id: '20' }],
    [{ ...artifact, size_in_bytes: 100 * 1024 * 1024 + 1 }],
    [{ ...artifact, workflow_run: { id: 11, head_sha: sha } }],
    [{ ...artifact, workflow_run: { id: 10, head_sha: 'b'.repeat(40) } }],
  ]) {
    assert.throws(() => selectArtifact(artifacts, run), /artifact/);
  }
});

test('trigger identity rejects replayed attempts and substituted API runs', async () => {
  const { verifyTrigger } =
    await import('../../scripts/deployment/context.mjs');
  verifyTrigger({ workflow_run: run }, run);
  for (const change of [
    { id: 11 },
    { run_attempt: 2 },
    { head_sha: 'b'.repeat(40) },
  ]) {
    assert.throws(
      () => verifyTrigger({ workflow_run: run }, { ...run, ...change }),
      /trigger/,
    );
  }
});

test('download enforces an actual streamed byte limit, not only declared size', async () => {
  const { readBounded } = await import('../../scripts/deployment/artifact.mjs');
  assert.deepEqual(
    await readBounded(new Response('zip'), 3),
    new TextEncoder().encode('zip'),
  );
  await assert.rejects(
    () => readBounded(new Response('oversized'), 3),
    /limit/,
  );
});

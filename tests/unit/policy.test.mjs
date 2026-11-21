import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  selectPullRequest,
  validateStagingUrl,
} from '../../scripts/staging/policy.mjs';

const sha = 'a'.repeat(40);
const repository = 'developer/chispaconcalma';
const run = {
  event: 'pull_request',
  conclusion: 'success',
  status: 'completed',
  path: '.github/workflows/checks.yml',
  head_sha: sha,
  workflow_id: 12,
  repository: { full_name: repository },
  head_repository: { full_name: repository },
};
const pr = {
  number: 42,
  state: 'open',
  head: { sha, repo: { full_name: repository } },
  base: { ref: 'main', repo: { full_name: repository } },
};

test('deployment selects the current open same-repository PR from a successful checks run', () => {
  assert.equal(selectPullRequest(run, [pr], repository, 12).number, 42);
});

test('failed Checks can identify the current PR for failure reporting, but cannot deploy it', () => {
  const failed = { ...run, conclusion: 'failure' };
  assert.equal(
    selectPullRequest(failed, [pr], repository, 12, { requireSuccess: false })
      .number,
    42,
  );
  assert.throws(
    () => selectPullRequest(failed, [pr], repository, 12),
    /Untrusted/,
  );
});

for (const [name, change] of [
  ['fork', { head_repository: { full_name: 'stranger/fork' } }],
  ['push event', { event: 'push' }],
  ['failed run', { conclusion: 'failure' }],
  ['wrong workflow', { workflow_id: 13 }],
  ['wrong workflow path', { path: '.github/workflows/other.yml' }],
  ['wrong repository', { repository: { full_name: 'stranger/site' } }],
]) {
  test(`deployment refuses ${name}`, () => {
    assert.throws(
      () => selectPullRequest({ ...run, ...change }, [pr], repository, 12),
      /Untrusted/,
    );
  });
}

test('outdated or closed PR cannot overwrite staging', () => {
  assert.throws(
    () =>
      selectPullRequest(
        run,
        [{ ...pr, head: { ...pr.head, sha: 'b'.repeat(40) } }],
        repository,
        12,
      ),
    /current/,
  );
  assert.throws(
    () => selectPullRequest(run, [{ ...pr, state: 'closed' }], repository, 12),
    /current/,
  );
});

test('a PR targeting a non-default review branch is not published', () => {
  assert.throws(
    () =>
      selectPullRequest(
        run,
        [{ ...pr, base: { ...pr.base, ref: 'other' } }],
        repository,
        12,
      ),
    /current/,
  );
});

test('staging URL must be an HTTPS origin without credentials, query, fragment or path', () => {
  assert.equal(
    validateStagingUrl('https://staging.example.com/'),
    'https://staging.example.com',
  );
  for (const url of [
    'http://example.com',
    'https://user:pass@example.com',
    'https://example.com/path',
    'https://example.com?x=y',
    'https://example.com/#secret',
    '',
  ]) {
    assert.throws(() => validateStagingUrl(url), /STAGING_URL/);
  }
});

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

test('merge methods preserve required checks and developer-only update authority', async () => {
  const checks = JSON.parse(
    await readFile('ops/github/main-checks.json', 'utf8'),
  );
  const authority = JSON.parse(
    await readFile('ops/github/main-authority.json', 'utf8'),
  );
  const pr = checks.rules.find((rule) => rule.type === 'pull_request');
  assert.deepEqual(pr.parameters.allowed_merge_methods, ['squash', 'rebase']);
  assert.deepEqual(checks.bypass_actors, []);
  assert.equal(checks.enforcement, 'active');
  assert.equal(pr.parameters.required_review_thread_resolution, true);
  const gate = checks.rules.find(
    (rule) => rule.type === 'required_status_checks',
  );
  assert.equal(gate.parameters.strict_required_status_checks_policy, true);
  assert.deepEqual(gate.parameters.required_status_checks, [
    { context: 'Validate', integration_id: 15368 },
    { context: 'preview/e2e', integration_id: 15368 },
  ]);
  assert.equal(authority.enforcement, 'active');
  assert.deepEqual(authority.bypass_actors, [
    { actor_id: 5, actor_type: 'RepositoryRole', bypass_mode: 'pull_request' },
  ]);
  for (const type of ['creation', 'update', 'deletion', 'non_fast_forward']) {
    assert.ok(authority.rules.some((rule) => rule.type === type));
  }
});

test('preview credentials are restricted to main without admin bypass or tag access', async () => {
  const environment = JSON.parse(
    await readFile('ops/github/preview-environment.json', 'utf8'),
  );
  const policy = JSON.parse(
    await readFile('ops/github/preview-main-policy.json', 'utf8'),
  );
  assert.equal(environment.can_admins_bypass, false);
  assert.deepEqual(environment.deployment_branch_policy, {
    protected_branches: false,
    custom_branch_policies: true,
  });
  assert.deepEqual(policy, { name: 'main', type: 'branch' });
  assert.equal(environment.secrets, undefined);
});

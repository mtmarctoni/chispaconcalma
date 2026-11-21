import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { parse } from 'yaml';

async function workflow(name) {
  return parse(await readFile(`.github/workflows/${name}.yml`, 'utf8'));
}

test('preview upload cannot deploy live traffic or execute PR tooling with credentials', async () => {
  const preview = await workflow('preview');
  assert.equal(preview.on.workflow_run.workflows[0], 'Checks');
  assert.equal(preview.concurrency['cancel-in-progress'], false);
  assert.match(preview.concurrency.group, /head_branch/);
  const steps = Object.values(preview.jobs).flatMap((job) => job.steps || []);
  for (const step of steps.filter((s) =>
    s.uses?.startsWith('actions/checkout@'),
  )) {
    assert.equal(step.with.ref, '${{ github.workflow_sha }}');
    assert.equal(step.with['persist-credentials'], false);
  }
  const credentialSteps = steps.filter((s) => s.env?.CLOUDFLARE_API_TOKEN);
  assert.equal(credentialSteps.length, 1);
  assert.match(
    credentialSteps[0].run,
    /cf workers versions create .* --mode preview /,
  );
  assert.doesNotMatch(credentialSteps[0].run, /cf deploy|--mode production/);
  assert.equal(preview.jobs.upload.environment, 'preview');
  assert.equal(preview.jobs.e2e.environment, undefined);
  assert.match(
    preview.jobs.e2e.steps.find((s) => s.run === 'pnpm test:e2e').env
      .PLAYWRIGHT_BASE_URL,
    /version_url/,
  );
  assert.doesNotMatch(preview.jobs.upload.if, /draft/);
  const legacy = await workflow('staging');
  assert.ok(legacy.jobs.deploy);
  const rules = JSON.parse(
    await readFile('ops/github/main-checks.json', 'utf8'),
  );
  assert.ok(
    rules.rules
      .find((r) => r.type === 'required_status_checks')
      .parameters.required_status_checks.some(
        (s) => s.context === 'staging/e2e',
      ),
  );
});

test('main staging is opt-in, consumes checked assets and serializes deployment with E2E', async () => {
  const staging = await workflow('deploy-staging');
  assert.match(staging.jobs.identify.if, /MAIN_STAGING_ENABLED == 'true'/);
  assert.equal(staging.concurrency['cancel-in-progress'], false);
  assert.equal(staging.jobs.deploy.environment, 'staging');
  assert.match(staging.jobs.deploy.if, /eligible == 'true'/);
  const deploy = staging.jobs.deploy.steps.find(
    (s) => s.env?.CLOUDFLARE_API_TOKEN,
  );
  assert.match(deploy.run, /cf deploy .* --mode staging --no-provision/);
  assert.equal(staging.jobs.e2e.environment, undefined);
  const checks = await workflow('checks');
  const stamp = checks.jobs.validate.steps.find(
    (s) => s.run === 'pnpm staging:metadata',
  );
  assert.equal(stamp.if, undefined);
  assert.match(stamp.env.BUILD_SHA, /github.sha/);
});

test('production is opt-in, resolves before building and deploys through trusted main tooling', async () => {
  const prod = await workflow('deploy-production');
  assert.match(prod.jobs.resolve.if, /PRODUCTION_DEPLOY_ENABLED == 'true'/);
  assert.match(prod.jobs.resolve.if, /refs\/heads\/main/);
  assert.deepEqual(prod.jobs.build.needs, 'resolve');
  assert.equal(prod.jobs.build.environment, undefined);
  const buildSteps = prod.jobs.build.steps;
  assert.equal(
    buildSteps.find((s) => s.uses?.startsWith('actions/checkout@')).with.ref,
    '${{ needs.resolve.outputs.sha }}',
  );
  assert.ok(!JSON.stringify(prod.jobs.build).includes('secrets.'));
  for (const job of [prod.jobs.deploy, prod.jobs.e2e]) {
    assert.equal(
      job.steps.find((s) => s.uses?.startsWith('actions/checkout@')).with.ref,
      '${{ github.sha }}',
    );
  }
  assert.equal(prod.jobs.deploy.environment, 'production');
  assert.equal(prod.jobs.e2e.environment, undefined);
  assert.equal(prod.concurrency['cancel-in-progress'], false);
  assert.equal(prod.on.workflow_call.secrets, undefined);
  const release = await workflow('release-please');
  assert.match(release.jobs.release.if, /RELEASE_AUTOMATION_ENABLED == 'true'/);
  assert.equal(release.jobs.release.environment, 'release');
  assert.equal(release.jobs['deploy-production'].secrets, undefined);
  const callerPermissions = {
    ...release.permissions,
    ...release.jobs['deploy-production'].permissions,
  };
  // Reusable workflows may reduce, but cannot elevate, the caller's permissions.
  const rank = { none: 0, read: 1, write: 2 };
  for (const job of Object.values(prod.jobs)) {
    for (const [scope, access] of Object.entries(job.permissions || {})) {
      assert.ok(
        (rank[callerPermissions[scope]] ?? 0) >= rank[access],
        `Release caller cannot grant production ${scope}: ${access}`,
      );
    }
  }
  assert.deepEqual(release.jobs['deploy-production'].permissions, {
    contents: 'read',
    actions: 'read',
  });
  const config = JSON.parse(
    await readFile('release-please-config.json', 'utf8'),
  );
  assert.equal(config['draft-pull-request'], true);
  assert.equal(config['bump-minor-pre-major'], false);
  assert.equal(config['bump-patch-for-minor-pre-major'], false);
});

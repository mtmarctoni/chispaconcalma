import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { parse } from 'yaml';

test('prelaunch robots allow discovery of noindex without advertising a sitemap', async () => {
  const robots = await readFile('public/robots.txt', 'utf8');
  assert.deepEqual(robots.trim().split(/\r?\n/), ['User-agent: *', 'Allow: /']);
  assert.doesNotMatch(robots, /^(?:Disallow|Sitemap|Noindex)\s*:/im);
});

test('all deployment paths retain trusted noindex injection', async () => {
  for (const [name, job, directory, command] of [
    [
      'preview',
      'upload',
      'preview-assets',
      'cf workers versions create ./preview-assets',
    ],
    [
      'deploy-staging',
      'deploy',
      'staging-assets',
      'node scripts/deployment/deploy-protected.mjs staging',
    ],
    [
      'deploy-production',
      'deploy',
      'production-assets',
      'node scripts/deployment/deploy-protected.mjs production',
    ],
  ]) {
    const workflow = parse(
      await readFile(`.github/workflows/${name}.yml`, 'utf8'),
    );
    const steps = workflow.jobs[job].steps;
    const injection = steps.findIndex(
      (step) =>
        step.run === `node scripts/staging/add-headers.mjs ${directory}`,
    );
    const deployment = steps.findIndex(
      (step) => step.env?.CLOUDFLARE_API_TOKEN && step.run?.includes(command),
    );
    assert.ok(injection >= 0, `${name} must inject trusted noindex headers`);
    assert.ok(
      deployment > injection,
      `${name} must inject headers into the deployed directory before publishing`,
    );
  }
});

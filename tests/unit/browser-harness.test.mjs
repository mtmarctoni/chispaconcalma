import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { assertDeployedRobots } from '../support/deployed-robots.mjs';

const version =
  'https://e5c3f5b7-chispaconcalma-staging.mtmarctoni.workers.dev';

test('immutable previews accept Cloudflare noindex but reject missing or positive directives', () => {
  for (const path of ['/', '/robots.txt', '/assets/portrait.png']) {
    assertDeployedRobots(`${version}${path}`, 'noindex');
    assertDeployedRobots(`${version}${path}`, 'NOINDEX, NOFOLLOW');
    for (const header of [
      '',
      'nofollow',
      'noindex, index',
      'noindex, follow',
      'noindex, all',
    ]) {
      assert.throws(() => assertDeployedRobots(`${version}${path}`, header));
    }
  }
});

test('live origins, aliases and lookalike hosts still require nofollow', () => {
  for (const url of [
    'https://chispaconcalma-staging.mtmarctoni.workers.dev',
    'https://chispaconcalma.com',
    'https://pr-12-chispaconcalma-staging.mtmarctoni.workers.dev',
    `${version}.example.com`,
    version.replace('https:', 'http:'),
    `${version}:8443`,
  ]) {
    assert.throws(() => assertDeployedRobots(url, 'noindex'));
    assertDeployedRobots(url, 'noindex, nofollow');
  }
});

function readConfig(overrides) {
  const env = { ...process.env };
  delete env.CI;
  delete env.PLAYWRIGHT_BASE_URL;
  Object.assign(env, overrides);
  const result = spawnSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      "import config from './playwright.config.ts'; console.log(JSON.stringify(config))",
    ],
    { env, encoding: 'utf8' },
  );
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test('local and CI browser tests own a foreground server away from the dev port', () => {
  for (const env of [{}, { CI: 'true' }]) {
    const config = readConfig(env);
    assert.equal(config.webServer.reuseExistingServer, false);
    assert.match(config.webServer.command, /--ignore-lock\b/);
    assert.equal(config.webServer.url, config.use.baseURL);
    assert.notEqual(new URL(config.use.baseURL).port, '4321');
    assert.ok(
      config.webServer.command.includes(
        `--port ${new URL(config.use.baseURL).port}`,
      ),
    );
  }
});

test('explicit deployment URLs do not start a local server', () => {
  const config = readConfig({ PLAYWRIGHT_BASE_URL: version });
  assert.equal(config.webServer, undefined);
  assert.equal(config.use.baseURL, version);
});

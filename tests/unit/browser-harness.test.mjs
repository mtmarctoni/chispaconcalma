import assert from 'node:assert/strict';
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

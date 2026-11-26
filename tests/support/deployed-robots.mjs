import assert from 'node:assert/strict';

export function assertDeployedRobots(url, header = '') {
  const origin = new URL(url);
  // Cloudflare replaces X-Robots-Tag on version previews with its own noindex.
  // Only immutable staging-version URLs get this exception, never live origins
  // or PR aliases. HTML's noindex,nofollow is checked independently in E2E.
  const versionPreview =
    origin.protocol === 'https:' &&
    !origin.port &&
    /^[a-f0-9]{8}-chispaconcalma-staging\.[a-z0-9-]+\.workers\.dev$/.test(
      origin.hostname,
    );
  const directives = header.toLowerCase().split(/\s*,\s*/);
  for (const required of versionPreview
    ? ['noindex']
    : ['noindex', 'nofollow']) {
    assert.ok(directives.includes(required), `${url}: missing ${required}`);
  }
  for (const forbidden of ['index', 'follow', 'all']) {
    assert.ok(!directives.includes(forbidden), `${url}: contains ${forbidden}`);
  }
}

import { expect, test } from '@playwright/test';
import { assertDeployedRobots } from '../support/deployed-robots.mjs';

test('protected site requires credentials for pages, metadata and assets', async ({
  playwright,
  request,
  baseURL,
}) => {
  test.skip(
    !process.env.PRELAUNCH_AUTH_MODE,
    'Only live staging and production require Basic Auth',
  );

  const anonymous = await playwright.request.newContext({ baseURL });
  try {
    for (const path of [
      '/',
      '/index.html',
      '/robots.txt',
      '/deployment.json',
      '/assets/portrait.png',
    ]) {
      const response = await anonymous.get(path, { maxRedirects: 0 });
      expect(response.status(), path).toBe(401);
      expect(response.headers()['www-authenticate']).toMatch(/^Basic realm=/);
      expect(response.headers()['cache-control']).toContain('no-store');
      assertDeployedRobots(response.url(), response.headers()['x-robots-tag']);
      expect(await response.text()).toBe('');
    }

    const rejected = await anonymous.get('/', {
      headers: { Authorization: 'Basic d3Jvbmc6d3Jvbmc=' },
      maxRedirects: 0,
    });
    expect(rejected.status()).toBe(401);
  } finally {
    await anonymous.dispose();
  }

  const authorized = await request.get('/');
  expect(authorized.status()).toBe(200);
  expect(authorized.headers()['cache-control']).toContain('no-store');
  expect(authorized.headers()['content-security-policy']).toContain(
    "default-src 'self'",
  );
  assertDeployedRobots(authorized.url(), authorized.headers()['x-robots-tag']);
});

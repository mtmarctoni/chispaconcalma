import assert from 'node:assert/strict';
import { test } from 'node:test';
import config from '../../cloudflare.config.ts';
import { protectedOrigin } from '../../scripts/deployment/prelaunch-access.mjs';
import worker from '../../scripts/deployment/prelaunch-worker.mjs';

const password = 'local_test_password_only___123456789';
const username = 'staging-reviewer';
const authorization = 'Basic ' + btoa(username + ':' + password);
const makeRequest = (path, headers) =>
  new Request('https://test.example' + path, { headers });

test('protected deployment modes run the authentication Worker before all assets', () => {
  const staging = config({ mode: 'staging' }).worker;
  const production = config({ mode: 'production' }).worker;
  const preview = config({ mode: 'preview' }).worker;
  for (const worker of [staging, production]) {
    assert.equal(worker.assets.runWorkerFirst, true);
    assert.equal(worker.workersDev, true);
    assert.equal(worker.env.BASIC_AUTH_USERNAME.type, 'secret');
    assert.equal(worker.env.BASIC_AUTH_PASSWORD.type, 'secret');
    assert.match(worker.entrypoint, /prelaunch-worker\.mjs$/);
  }
  assert.equal(staging.previewUrls, true);
  assert.equal(production.previewUrls, false);
  assert.equal(preview.entrypoint, undefined);
});

test('protected browser credentials are limited to the correct HTTPS Worker origin', () => {
  const origin = 'https://chispaconcalma.mtmarctoni.workers.dev';
  assert.equal(protectedOrigin('production', origin + '/'), origin);
  for (const url of [
    origin.replace('https:', 'http:'),
    origin + '/path',
    origin + '?q=1',
    origin + '.example.com',
    'https://chispaconcalma-staging.mtmarctoni.workers.dev',
  ]) {
    assert.throws(() => protectedOrigin('production', url));
  }
});

test('absent or wrong credentials never reach the asset binding', async () => {
  const env = {
    BASIC_AUTH_USERNAME: username,
    BASIC_AUTH_PASSWORD: password,
    ASSETS: {
      fetch: () => assert.fail('Anonymous request reached the assets'),
    },
  };
  for (const path of [
    '/',
    '/index.html',
    '/deployment.json',
    '/robots.txt',
    '/assets/portrait.png',
  ]) {
    for (const headers of [
      {},
      { Authorization: 'Basic d3Jvbmc6d3Jvbmc=' },
      { Authorization: 'Basic ' + btoa('review:' + password) },
    ]) {
      const response = await worker.fetch(makeRequest(path, headers), env);
      assert.equal(response.status, 401);
      assert.match(response.headers.get('WWW-Authenticate'), /^Basic realm=/);
      assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
      assert.match(response.headers.get('Cache-Control'), /no-store/);
      assert.equal(await response.text(), '');
    }
  }
  for (const unsetPassword of [undefined, '', 'short']) {
    const response = await worker.fetch(
      makeRequest('/', { Authorization: authorization }),
      {
        ...env,
        BASIC_AUTH_PASSWORD: unsetPassword,
      },
    );
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  }
  for (const invalidUsername of [
    undefined,
    '',
    'has:colon',
    'has space',
    'ñ',
  ]) {
    const response = await worker.fetch(
      makeRequest('/', { Authorization: authorization }),
      { ...env, BASIC_AUTH_USERNAME: invalidUsername },
    );
    assert.equal(response.status, 503);
    assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  }
});

test('authorized assets preserve response status and stay private and unindexable', async () => {
  const response = await worker.fetch(
    makeRequest('/page', { Authorization: authorization }),
    {
      BASIC_AUTH_USERNAME: username,
      BASIC_AUTH_PASSWORD: password,
      PRELAUNCH_SITE_HEADERS: {
        'Content-Security-Policy': "default-src 'self'",
      },
      ASSETS: {
        fetch(request) {
          assert.equal(request.headers.has('Authorization'), false);
          return new Response(null, {
            status: 301,
            headers: {
              Location: '/page/',
              'Cache-Control': 'public, max-age=3600',
            },
          });
        },
      },
    },
  );
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('Location'), '/page/');
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
  assert.equal(
    response.headers.get('Content-Security-Policy'),
    "default-src 'self'",
  );
});

import {
  isValidPassword,
  isValidUsername,
  passwordBinding,
  usernameBinding,
} from './prelaunch-access.mjs';

const encoder = new TextEncoder();

async function matchesCredentials(header, username, password) {
  const credentials = /^Basic +([A-Za-z0-9+/]+={0,2})$/i.exec(
    header || '',
  )?.[1];
  if (!credentials) return false;

  const [actual, expected] = await Promise.all(
    [credentials, btoa(`${username}:${password}`)].map(
      async (value) =>
        new Uint8Array(
          await crypto.subtle.digest('SHA-256', encoder.encode(value)),
        ),
    ),
  );
  let difference = 0;
  for (let index = 0; index < actual.length; index++) {
    difference |= actual[index] ^ expected[index];
  }
  return difference === 0;
}

function protectedHeaders(headers) {
  const result = new Headers(headers);
  result.set('X-Robots-Tag', 'noindex, nofollow');
  result.set('Cache-Control', 'private, no-store');
  return result;
}

export default {
  async fetch(request, env) {
    const password = env[passwordBinding];
    const username = env[usernameBinding];
    if (!isValidUsername(username) || !isValidPassword(password)) {
      return new Response(null, { status: 503, headers: protectedHeaders() });
    }
    if (
      !(await matchesCredentials(
        request.headers.get('Authorization'),
        username,
        password,
      ))
    ) {
      const headers = protectedHeaders();
      headers.set(
        'WWW-Authenticate',
        'Basic realm="Chispa con Calma", charset="UTF-8"',
      );
      return new Response(null, { status: 401, headers });
    }

    const assetRequest = new Request(request);
    assetRequest.headers.delete('Authorization');
    const asset = await env.ASSETS.fetch(assetRequest);
    const headers = new Headers(asset.headers);
    for (const [name, value] of Object.entries(env.PRELAUNCH_SITE_HEADERS)) {
      headers.set(name, value);
    }
    return new Response(asset.body, {
      status: asset.status,
      headers: protectedHeaders(headers),
    });
  },
};

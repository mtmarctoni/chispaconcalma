import assert from 'node:assert/strict';
import { test } from 'node:test';

test('explicit modes keep previews on staging and production isolated', async () => {
  const { resolveTarget } =
    await import('../../scripts/deployment/targets.mjs');
  assert.deepEqual(resolveTarget('preview'), {
    name: 'chispaconcalma-staging',
  });
  assert.deepEqual(resolveTarget('staging'), {
    name: 'chispaconcalma-staging',
  });
  assert.deepEqual(resolveTarget('production'), { name: 'chispaconcalma' });
  for (const mode of [undefined, '', 'prod', '../../production']) {
    assert.throws(() => resolveTarget(mode), /explicit.*mode/);
  }
});

test('deployment origins reject credentials and non-origin URLs', async () => {
  const { validateOrigin } =
    await import('../../scripts/deployment/targets.mjs');
  assert.equal(
    validateOrigin('https://staging.example.com/'),
    'https://staging.example.com',
  );
  for (const value of [
    '',
    'http://example.com',
    'https://u:p@example.com',
    'https://example.com/path',
    'https://example.com?x=1',
    'https://example.com/#x',
  ]) {
    assert.throws(() => validateOrigin(value), /HTTPS origin/);
  }
});

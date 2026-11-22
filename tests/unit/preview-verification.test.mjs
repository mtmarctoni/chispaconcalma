import assert from 'node:assert/strict';
import test from 'node:test';

test('temporary preview trial intentionally rejects this revision', () => {
  assert.fail('Authorized negative-control fixture; do not merge this test.');
});

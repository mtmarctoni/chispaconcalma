import { validateStagingUrl } from '../staging/policy.mjs';

export function resolveTarget(mode) {
  if (!['preview', 'staging', 'production'].includes(mode)) {
    throw new Error(
      'An explicit preview, staging or production mode is required',
    );
  }
  return {
    name: mode === 'production' ? 'chispaconcalma' : 'chispaconcalma-staging',
  };
}

export function validateOrigin(value) {
  return validateStagingUrl(value);
}

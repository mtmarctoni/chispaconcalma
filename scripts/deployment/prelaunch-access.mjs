export const usernameBinding = 'BASIC_AUTH_USERNAME';
export const passwordBinding = 'BASIC_AUTH_PASSWORD';

export function isValidUsername(username) {
  return typeof username === 'string' && /^[A-Za-z0-9_-]+$/.test(username);
}

export function isValidPassword(password) {
  return typeof password === 'string' && /^[A-Za-z0-9_-]{32,}$/.test(password);
}

export function protectedOrigin(mode, value) {
  const workers = {
    staging: 'chispaconcalma-staging',
    production: 'chispaconcalma',
  };
  if (!Object.hasOwn(workers, mode)) {
    throw new Error('Prelaunch authentication requires staging or production');
  }
  const origin = new URL(value).origin;
  if (
    origin !== `https://${workers[mode]}.mtmarctoni.workers.dev` ||
    (value !== origin && value !== `${origin}/`)
  ) {
    throw new Error(
      'Prelaunch authentication requires the configured HTTPS Worker origin',
    );
  }
  return origin;
}

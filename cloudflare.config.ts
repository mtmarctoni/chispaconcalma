import { bindings, defineConfig } from 'cf/config';
import {
  passwordBinding,
  usernameBinding,
} from './scripts/deployment/prelaunch-access.mjs';
import { resolveTarget } from './scripts/deployment/targets.mjs';

export default defineConfig(({ mode }) => ({
  worker: {
    ...resolveTarget(mode),
    compatibilityDate: '2026-11-21',
    // PR previews still use the checked static assets and their own version URLs.
    ...(mode !== 'preview' && {
      entrypoint: './scripts/deployment/prelaunch-worker.mjs',
      assets: { runWorkerFirst: true },
      env: {
        ASSETS: bindings.assets(),
        [usernameBinding]: bindings.secret(),
        [passwordBinding]: bindings.secret(),
      },
      workersDev: true,
      previewUrls: mode === 'staging',
    }),
  },
}));

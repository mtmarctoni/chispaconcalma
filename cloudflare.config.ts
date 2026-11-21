import { defineConfig } from 'cf/config';

// Static assets only. Intentionally no production mode, bindings or entrypoint.
export default defineConfig({
  worker: {
    name: 'chispaconcalma-staging',
    compatibilityDate: '2026-11-21',
  },
});

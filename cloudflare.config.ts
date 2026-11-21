import { defineConfig } from 'cf/config';
import { resolveTarget } from './scripts/deployment/targets.mjs';

// Static assets only. Preview uploads versions of staging without shifting traffic.
export default defineConfig(({ mode }) => ({
  worker: {
    ...resolveTarget(mode),
    compatibilityDate: '2026-11-21',
  },
}));

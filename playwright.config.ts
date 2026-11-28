import { defineConfig, devices } from '@playwright/test';
import {
  isValidPassword,
  isValidUsername,
  protectedOrigin,
} from './scripts/deployment/prelaunch-access.mjs';

const mode = process.env.PRELAUNCH_AUTH_MODE;
const username = process.env.BASIC_AUTH_USERNAME;
const password = process.env.BASIC_AUTH_PASSWORD;
const deployedUrl = process.env.PLAYWRIGHT_BASE_URL;
if (
  mode &&
  (!deployedUrl || !isValidUsername(username) || !isValidPassword(password))
) {
  throw new Error(
    'Protected browser checks require a deployment URL and valid credentials',
  );
}
const httpCredentials = mode
  ? {
      origin: protectedOrigin(mode, deployedUrl),
      username: username!,
      password: password!,
      send: 'always' as const,
    }
  : undefined;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4322',
    reducedMotion: 'reduce',
    httpCredentials,
    trace: httpCredentials ? 'off' : 'retain-on-failure',
    screenshot: httpCredentials ? 'off' : 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        // Keep Astro in the foreground even when invoked by an agent. A separate
        // port and no reuse prevent tests from exercising another checkout.
        command: 'pnpm preview --port 4322 --ignore-lock',
        url: 'http://127.0.0.1:4322',
        reuseExistingServer: false,
      },
});

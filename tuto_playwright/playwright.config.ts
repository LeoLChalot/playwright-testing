import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',
  timeout: 8_000,
  retries: 1,
  use: {
    trace: 'on-first-retry'
  },
  // use: {
  //   // Base URL to use in actions like `await page.goto('/')`.
  //   baseURL: 'http://127.0.0.1:3000',

  //   // Collect trace when retrying the failed test.
  //   trace: 'on-first-retry',
  // },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Run your local dev server before starting the tests.
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
}

export default config
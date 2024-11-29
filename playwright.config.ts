import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { TESTS } from './src/config/environment';

dotenv.config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: process.env.TESTS === 'ui' ? './src/ui/tests' : './src/api/tests',
  globalTeardown: require.resolve('./src/config/global-teardown.ts'),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    [
      'allure-playwright',
      {
        // detail: true,
        outputFolder: 'allure-results',
        suiteTitle: false
      }
    ]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/, use: { headless: true } },
    {
      name: 'ui',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        storageState: 'src/.auth/user.json'
      },
      dependencies: ['setup'],
      testMatch: /.*\.spec\.ts/
    },

    {
      name: 'api',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        headless: true
      }
    },

    {
      name: 'visual',
      use: {
        ...devices['Desktop Chrome'],
        headless: true
      },
      testMatch: /.*\.visual\.ts/
    }
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"], headless: false },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"], headless: false },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

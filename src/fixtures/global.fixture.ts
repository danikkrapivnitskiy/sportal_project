import { test as base, expect, type Page } from '@playwright/test';
import { screenshotManager } from '../utils/report/screenshot';
import { logger } from '../utils/report/logger';

/**
 * Extended test fixture that automatically captures screenshots on test failures
 * and performs other global setup/teardown operations
 */
export const test = base.extend<{ autoScreenshot: null }>({
  // Override the page fixture to add logging
  page: async ({ page }: { page: Page }, use: (page: Page) => Promise<void>): Promise<void> => {
    // Setup - runs before each test that uses the page fixture
    logger.info('Starting test with page fixture');
    
    // Override page.goto to add logging
    const originalGoto = page.goto.bind(page);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    page.goto = async (url: string, options?: any): Promise<any> => {
      logger.info(`Navigating to: ${url}`);
      return await originalGoto(url, options);
    };
    
    // Use the page in the test
    await use(page);
    
    // Teardown - runs after each test that uses the page fixture
    logger.info('Test with page fixture completed');
  },
  
  // Auto-screenshot on failure
  autoScreenshot: [async ({ page }: { page: Page }, use: (arg: null) => Promise<void>): Promise<void> => {
    try {
      // This is before the test runs
      await use(null);
      // This is after the test runs successfully
    } catch (error: unknown) {
      // This runs if the test fails
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error(`Test failed: ${errorMessage}`);
      
      try {
        // Take a screenshot of the failure
        await screenshotManager.takeScreenshot(
          page, 
          `failure-${Date.now()}`, 
          true
        );
      } catch (screenshotError: unknown) {
        const errorMsg = screenshotError instanceof Error ? screenshotError.message : String(screenshotError);
        logger.error(`Failed to take failure screenshot: ${errorMsg}`);
      }
      
      // Re-throw the original error
      throw error;
    }
  }, { auto: true }], // auto: true means this fixture is used in all tests automatically
});

/**
 * Export expect from Playwright Test
 */
export { expect }; 
import { test as base, Page, PageScreenshotOptions } from '@playwright/test';
import { screenshotManager } from '../utils/report/screenshot';
import { logger } from '../utils/report/logger';

interface PageFixture {
  page: Page;
}

/**
 * Extended test fixture that automatically captures screenshots on test failures
 * and performs other global setup/teardown operations
 */
export const test = base.extend<{ autoScreenshot: null }>({
  page: async ({ page }, use) => {
    // Setup - runs before each test that uses the page fixture
    logger.info('Starting test with page fixture');
    
    // Override page.goto to add logging
    const originalGoto = page.goto.bind(page);
    page.goto = async (url: string, options?: any) => {
      logger.info(`Navigating to: ${url}`);
      return await originalGoto(url, options);
    };
    
    // Use the page in the test
    await use(page);
    
    // Teardown - runs after each test that uses the page fixture
    logger.info('Test with page fixture completed');
  },
  
  // Auto-screenshot on failure
  autoScreenshot: [async ({ page }, use) => {
    try {
      // This is before the test runs
      await use(null);
      // This is after the test runs successfully
    } catch (error) {
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
      } catch (screenshotError) {
        const errorMsg = screenshotError instanceof Error ? screenshotError.message : String(screenshotError);
        logger.error(`Failed to take failure screenshot: ${errorMsg}`);
      }
      
      // Re-throw the original error
      throw error;
    }
  }, { auto: true }], // auto: true means this fixture is used in all tests automatically
});

/**
 * Creates a test that includes all global fixtures
 */
export { expect } from '@playwright/test'; 
import { Page } from '@playwright/test';
import { AllureRuntime, ContentType } from 'allure-js-commons';
import { logger } from './logger';

export class ScreenshotManager {
  private static instance: ScreenshotManager;
  private runtime: AllureRuntime;

  private constructor() {
    this.runtime = new AllureRuntime({ resultsDir: './allure-results' });
  }

  public static getInstance(): ScreenshotManager {
    if (!ScreenshotManager.instance) {
      ScreenshotManager.instance = new ScreenshotManager();
    }
    return ScreenshotManager.instance;
  }

  /**
   * Takes a screenshot and attaches it to the Allure report
   * @param page Playwright page object
   * @param name Name for the screenshot
   * @param fullPage Whether to take a full page screenshot
   */
  public async takeScreenshot(page: Page, name: string, fullPage = false): Promise<void> {
    try {
      logger.debug(`Taking screenshot: ${name}`);
      const screenshot = await page.screenshot({ 
        fullPage,
        timeout: 5000
      });
      
      this.runtime.writeAttachment(
        screenshot,
        ContentType.PNG,
        name
      );
      
      logger.debug(`Screenshot taken: ${name}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to take screenshot: ${name}. Error: ${errorMessage}`);
    }
  }

  /**
   * Takes a screenshot of a specific element
   * @param page Playwright page object
   * @param selector CSS selector of the element
   * @param name Name for the screenshot
   */
  public async takeElementScreenshot(page: Page, selector: string, name: string): Promise<void> {
    try {
      logger.debug(`Taking element screenshot: ${name} (${selector})`);
      const element = page.locator(selector);
      
      // Ensure element is visible
      await element.waitFor({ state: 'visible', timeout: 5000 });
      
      const screenshot = await element.screenshot({
        timeout: 5000
      });
      
      this.runtime.writeAttachment(
        screenshot,
        ContentType.PNG,
        name
      );
      
      logger.debug(`Element screenshot taken: ${name}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to take element screenshot: ${name} (${selector}). Error: ${errorMessage}`);
    }
  }
}

export const screenshotManager = ScreenshotManager.getInstance(); 
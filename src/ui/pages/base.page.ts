import type { Locator, Page } from '@playwright/test';
import type { IResponse, IResponseFields } from '../../data/types/api.types';
import { logStep } from '../../utils/report/logStep';

const DEFAULT_TIMEOUT = 10000;

type LocatorOrSelector = Locator | string;

function isSelector(elementOrSelector: LocatorOrSelector): elementOrSelector is string {
  return typeof elementOrSelector === 'string';
}

export class BasePage {
  constructor(protected page: Page) {}

  protected findElement(locator: LocatorOrSelector): Locator {
    return isSelector(locator) ? this.page.locator(locator) : locator;
  }

  protected findElements(locator: LocatorOrSelector): Promise<Locator[]> {
    return isSelector(locator) ? this.page.locator(locator).all() : locator.all();
  }

  protected async getElementAttribute(locator: LocatorOrSelector, attribute: string): Promise<string | null> {
    return await this.findElement(locator).getAttribute(attribute);
  }

  protected async waitForElement(
    locator: LocatorOrSelector,
    state: 'attached' | 'detached' | 'visible' | 'hidden' = 'visible',
    timeout = DEFAULT_TIMEOUT
  ): Promise<Locator> {
    const element = this.findElement(locator);
    await element.waitFor({ state, timeout });
    return element;
  }

  protected async waitForElementAndScroll(locator: LocatorOrSelector, timeout = DEFAULT_TIMEOUT): Promise<Locator> {
    const element = await this.waitForElement(locator, 'visible');
    await element.scrollIntoViewIfNeeded({ timeout });
    return element;
  }

  @logStep()
  protected async click(locator: LocatorOrSelector, timeout = DEFAULT_TIMEOUT): Promise<void> {
    const element = await this.waitForElementAndScroll(locator, timeout);
    await element.click();
  }

  @logStep()
  protected async setValue(locator: LocatorOrSelector, value: string | number, timeout = DEFAULT_TIMEOUT): Promise<void> {
    const element = await this.waitForElementAndScroll(locator, timeout);
    await element.fill(String(value), { timeout });
  }

  @logStep()
  protected async getText(locator: LocatorOrSelector, timeout = DEFAULT_TIMEOUT): Promise<string> {
    const element = await this.waitForElementAndScroll(locator, timeout);
    return await element.innerText({ timeout });
  }

  @logStep()
  protected async selectDropdownValue(
    dropdownLocator: LocatorOrSelector,
    value: string | number,
    timeout = DEFAULT_TIMEOUT
  ): Promise<void> {
    const element = await this.waitForElementAndScroll(dropdownLocator, timeout);
    await element.selectOption(String(value), { timeout });
  }

  @logStep()
  async openPage(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async interceptResponse<T extends IResponseFields>(
    url: string,
    triggerAction: () => Promise<void>
  ): Promise<IResponse<T>> {
    const [response] = await Promise.all([this.page.waitForResponse(url), triggerAction()]);
    return {
      body: (await response.json()) as T,
      status: response.status(),
      headers: response.headers()
    };
  }
}

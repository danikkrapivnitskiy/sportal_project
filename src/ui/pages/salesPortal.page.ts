import { BasePage } from './base.page.js';

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = this.findElement('.spinner-border');
  protected readonly toast = '#toast .toast-body';
  protected readonly 'Close toast message' = 'button[title="Close"]';
  abstract readonly uniqueElement: string;

  async waitForOpened(): Promise<void> {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide(): Promise<void> {
    await this.waitForElement(this.spinner, 'hidden');
  }
  async getNotificationMessage(): Promise<string> {
    const notificationMessage = await this.getText(this.toast);
    return notificationMessage;
  }

  async closeNotificationMessage(): Promise<void> {
    await this.click(this['Close toast message']);
  }

  async getHeaderPosition(header: string): Promise<number> {
    const elements = await this.findElements(`//thead//th`);
    const elementsArray = await Promise.all(elements.map(async (el) => (await this.getText(el)).toLowerCase()));
    return elementsArray.length ? elementsArray.indexOf(header.trim().toLowerCase()) + 1 : -1;
  }
}

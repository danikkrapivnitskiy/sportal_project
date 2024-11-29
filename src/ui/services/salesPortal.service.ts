import { expect } from 'playwright/test';
import { SalesPortalPage } from '../pages/salesPortal.page.js';

export class SalesPortalService {
  constructor(private salesPortalPage: SalesPortalPage) {}

  async verifyNotification<T>(expectedMessage: T) {
    const actualMessage = await this.salesPortalPage.getNotificationMessage();
    expect(actualMessage).toBe(expectedMessage);
    await this.salesPortalPage.closeNotificationMessage();
  }
}

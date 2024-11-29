import { SalesPortalPage } from './salesPortal.page.js';

export abstract class BaseModalPage extends SalesPortalPage {
  protected readonly 'Submit button' = '//div[@class="modal-footer"]//button[1]';
  protected readonly 'Cancel button' = '//div[@class="modal-footer"]//button[2]';
  protected readonly 'Close modal button' = '//div[@class="modal-header"]/button';

  abstract clickCancelButton(): void;

  abstract clickCloseModalButton(): void;

  abstract clickActionButton(): void;
}

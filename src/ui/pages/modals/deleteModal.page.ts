import { BaseModalPage } from '../baseModal.page.js';

export class DeleteModalPage extends BaseModalPage {

  uniqueElement: string;
  async clickActionButton(): Promise<void> {    
    await this.click(this['Submit button']);
  }
  async clickCancelButton(): Promise<void> {    
    await this.click(this['Cancel button'])
  }

  async clickCloseModalButton(): Promise<void> {    
    await this.click(this['Close modal button'])
  }
}

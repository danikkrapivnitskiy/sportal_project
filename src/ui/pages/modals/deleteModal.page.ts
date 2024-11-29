import { BaseModalPage } from '../baseModal.page.js';

export class DeleteModalPage extends BaseModalPage {

  uniqueElement: string;
  async clickActionButton() {    
    await this.click(this['Submit button']);
  }
  async clickCancelButton() {    
    await this.click(this['Cancel button'])
  }

  async clickCloseModalButton() {    
    await this.click(this['Close modal button'])
  }
}

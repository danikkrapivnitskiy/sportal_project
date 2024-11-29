import { BaseModalPage } from '../baseModal.page.js';

export class CustomerDetailsModalPage extends BaseModalPage {
  uniqueElement: string;
  private readonly 'Row value by row name' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[text()="${row}:"]]/div`;

  async clickActionButton() {    
    await this.click(this['Submit button']);
  }

  async clickCancelButton() {    
    await this.click(this['Cancel button'])
  }

  async clickCloseModalButton() {    
    await this.click(this['Close modal button'])
  }

  async getCustomerData() {
    const [email, name, country, city, street, house, flat, phone, createdOn, notes] = await Promise.all([
      this.getText(this['Row value by row name']('Email')),
      this.getText(this['Row value by row name']('Name')),
      this.getText(this['Row value by row name']('Country')),
      this.getText(this['Row value by row name']('City')),
      this.getText(this['Row value by row name']('Street')),
      this.getText(this['Row value by row name']('House')),
      this.getText(this['Row value by row name']('Flat')),
      this.getText(this['Row value by row name']('Phone')),
      this.getText(this['Row value by row name']('Created On')),
      this.getText(this['Row value by row name']('Notes'))
    ]);
    return { email, name, country, city, street, house, flat, phone, createdOn, notes };
  }
}
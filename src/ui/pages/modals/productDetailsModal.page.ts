import { BaseModalPage } from '../baseModal.page.js';

export class ProductDetailsModalPage extends BaseModalPage {
  uniqueElement: string;
  private readonly 'Row value by row name' = (row: string) =>
    `//div[@class="modal-body"]//div[strong[text()="${row}:"]]/div`;

  async clickActionButton() {
    await this.click(this['Submit button']);
  }

  async clickCancelButton() {
    await this.click(this['Cancel button']);
  }

  async clickCloseModalButton() {
    await this.click(this['Close modal button']);
  }

  async getProductData() {
    const [name, amount, price, manufacturer, createdOn, notes] = await Promise.all([
      this.getText(this['Row value by row name']('Name')),
      this.getText(this['Row value by row name']('Amount')),
      this.getText(this['Row value by row name']('Price')),
      this.getText(this['Row value by row name']('Manufacturer')),
      this.getText(this['Row value by row name']('Created On')),
      this.getText(this['Row value by row name']('Notes'))
    ]);
    return { name, amount, price: +price, manufacturer, createdOn, notes };
  }
}

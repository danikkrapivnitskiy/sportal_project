import { SalesPortalPage } from '../salesPortal.page.js';

export class CreateOrderPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Create Order"]';
  private readonly 'Customer order input' = `//*[@id='inputCustomerOrder']`;
  private readonly 'Products section' = `//*[@id='products-section']`;
  private readonly 'Add order button' = `#add-product-btn`
  private readonly 'Delete order button' = `//button[@title='Delete']`
  private readonly 'Total order price' = `#total-price-order-modal`
  private readonly 'Create order button' = `#create-order-btn`
  private readonly 'Cancel order button' = `#cancel-order-modal-btn`
  private readonly 'Close modal order button' = `button.btn-close`

  async chooseCustomerFromDropdownByName(name: string): Promise<void> {
    await this.selectDropdownValue(this['Customer order input'], `Name ${name}`)
  }

  async chooseProductFromDropdownByName(name: string, index: number): Promise<void> {
    await this.selectDropdownValue(`${this['Products section']}//*[@class='form-select'][${index}]`, name)
  }

  async clickAddProduct(): Promise<void> {
    await this.click(this['Add order button']);
  }

  async clickDeleteProduct(index: number): Promise<void> {
    await this.click(`${this['Delete order button']}[${index}]`);
  }

  async getTotalOrderPrice(): Promise<void> {
    return await this.getText(this['Total order price']);
  }

  async clickActionButton(): Promise<void> {
    await this.click(this['Create order button']);
  }

  async clickCancelButton(): Promise<void> {
    await this.click(this['Cancel order button']);
  }

  async clickCloseModalButton(): Promise<void> {    
    await this.click(this['Close modal button'])
  }

}

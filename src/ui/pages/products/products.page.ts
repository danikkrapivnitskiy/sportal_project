import { SalesPortalPage } from '../salesPortal.page.js';

export class ProductsListPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Products List "]';
  private readonly 'Table row selector' = (product: string) => `//tr[./td[text()="${product}"]]`;
  private readonly 'Price by table row' = (product: string) => `${this['Table row selector'](product)}/td[2]`;
  private readonly 'Manufacturer by table row' = (product: string) => `${this['Table row selector'](product)}/td[3]`;
  private readonly 'Details button' = (product: string) => `${this['Table row selector'](product)}/td[5]/button[1]`;
  private readonly 'Delete button' = (product: string) => `${this['Table row selector'](product)}/td[5]/button[3]`;
  private readonly 'Add New Product button' = 'button.page-title-header';

  async clickOnAddNewProduct() {
    await this.click(this['Add New Product button']);
  }

  async getDataByName(name: string) {
    const [price, manufacturer] = await Promise.all([
      this.getText(this['Price by table row'](name)),
      this.getText(this['Manufacturer by table row'](name))
    ]);
    return { name, price: +price.replace('$', ''), manufacturer };
  }
  
  async clickOnDetailsButton(name: string) {
    await this.click(this['Details button'](name));
  }

  async clickOnDeleteButton(name: string) {
    await this.click(this['Delete button'](name));
  }
}

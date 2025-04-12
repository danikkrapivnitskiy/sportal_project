import { SalesPortalPage } from '../salesPortal.page';

export class CustomersListPage extends SalesPortalPage {
  uniqueElement = '//h2[text()="Customers List "]';

  readonly 'Add New Customer button' = 'button.page-title-header';
  readonly 'Table row selector' = (customer: string): string => `//tr[.//td[text()="${customer}"]]`;
  readonly 'Edit button by table row' = (customer: string): string =>
    `${this['Table row selector'](customer)}//button[@title="Edit"]`;
  readonly 'Empty table message' = 'td.fs-italic';

  async clickOnAddNewCustomer(): Promise<void> {
    await this.click(this['Add New Customer button']);
  }

  async clickOnEditCustomer(customerName: string): Promise<void> {
    await this.click(this['Edit button by table row'](customerName));
  }

  async getEmptyTableMessage(): Promise<string> {
    return await this.getText(this['Empty table message']);
  }
}

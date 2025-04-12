import { SalesPortalPage } from '../salesPortal.page.js';

export class OrdersPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Orders List "]';
  private readonly 'Header sort button' = (header: string): string => `//*[@name="sort-button" and @fieldName='${header}']`;
  private readonly 'Table row selector' = (product: string): string => `//tr[./td[text()="${product}"]]`;
  private readonly 'Order Number' = (product: string): string => `${this['Table row selector'](product)}/td[1]`;
  private readonly 'Name' = (product: string): string => `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Name')}]`;
  private readonly 'Email' = (product: string): string => `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Email')}]`;
  private readonly 'Price' = (product: string): string => `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Price')}]`;
  private readonly 'Delivery' = (product: string): string => `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Delivery')}]`;
  private readonly 'Status' = (product: string): string => `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Status')}]`;
  private readonly 'Created' = (product: string): string => `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Created')}]`;
  private readonly 'Order details' = (product: string): string => `${this['Table row selector'](product)}/td[${this.getHeaderPosition('Order details')}]/button[1]`;
  private readonly 'Create Order' = `//button[contains(@class, 'page-title-button') and starts-with(., 'Create Order')]`;
  private readonly 'Filter' = `#filter`;
  private readonly 'Search bar' = `//*[contains(@class, 'search-bar')]`;
  private readonly 'Search orders button' = `#search-orders`;

  async clickOnCreateOrder(): Promise<void> {
    await this.click(this['Create Order']);
  }

  async clickOnDetailsButton(name: string): Promise<void> {
    await this.click(this['Order details'](name));
  }

  async clickOnFilterButton(): Promise<void> {
    await this.click(this['Filter']);
  }

  async fillSearchInput(filterValue: string): Promise<void> {
    await this.setValue(`${this['Search bar']}//input`, filterValue);
  }

  async clickOnSearchButton(): Promise<void> {
    await this.click(`${this['Search bar']}`);
  }

  async sortTable(header: string, direction: 'asc' | 'desc'): Promise<void> {
    const sortButton = this['Header sort button'](header);
    const attribute = await this.getElementAttribute(sortButton, 'direction');
    if (attribute !== direction) {
      await this.click(sortButton);
    }
  }
}

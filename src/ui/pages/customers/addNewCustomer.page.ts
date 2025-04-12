import type { ICustomer } from '../../../data/types/customers.types';
import { SalesPortalPage } from '../salesPortal.page';

export class AddNewCustomerPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Add New Customer "]';

  readonly 'Name input' = '#inputName';
  readonly 'Email input' = '#inputEmail';
  readonly 'Country dropdown' = 'select#inputCountry';
  readonly 'City input' = '#inputCity';
  readonly 'Street input' = '#inputStreet';
  readonly 'House input' = '#inputHouse';
  readonly 'Flat input' = '#inputFlat';
  readonly 'Phone input' = '#inputPhone';
  readonly 'Notes textarea' = '#textareaNotes';
  readonly 'Save New Customer button' = '#save-new-customer';

  async fillInputs(customer: Partial<ICustomer>): Promise<void> {
    if (customer.name) await this.setValue(this['Name input'], customer.name);
    if (customer.email) await this.setValue(this['Email input'], customer.email);
    if (customer.country) await this.selectDropdownValue(this['Country dropdown'], customer.country);
    if (customer.city) await this.setValue(this['City input'], customer.city);
    if (customer.street) await this.setValue(this['Street input'], customer.street);
    if (customer.house) await this.setValue(this['House input'], customer.house);
    if (customer.flat) await this.setValue(this['Flat input'], customer.flat);
    if (customer.phone) await this.setValue(this['Phone input'], customer.phone);
    if (customer.notes) await this.setValue(this['Notes textarea'], customer.notes);
  }

  async clickOnSaveButton(): Promise<void> {
    await this.click(this['Save New Customer button']);
  }

  async fillCustomerData(customer: ICustomer): Promise<void> {
    await this.setValue(this['Email input'], customer.email);
    await this.setValue(this['Name input'], customer.name);
    await this.selectDropdownValue(this['Country dropdown'], customer.country);
    await this.setValue(this['City input'], customer.city);
    await this.setValue(this['Street input'], customer.street);
    await this.setValue(this['House input'], customer.house.toString());
    await this.setValue(this['Flat input'], customer.flat.toString());
    await this.setValue(this['Phone input'], customer.phone);
    await this.setValue(this['Notes textarea'], customer.notes || '');
  }
}

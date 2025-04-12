import type { IProduct } from '../../../data/types/product.types.js';
import { SalesPortalPage } from '../salesPortal.page.js';

export class AddNewProductPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[.="Add New Product "]';

  private readonly 'Name input' = '#inputName';
  private readonly 'Manufacturer dropdown' = 'select#inputManufacturer';
  private readonly 'Price input' = '#inputPrice';
  private readonly 'Amount input' = '#inputAmount';
  private readonly 'Notes textarea' = '#textareaNotes';
  private readonly 'Save New Product button' = '#save-new-product';

  async fillInputs(product: Partial<IProduct>): Promise<void> {
    if (product.name) await this.setValue(this['Name input'], product.name);
    if (product.manufacturer) await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer);
    if (product.price !== undefined) await this.setValue(this['Price input'], product.price);
    if (product.amount !== undefined) await this.setValue(this['Amount input'], product.amount);
    if (product.notes) await this.setValue(this['Notes textarea'], product.notes);
  }

  async clickOnSaveButton(): Promise<void> {
    await this.click(this['Save New Product button']);
  }
}

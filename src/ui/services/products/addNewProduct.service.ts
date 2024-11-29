import { expect, Page } from '@playwright/test';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { IProduct } from '../../../data/types/product.types.js';
import { logStep } from '../../../utils/report/logStep.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ProductsListPage } from '../../pages/products/products.page.js';

export class AddProductService {
  private productsPage: ProductsListPage;
  private addNewProductPage: AddNewProductPage;

  constructor(protected page: Page) {
    this.productsPage = new ProductsListPage(page),
    this.addNewProductPage = new AddNewProductPage(page)
  }

  @logStep('Fill product inputs')
  async fillProductInputs(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputs(product);
  }

  @logStep('Save new product')
  async save() {
    await this.addNewProductPage.clickOnSaveButton();
  }

  @logStep('Create product')
  async create(product?: IProduct) {
    await this.fillProductInputs(product ?? generateNewProduct());
    await this.save();
    await this.addNewProductPage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();    
  }
}

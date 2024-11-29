import { Page } from '@playwright/test';
import { HomePage } from '../pages/home.page.js';
import { CustomersListPage } from '../pages/customers/customers.page.js';
import { ProductsListPage } from '../pages/products/products.page.js';
import { OrdersPage } from '../pages/orders/orders.page.js';
import { logStep } from '../../utils/report/logStep.js';

export class HomeService {
  private homePage: HomePage;
  private customersPage: CustomersListPage;
  private productsPage: ProductsListPage;
  private ordersPage: OrdersPage;
  constructor(protected page: Page) {
    this.homePage = new HomePage(page);
    this.customersPage = new CustomersListPage(page);
    this.productsPage = new ProductsListPage(page);
    this.ordersPage = new OrdersPage(page);
  }

  @logStep()
  async openCustomersPage() {
    await this.homePage.clickOnViewDetailsButton('Customers');
    await this.homePage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
  }

  @logStep()
  async openProductsPage() {
    await this.homePage.clickOnViewDetailsButton('Products');
    await this.homePage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
  }

  @logStep()
  async openOrdersPage() {
    await this.homePage.clickOnViewDetailsButton('Orders');
    await this.homePage.waitForSpinnerToHide();
    await this.ordersPage.waitForOpened();
  }
}

import { expect, type Page } from '@playwright/test';;
import { generateNewCustomer } from '../../../data/customers/generateCustomer.js';
import type { ICustomer, ICustomerResponse } from '../../../data/types/customers.types.js';
import { AddNewCustomerPage } from '../../pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from '../../pages/customers/customers.page.js';
import { apiConfig } from '../../../config/apiConfig.js';
import { validateResponse } from '../../../utils/validation/response.js';
import { STATUS_CODES } from '../../../data/types/api.types.js';
import { logStep } from '../../../utils/report/logStep.js';

export class AddCustomerService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;

  constructor(protected page: Page) {
    this.addNewCustomerPage = new AddNewCustomerPage(page);
    this.customersPage = new CustomersListPage(page);
  }

  @logStep()
  async fillCustomerInputs(customer: Partial<ICustomer>): Promise<void> {
    await this.addNewCustomerPage.fillInputs(customer);
  }

  @logStep()
  async save(): Promise<void> {
    await this.addNewCustomerPage.clickOnSaveButton();
  }

  @logStep()
  async create(customer?: ICustomer): Promise<void> {
    const customerData = customer ?? generateNewCustomer();
    await this.fillCustomerInputs(customerData);
    const responseUrl = apiConfig.baseUrl + apiConfig.endpoints.Customers;
    const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse>(
      responseUrl,
      this.save.bind(this)
    );
    validateResponse<ICustomerResponse>(response, STATUS_CODES.CREATED, true, null);
    expect(response.body.Customer).toMatchObject({
      ...customerData,
      createdOn: response.body.Customer.createdOn,
      _id: response.body.Customer._id
    });
    await this.addNewCustomerPage.waitForSpinnerToHide();
    await this.customersPage.waitForOpened();
  }
}

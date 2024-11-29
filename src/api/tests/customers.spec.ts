import { expect, test } from '@playwright/test';
import signInApiService from '../service/signIn.api';
import { generateNewCustomer } from '../../data/customers/generateCustomer';
import customerApiClient from '../clients/customers.client';
import { STATUS_CODES } from '../../data/types/api.types';
import _ from 'lodash';

test.describe('[API] [Customers]', async function () {
  test('Create customer with valid data', async function () {
    await signInApiService.loginAsAdmin();
    const customerData = generateNewCustomer();
    const response = await customerApiClient.create(customerData, await signInApiService.getToken());
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body.IsSuccess).toBe(true);
    expect(response.body.ErrorMessage).toBe(null);
    expect(_.omit(response.body.Customer, ['_id', 'cretedOn'])).toMatchObject({ ...customerData });
  });
});

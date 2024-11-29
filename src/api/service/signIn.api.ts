import { expect } from 'allure-playwright';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';
import { SignInApiClient } from '../clients/signIn.client';
import { STATUS_CODES } from '../../data/types/api.types';

class SignInApiService {
  private token: string;

  constructor(private signInClient = new SignInApiClient()) {}

  async loginAsAdmin() {
    const response = await this.signInClient.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    expect(response.status).toBe(STATUS_CODES.OK);
    this.token = `Bearer ${response.body.token}`;
    return response.body.token;
  }

  async getToken() {
    if (!this.token) {
      await this.loginAsAdmin();
    }
    return this.token;
  }
}

export default new SignInApiService();

import type { Page } from '@playwright/test';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';
import type { IUserCredentials } from '../../data/types/user.types.js';
import { HomePage } from '../pages/home.page.js';
import { SignInPage } from '../pages/login.page.js';
import { logStep } from '../../utils/report/logStep.js';

export class SignInService {
  private signInPage: SignInPage;
  private homePage: HomePage;
  constructor(protected page: Page) {
    this.signInPage = new SignInPage(page);
    this.homePage = new HomePage(page);
  }

  @logStep()
  async openSalesPortal(): Promise<void> {
    await this.signInPage.openPage('https://anatoly-karpovich.github.io/aqa-course-project');
  }

  @logStep()
  async login(credentials: IUserCredentials): Promise<void> {
    await this.signInPage.fillCredentialsInputs(credentials);
    await this.signInPage.clickSubmitButton();
    await this.signInPage.waitForSpinnerToHide();
    await this.homePage.waitForOpened();
  }

  @logStep()
  async loginAsAdmin(): Promise<void> {
    await this.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  }

  async fillInputs(credentials: IUserCredentials): Promise<void> {
    await this.signInPage.fillCredentialsInputs(credentials);
  }  
}

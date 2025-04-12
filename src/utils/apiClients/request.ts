import { request, type APIResponse } from '@playwright/test';

import type { IRequestOptions, IResponse, IResponseFields } from '../../data/types/api.types';
import { globalConfig } from '../../config/apiConfig';
import _ from 'lodash';

export class RequestApi {
  private response!: APIResponse;

  async send<T extends IResponseFields>(options: IRequestOptions): Promise<IResponse<T>> {
    const requestContext = await request.newContext({ baseURL: options.baseURL ?? globalConfig.apiUrl });
    this.response = await requestContext.fetch(options.url, _.omit(options, ['baseURL', 'url']));
    if (this.response.status() >= 500) throw new Error('Request failed with status ' + this.response.status());
    return await this.transormReponse<T>();
  }

  private async transormReponse<T extends IResponseFields>(): Promise<IResponse<T>> {
    const contentType = this.response.headers()['content-type'] || '';

    let body;
    if (contentType.includes('application/json')) {
      body = await this.response.json();
    } else {
      body = await this.response.text();
    }

    return {
      status: this.response.status(),
      body,
      headers: this.response.headers()
    };
  }
}

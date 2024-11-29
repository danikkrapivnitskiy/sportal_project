import { apiConfig } from '../../config/apiConfig';
import { IRequestOptions } from '../../data/types/api.types';
import { ILoginResponse, IUserCredentials } from '../../data/types/user.types';
import { RequestApi } from '../../utils/apiClients/request';

export class SignInApiClient {
  constructor(private request = new RequestApi()) {}

  async login(credentials: IUserCredentials) {
    const options: IRequestOptions = {
      method: 'post',
      url: apiConfig.endpoints.Login,
      data: credentials,
      headers: { 'content-type': 'application/json' }
    };

    return await this.request.send<ILoginResponse>(options);
  }
}

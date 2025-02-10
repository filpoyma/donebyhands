import baseApi from '~api/base.api';
import {
  ILoginRequestData,
  RequestSMSData,
  ILoginResponseData,
  ResponseSMSData,
} from '~typedefs/api/auth.api';

const AuthApi = {
  basePath: 'users',

  getUrl(path: string) {
    return `${this.basePath}/${path}/`;
  },

  login(data: ILoginRequestData): Promise<ILoginResponseData> {
    const url = this.getUrl('login');

    return baseApi.post(url, { json: data }).json();
  },

  signUpSendcode(data: RequestSMSData): Promise<ResponseSMSData> {
    const url = this.getUrl('registration');

    return baseApi.post(url, { json: data }).json();
  },

  signInSendcode(data: RequestSMSData): Promise<ResponseSMSData> {
    const url = this.getUrl('send-code');

    return baseApi.post(url, { json: data }).json();
  },

  logout() {
    const url = this.getUrl('logout');

    return baseApi.post(url).json();
  },
};

export default AuthApi;

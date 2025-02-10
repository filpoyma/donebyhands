import ky, { HTTPError } from 'ky';

import { authActions } from '~redux/reducers/auth';
import store from '~redux/store';
import authTokenStorageItem from '~storage/authToken.storageItem';
import userIdStorageItem from '~storage/userId.storageItem';
import { API_URL } from '~constants/api.constants';

const baseApi = ky.create({
  prefixUrl: API_URL,
  timeout: 15000,
});

const tokenInterceptor = (request: Request) => {
  const { token } = store.getState().auth;

  if (token !== null && request.headers) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
};

const errorInterceptor = async (error: HTTPError) => {
  const { response } = error;
  if (response && response.status === 401) {
    console.warn('401 error, logout');
    store.dispatch(authActions.setIsLoggedIn(false));
    store.dispatch(authActions.setToken(null));
    store.dispatch(authActions.setUser(null));
    await Promise.all([authTokenStorageItem.remove(), userIdStorageItem.remove()]);
  }
  const contentType = response.headers.get('content-type');
  if (!contentType) return error;
  error.message =
    contentType?.indexOf('application/json') !== -1 ? await response.json() : await response.text();
  return error;
};

const api = baseApi.extend({
  hooks: {
    beforeRequest: [tokenInterceptor],
    beforeError: [errorInterceptor],
  },
});

export default api;

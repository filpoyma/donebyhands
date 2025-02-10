import authApi from '~api/auth.api';
import userApi from '~api/user.api';
import { logout } from '~redux/actions';
import { authActions } from '~redux/reducers/auth';
import store from '~redux/store';
import OneSignalService from '~services/OneSignal.service';
import UserService from '~services/User.service';
import authTokenStorageItem from '~storage/authToken.storageItem';
import { ILoginRequestData, RequestSMSData } from '~typedefs/api/auth.api';
import { IUserUpdateRequestData } from '~typedefs/api/user.api';
import onsignalEnabledStorageItem from '~storage/onsignalEnabled.storage';
import ParcelLockerService from '~services/ParcelLocker.service';
import userIdStorageItem from '~storage/userId.storageItem';
import RentService from '~services/Rent.service';
import OrderService from '~services/Order.service';
import SentryService from '~services/Sentry.service';
import YaMetricaService from '~services/YandexMetrica.service';

const AuthService = {
  async initialize() {
    const token = await authTokenStorageItem.get();
    if (token !== null) {
      store.dispatch(authActions.setToken(token));
    }
  },

  async getToken(requestData: ILoginRequestData) {
    const responseData = await authApi.login(requestData);
    const { auth_token, id } = responseData;
    if (auth_token) {
      await authTokenStorageItem.set(auth_token);
      store.dispatch(authActions.setToken(auth_token));
    }
    if (id) await UserService.saveIdToStorage(id);
    return id;
  },
  //this runs after signUp also...
  async login() {
    const token = await authTokenStorageItem.get();
    const userId = await userIdStorageItem.get();
    if (userId !== null) {
      await UserService.initialize();
      YaMetricaService.setUserID(userId);
      await RentService.initialize();
      await OrderService.initialize();
      await ParcelLockerService.initialize();
      await OneSignalService.setExternalUserId();
      await OneSignalService.enableSubscription();
      SentryService.setUser(userId);
    }

    if (token !== null) await store.dispatch(authActions.setIsLoggedIn(true));

    const isPushEnabled = await onsignalEnabledStorageItem.get();
    if (isPushEnabled) await OneSignalService.enableSubscription();
  },

  async signUpSendcode(requestData: RequestSMSData) {
    const responseData = await authApi.signUpSendcode(requestData);
    return responseData.message;
  },

  async signInSendcode(requestData: RequestSMSData) {
    const responseData = await authApi.signInSendcode(requestData);
    return responseData.message;
  },

  async updateUser(data: IUserUpdateRequestData) {
    const userData = await userApi.updateUser(data);

    if (userData) store.dispatch(authActions.setUser(userData));
  },

  async deleteUser(userId: number) {
    await OneSignalService.disableSubscription();
    await userApi.deleteUser(userId);
    await Promise.all([authTokenStorageItem.remove(), userIdStorageItem.remove()]);
    store.dispatch(logout());
    SentryService.removeUser();
  },

  async logout() {
    await OneSignalService.disableSubscription();
    await Promise.all([authTokenStorageItem.remove(), userIdStorageItem.remove()]);
    await authApi.logout();
    SentryService.removeUser();
    store.dispatch(logout());
  },

  //   async getSupport() {
  //     const { data: support } = await authApi.getSupport();
  //
  //     store.dispatch(authActions.setSupport(support));
  //   },
};

export default AuthService;

import userApi from '~api/user.api';
import { authActions } from '~redux/reducers/auth';
import store from '~redux/store';
// import SentryService from '~services/Sentry.service';
import userIdStorageItem from '~storage/userId.storageItem';
import { IUserUpdateRequestData } from '~typedefs/api/user.api';
import { IUser } from '~typedefs/models/User.model';
import RNFetchBlob from 'react-native-blob-util';
import UserApi from '~api/user.api';

import { isIOS } from '~constants/platform.constants';
import { IPhoto } from '~typedefs/models/Camera';

const UserService = {
  async initialize() {
    await this.getUser();
  },

  async getUser(): Promise<IUser | null> {
    const userId = await userIdStorageItem.get();
    console.log('User id %s is loading...', userId);
    if (userId !== null) {
      const user = await userApi.getUser(userId);
      store.dispatch(authActions.setUser(user));
      return user;
    }
    return null;
  },

  verifyPhone(phone: string) {
    return userApi.verifyPhone(phone);
  },

  async updateUser(userData: IUserUpdateRequestData) {
    const updatedUser = await userApi.updateUser(userData);
    store.dispatch(authActions.updateUser(updatedUser));
    return updatedUser;
  },

  async uploadImages(photos: IPhoto[]) {
    const data = photos
      .filter((photo: IPhoto) => !!photo.uri)
      .map((photo: IPhoto) => ({
        name: photo.serverKey,
        filename: 'image.jpg',
        type: 'image/jpeg',
        //@ts-ignore
        data: RNFetchBlob.wrap(isIOS ? photo.uri.replace('file://', '') : photo.uri),
      }));
    const response = await UserApi.uploadImages(data);

    const status = response.respInfo?.status;
    if (status >= 500) {
      throw new Error('Ошибка сервера.');
    }
    if (status >= 400) {
      const respData = await response.json();
      throw new Error(respData.message);
    }
    const responseData = await response.json();
    store.dispatch(authActions.updateUser(responseData));
    return responseData;
  },

  saveIdToStorage(userId: number) {
    return userIdStorageItem.set(userId);
  },
  getIdFromStorage() {
    return userIdStorageItem.get();
  },

  // async getUserPoints(page = '1') {
  //   const { data } = await userApi.getUserPoints(page);
  //   const nextPage = data.next ? getQueryParams(data.next).page : undefined;
  //   store.dispatch(rentActions.addPointHistory(data.results));
  //   store.dispatch(rentActions.setPointHistoryPage(nextPage));
  // },
};

export default UserService;

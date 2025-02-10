import RNFetchBlob from 'react-native-blob-util';
import baseApi from '~api/base.api';
import store from '~redux/store';
import { IUploadItem, IUserPointsResponse, IUserUpdateRequestData } from '~typedefs/api/user.api';
import { IUser } from '~typedefs/models/User.model';
import { API_URL } from '~constants/api.constants';

const UserApi = {
  basePath: 'users',

  getUrl(path: string) {
    return `${this.basePath}/${path}/`;
  },

  async getUser(id: number): Promise<IUser> {
    const url = this.getUrl(`user-info/${id}`);

    return baseApi.get(url).json();
  },

  updateUser(fieldsToUpdate: IUserUpdateRequestData): Promise<IUser> {
    const url = this.getUrl('registration-steps');

    return baseApi.patch(url, { json: fieldsToUpdate }).json();
  },

  getUserPoints(page: string): Promise<IUserPointsResponse> {
    // const url = this.getUrl(`${this.basePath}/points-history/?page=${page}`);

    return baseApi.get(`${this.basePath}/points-history/?page=${page}`).json();
  },
  // loadPhoto(formData: FormData) {
  //   const url = this.getUrl('registration-steps');
  //   return baseApi.patch(url, formData, {
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  // },

  uploadImages(data: IUploadItem[]) {
    const url = `${API_URL}/${this.basePath}/registration-steps/`;

    return RNFetchBlob.fetch(
      'PATCH',
      url,
      {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
      data,
    );
  },

  deleteUser(userId: number) {
    const url = this.getUrl(`delete/${userId}`);

    return baseApi.delete(url).json();
  },

  verifyPhone(phone: string) {
    const url = this.getUrl('verify_phone');

    return baseApi.post(url, { json: { phone } });
  },
};

export default UserApi;

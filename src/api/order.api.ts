import baseApi from '~api/base.api';

import { IOrderExtendServerRequest, IOrderServer } from '~typedefs/models/Order.model';
import {
  IOrderExtendServerResponce,
  IOrderServerResponce,
  IPromocodesServerResponce,
} from '~typedefs/api/rent.api';

import RNFetchBlob from 'react-native-blob-util';
import store from '~redux/store';
import { IUploadItem } from '~typedefs/api/user.api';
import { API_URL } from '~constants/api.constants';

const orderApi = {
  basePath: 'rent',

  getUrl(path: string | number) {
    return `${this.basePath}/${path}/`;
  },

  createOrder(order: IOrderServer): Promise<IOrderServerResponce> {
    const url = this.getUrl('start-renting');

    return baseApi.post(url, { json: order }).json();
  },

  extendOrder(order: IOrderExtendServerRequest): Promise<IOrderExtendServerResponce> {
    const url = this.getUrl('extend-renting');

    return baseApi.post(url, { json: order }).json();
  },

  repeatOrder(linkCardId: number, orderId: string): Promise<IOrderServerResponce> {
    const url = this.getUrl(`${orderId}/repeat-link-payment`);

    return baseApi.post(url, { json: { link_card: linkCardId } }).json();
  },

  cancelOrder(orderId: string): Promise<IOrderServerResponce> {
    const url = this.getUrl(`${orderId}/delete`);

    return baseApi.delete(url).json();
  },

  getPromocodes(): Promise<IPromocodesServerResponce> {
    const url = this.getUrl('promocodes');

    return baseApi.get(url).json();
  },

  uploadToolsPhotos(id: string, url: string, method: 'POST' | 'PATCH', data: IUploadItem[] | null) {
    return RNFetchBlob.fetch(
      method,
      url,
      {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
      data,
    );
  },

  endRental(id: string): Promise<{ points: number }> {
    const url = `${this.basePath}/end-renting/${id}/`;
    return baseApi.post(url).json();
  },

  uploadPhotosOnRentalStart(id: string, data: IUploadItem[] | null) {
    const url = `${API_URL}/${this.basePath}/start-renting-images/${id}/`;
    const method = 'PATCH';
    return this.uploadToolsPhotos(id, url, method, data);
  },
};

export default orderApi;

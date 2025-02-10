import baseApi from '~api/base.api';
import { IBindingsCard, IBindingsStatus, IBingCard, IUnBindCard } from '~typedefs/api/payment.api';
import { ICheckOrderStatusRequestData } from '~typedefs/models/Order.model';
import { ResponsePromise } from 'ky';

const paymentApi = {
  basePath: 'payment',

  getUrl(path: string) {
    return `${this.basePath}/${path}/`;
  },

  getBindings(): Promise<IBindingsCard[]> {
    const url = this.getUrl('get_bindings');

    //return baseApi.post(url, { json: data }).json();
    return baseApi.get(url).json();
  },

  bindStatus(id: string): Promise<IBindingsStatus> {
    const url = this.getUrl(`${id}/bind_status`);

    return baseApi
      .post(url, {
        retry: {
          limit: 5,
          statusCodes: [202],
          backoffLimit: 3000,
        },
      })
      .json();
  },

  unBindCard(id: number): Promise<IUnBindCard> {
    const url = this.getUrl(`${id}/unbind_card`);

    return baseApi.post(url).json();
  },

  getBindInfo(): Promise<IBingCard> {
    const url = this.getUrl('bind_card');

    return baseApi.get(url).json();
  },

  checkPaymentStatus(data: ICheckOrderStatusRequestData): ResponsePromise {
    return baseApi.post(`${this.basePath}/payment_status/${data.orderId}/`, {
      json: { content_type: data.contentId },
    });
  },
};

export default paymentApi;

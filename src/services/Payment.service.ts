import paymentApi from '~api/payment.api';
import { ICheckOrderStatusRequestData } from '~typedefs/models/Order.model';
import { IOrderServerResponce } from '~typedefs/api/rent.api';

const PaymentService = {
  async getBindings() {
    return await paymentApi.getBindings();
  },

  async getBindInfo() {
    return await paymentApi.getBindInfo();
  },

  async bindStatus(id: string) {
    return await paymentApi.bindStatus(id);
  },

  async unBindCard(id: number) {
    return await paymentApi.unBindCard(id);
  },

  async checkPaymentStatus(reqData: ICheckOrderStatusRequestData) {
    const res = await paymentApi.checkPaymentStatus(reqData);
    const resData: IOrderServerResponce = await res.json();
    return { data: resData, status: res?.status };
  },
};

export default PaymentService;

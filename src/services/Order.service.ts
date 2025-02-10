import orderApi from '~api/order.api';
import { IOrder, IOrderExtend, IOrderServer } from '~typedefs/models/Order.model';
import store from '~redux/store';
import { orderActions } from '~redux/reducers/order';
import { IPhoto } from '~typedefs/models/Camera';
import { createPhotoData, uploadImagesErrorHandler } from '~utils/order.utils';
import arrangeRentalDataStorageItem from '~storage/arrangeRentalData.storageItem';
import { distanceToUser } from '~utils/maps.utils';

const OrderService = {
  async initialize() {
    await this.getPromocodes();
    const arrangeRentalData = await arrangeRentalDataStorageItem.get();
    if (arrangeRentalData) store.dispatch(orderActions.updateCurrentOrder(arrangeRentalData));
  },

  async createOrder(order: IOrder) {
    const serverOrder: IOrderServer = {
      postomat_id: Number(order.postomatId),
      tool_id: Number(order.toolId),
      tariff_id: Number(order.tariffId),
      promocode: order.promocode,
      points: order.points,
      link_card: order.linkCardId,
    };

    return await orderApi.createOrder(serverOrder);
  },

  extendOrder(order: IOrderExtend) {
    const serverOrder = {
      rent_request: order.orderId,
      tariff: Number(order.tariffId),
      points: order.points,
      promocode: order.promocode,
      link_card: order.linkCardId,
    };

    return orderApi.extendOrder(serverOrder);
  },

  repeatOrder(linkCardId: number, orderId: string) {
    return orderApi.repeatOrder(linkCardId, orderId);
  },

  cancelOrder(orderId: string) {
    return orderApi.cancelOrder(orderId);
  },

  async getPromocodes() {
    const data = await orderApi.getPromocodes();
    const promocodes = data.results.filter(promocode => promocode.active);
    store.dispatch(orderActions.updateCurrentOrder({ promocodes }));
  },

  async endRental(id: string) {
    const data = await orderApi.endRental(id);
    if (data) return data.points;
    return 0;
  },

  async uploadPhotosOnRentalStart(id: string, photos: IPhoto[], message: string) {
    const multipartData = createPhotoData(photos, { start_comment: message });
    const response = await orderApi.uploadPhotosOnRentalStart(id, multipartData);
    await uploadImagesErrorHandler(response);
    return await response.json();
  },

  getNearestParcelLockerId() {
    const postomats = store.getState().parcelLockers.list;
    const sortedPostomats = postomats
      .map(item => ({ ...item, distance: distanceToUser(item) }))
      .sort((a, b) => a.distance - b.distance);
    return sortedPostomats[0]?.id;
  },
};

export default OrderService;

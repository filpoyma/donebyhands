import { createStorageItem } from '~utils/storage.utils';

interface IArrangeRentalDataStorageItem {
  orderId: string;
  postomatId: string;
  fromScreen: string;
}

const arrangeRentalDataStorageItem =
  createStorageItem<IArrangeRentalDataStorageItem>('arrangeRentalData');

export default arrangeRentalDataStorageItem;

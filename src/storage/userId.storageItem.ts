import { createStorageItem } from '~utils/storage.utils';

const userIdStorageItem = createStorageItem<number>('userId');

export default userIdStorageItem;

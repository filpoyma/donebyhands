import { createStorageItem } from '~utils/storage.utils';

const authTokenStorageItem = createStorageItem<string>('authToken');

export default authTokenStorageItem;

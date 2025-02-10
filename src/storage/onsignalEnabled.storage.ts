import { createStorageItem } from '~utils/storage.utils';

const onsignalEnabledStorageItem = createStorageItem<boolean>('onsignalEnabled');

export default onsignalEnabledStorageItem;

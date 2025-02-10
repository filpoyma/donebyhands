import { createStorageItem } from '~utils/storage.utils';

const geolocationAccessStorageItem = createStorageItem<boolean>('geolocation');

export default geolocationAccessStorageItem;

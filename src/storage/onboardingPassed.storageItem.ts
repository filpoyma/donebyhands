import { createStorageItem } from '~utils/storage.utils';

const onboardingPassedStorageItem = createStorageItem<boolean>('onboardingPassed');

export default onboardingPassedStorageItem;

import { isIOS, isProd } from '~constants/platform.constants';

export const API_URL = isProd ? process.env.API_URL_PROD : process.env.API_URL_DEV;

export const placeholderUri =
  'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';

export const OTPTimer = 60;

export const rentBookDurationMinutes = 0;

export const uploadImageKeys = {
  selfie: 'selfie_images',
  passport: 'passport_images',
  avatar: 'avatar_load',
  startRent: 'tool_images',
  endRent: 'tool_images',
};

export const appUrlAppStore = 'itms-apps://apps.apple.com/id/app//own-hands/id6473831334';
export const appUrlPlayStore = 'market://details?id=com.donebyhands';

export const appUrl = isIOS ? appUrlAppStore : appUrlPlayStore;

export const appUrlhtml = isIOS
  ? 'https://apps.apple.com/ru/app/own-hands/id6473831334'
  : 'https://play.google.com/store/apps/details?id=com.donebyhands';

export const metricaLink = 'https://clck.ru/39awTN';

export const successUrl = 'https://payment?success=true';

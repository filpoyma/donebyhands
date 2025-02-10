import { Share } from 'react-native';
import { IRent, ITool } from '~typedefs/models/Tools.model';
import { cardPatternsRegex } from '~constants/regex.constants';
import { metricaLink } from '~constants/api.constants';

const onShare = (message: string) => {
  Share.share({
    message,
  }).catch((error: any) => {
    console.error(error.message);
  });
};

export const onShareApp = () => {
  const message = 'Своими руками - аренда инструмента без залога.\n\n' + metricaLink;
  onShare(message);
};

export const onShareTools = (message: string) => {
  onShare(message);
};

export const capitalizeFirstLetter = (string = '') => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// const toTextStatus = (status: number) => {
//   if (status === 0) return 'В процессе аренды';
//   if (status === 1) return 'Аренда завершена';
//   if (status === 2) return 'Не оплачена';
//   if (status === 3) return 'Заказ оформлен';
//   if (status === 4) return 'Просрочено';
//   return '-';
// };

// const debounce = (cb: () => void, delay: number) => {
//   let timer: any = null;
//   return () => {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       cb();
//     }, delay);
//   };
// };

// const getToolsDebounce = debounce(RentService.getTools, 6000);

export const throttle = (mainFunction: () => Promise<ITool | IRent | null>, delay: number) => {
  let timerFlag: any = null;
  // Returning a throttled version
  return () => {
    if (timerFlag === null) {
      mainFunction().catch(e => console.error(e?.message));
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
};

export const getCardType = (number: string) => {
  for (const [cardType, pattern] of Object.entries(cardPatternsRegex))
    if (pattern.test(number)) return cardType;
  return '';
};

export const isNewVerHigher = (oldVer: string, newVer: string) => {
  const [v1, v2] = [oldVer, newVer].map(ver => ver.split('.').map(Number));
  const maxLen = Math.max(v1.length, v2.length);
  for (let i = 0; i < maxLen; i++) {
    const num1 = v1[i] || 0;
    const num2 = v2[i] || 0;
    if (num1 < num2) return true;
    else if (num1 > num2) return false;
  }
  return false;
};

export const waitPromise = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const isNumeric = (string: any) => /^[+-]?\d+(\.\d+)?$/.test(string);

type TStrObj = Record<string, string>;
export const getQueryParams = (url: string): TStrObj => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params: TStrObj = {};
  let match: RegExpExecArray | null;
  while ((match = regex.exec(url)) !== null) {
    const key = match[1];
    const value = match[2];
    params[key] = value;
  }
  return params;
};

export const isNumber = (value: any) => {
  return typeof value === 'number';
};

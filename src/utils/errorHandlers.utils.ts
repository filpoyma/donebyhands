import SentryService from '~services/Sentry.service';
import InAppMessageService from '~services/InAppMessage.service';
import { HTTPError } from 'ky';

export const serverErrorFieldsNames = [
  'tariff',
  'tariff_id',
  'promocode',
  'points',
  'non_field_errors',
  'email',
  'points',
  'tool_id',
  'link_card',
  'locker_error',
  'error',
];

const parseErrorMessage = (obj: any) => {
  if (typeof obj === 'string') return obj;
  for (let key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      let subObj = obj[key];
      for (let subKey in subObj) {
        if (subObj[subKey]) {
          return subObj[subKey];
        }
      }
    } else if (obj[key]) {
      return obj[key];
    }
  }
  return null;
};

export const getErrorMessage = (error: any) => {
  console.error('file-errorHandlers.utils.ts error:', error.message);
  if (!error) return { field: 'undefinedError', message: 'Неизвестная ошибка' };

  if (error.name === 'TimeoutError')
    return { field: 'TimeoutError', message: 'Время ожидания от сервера истекло.' };

  if (error.response && error.response.status === 500)
    return { field: 'serverError', message: 'Ошибка сервера.' };

  if (error.message) {
    if (typeof error.message === 'string') return { field: 'message', message: error.message };

    if (typeof error.message === 'object') {
      if (typeof error.message?.message === 'string')
        return { field: 'message', message: error.message?.message };

      if (typeof error.message?.detail === 'string')
        return { field: 'detail', message: error.message?.detail };

      for (const key of serverErrorFieldsNames)
        if (error.message[key] instanceof Array)
          return { field: key, message: error.message[key][0] };

      for (const key of serverErrorFieldsNames)
        if (error.message[key] instanceof Object)
          return { field: key, message: error.message[key]?.error };

      return { field: 'other', message: JSON.stringify(error.message) };
    }
  }

  return { field: 'nonCaughtError', message: JSON.stringify(error, null, 2) };
};

export const errorHandler = (errorTitle: string, err: HTTPError) => {
  console.error(errorTitle, err?.message);
  let error = parseErrorMessage(err?.message);
  if (err?.name === 'TimeoutError')
    return InAppMessageService.danger('Время ожидания от сервера истекло.');
  if (err?.response?.status >= 500) return InAppMessageService.danger('Ошибка сервера.');
  InAppMessageService.danger(`${error}`);
};

export const errorHandlerSentry = (
  errorTitle: string,
  err: any,
  showPopUp: 'yes' | 'no' = 'yes',
  customError?: string,
) => {
  let error = parseErrorMessage(err?.message);
  console.error(errorTitle, error);
  SentryService.logError(`${errorTitle} ${error}`);
  if (err?.name === 'TimeoutError')
    return InAppMessageService.danger('Время ожидания от сервера истекло.');
  if (err?.response?.status >= 500 && showPopUp === 'yes')
    return InAppMessageService.danger('Ошибка сервера.');
  showPopUp === 'yes' && InAppMessageService.danger(customError || `${error}`);
};

export const withCatch = <T>(promise: Promise<T>): Promise<[undefined, T] | [HTTPError]> => {
  return promise.then(data => [undefined, data] as [undefined, T]).catch(error => [error]);
};

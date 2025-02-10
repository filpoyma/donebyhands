import { IPhoto } from '~typedefs/models/Camera';
import RNFetchBlob, { FetchBlobResponse } from 'react-native-blob-util';
import { isIOS } from '~constants/platform.constants';
import { IOrder } from '~typedefs/models/Order.model';

export const createPhotoData = (photos: IPhoto[] | null, body = {}) => {
  const photoData =
    photos
      ?.filter((photo: IPhoto) => !!photo.uri)
      .map((photo: IPhoto) => ({
        name: photo.serverKey,
        filename: 'image.jpg',
        type: 'image/jpeg',
        //@ts-ignore
        data: RNFetchBlob.wrap(isIOS ? photo.uri.replace('file://', '') : photo.uri),
      })) || [];

  const bodyData = Object.keys(body)
    .filter(key => {
      const field = key as keyof typeof body;
      return body[field] !== null || body[field] !== undefined;
    })
    .map(key => {
      const field = key as keyof typeof body;
      return { name: field, data: JSON.stringify(body[field]) };
    });

  return [...photoData, ...bodyData];
};

export const uploadImagesErrorHandler = async (response: FetchBlobResponse) => {
  const status = response.respInfo?.status;

  if (status >= 500) {
    throw new Error('Ошибка сервера.');
  }
  if (status >= 400) {
    const respData = await response.json();
    throw new Error(respData?.message);
  }
};

export const checkOrder = (order: IOrder) => {
  const getInvalidData = (message: string) => ({
    isInvalid: true,
    message: `Ошибка получения номера ${message}`,
  });
  if (!order?.postomatId) return getInvalidData('постамата');
  if (!order?.toolId) return getInvalidData('инструмента');
  if (!order?.tariffId) return getInvalidData('тарифа');
  return { isInvalid: false, message: 'ok' };
};

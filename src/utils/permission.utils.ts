import { isAndroid } from '~constants/platform.constants';
import { Alert, PermissionsAndroid } from 'react-native';

export const requestCameraPermission = async () => {
  if (isAndroid) {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Разрешения камеры',
        message: 'Приложению требуется доступ к камере',
        buttonPositive: 'ОК',
      });
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err: any) {
      console.warn(err);
      return false;
    }
  } else return true;
};

export const requestExternalWritePermission = async () => {
  if (isAndroid) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Разрешение для записи',
          message: 'Приложению требуется доступ для сохранения фотографий',
          buttonPositive: 'ОК',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err: any) {
      console.warn(err);
      Alert.alert('Write permission err', err?.message);
    }
    return false;
  } else return true;
};

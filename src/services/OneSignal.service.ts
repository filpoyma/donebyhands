import OneSignal from 'react-native-onesignal';
import UserService from '~services/User.service';
import onsignalEnabledStorageItem from '~storage/onsignalEnabled.storage';
import { isAndroid } from '~constants/platform.constants';

const OneSignalService = {
  initialize() {
    OneSignal.setAppId(process.env.ONESIGNAL_APP_ID);
    OneSignal.promptForPushNotificationsWithUserResponse();
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      const notification = notificationReceivedEvent.getNotification();
      notificationReceivedEvent.complete(notification);
    });
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('file-OneSignal.service.ts notification:', notification);
    });
  },

  async setExternalUserId() {
    const userId = await UserService.getIdFromStorage();
    if (userId !== null) OneSignal.setExternalUserId(`${userId}`);
  },

  async disableSubscription() {
    OneSignal.disablePush(true);
    await onsignalEnabledStorageItem.set(false);
  },

  async enableSubscription() {
    OneSignal.disablePush(false);
    await onsignalEnabledStorageItem.set(true);
  },

  async getPermissions() {
    const getDeviceState = await OneSignal.getDeviceState();

    return {
      isPushDisabled: getDeviceState?.isPushDisabled,
      hasNotificationPermission: isAndroid
        ? getDeviceState?.hasNotificationPermission
        : getDeviceState?.notificationPermissionStatus !== 1,
    };
  },
};

export default OneSignalService;

import notificationApi from '~api/notification.api';
import { notificationActions } from '~redux/reducers/notification';
import store from '~redux/store';
import { INotification } from '~typedefs/models/Notification.model';
import userIdStorageItem from '~storage/userId.storageItem';

const NotificationService = {
  async initialize() {
    await this.getNotifications();
  },

  async getNotifications() {
    const userId = await userIdStorageItem.get();
    if (userId !== null) {
      const notifications = await notificationApi.getNotifications();
      store.dispatch(notificationActions.setNotifications(notifications.results));
    }
  },

  async readNotification(ids: INotification['id'][]) {
    const notifications = store.getState().notification.list.map(notification => {
      if (ids.includes(notification.id)) {
        return { ...notification, is_read: true };
      }
      return notification;
    });

    store.dispatch(notificationActions.setNotifications(notifications));

    await notificationApi.readNotification(ids);
  },
};

export default NotificationService;

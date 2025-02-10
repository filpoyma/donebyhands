import baseApi from '~api/base.api';
import { INotification, INotificationResponse } from '~typedefs/models/Notification.model';

const notificationApi = {
  basePath: 'users',

  getUrl(path: string | number) {
    return `${this.basePath}/${path}/`;
  },

  async getNotifications(): Promise<INotificationResponse> {
    const url = this.getUrl('user-notifications');

    return baseApi.get(url).json();
  },

  readNotification(ids: INotification['id'][]) {
    const url = this.getUrl('user-notifications');

    return baseApi.patch(url, { json: { ids } }).json();
  },
};

export default notificationApi;

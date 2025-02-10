export interface INotification {
  id: string;
  title: string;
  description: string;
  is_read: boolean;
}

export interface INotificationResponse {
  results: INotification[];
  count: number;
  next: string | null;
  previous: string | null;
}

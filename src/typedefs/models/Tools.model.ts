import { IUserPoints } from '~typedefs/models/User.model';
import { ICell } from '~typedefs/models/Cell.model';

export interface ITariff {
  id: string;
  price: number;
  name: string;
  started_at: string;
  ended_at: string;
  max_hours: number;
}

export interface ITool {
  id: string;
  images: { id: string; image: string }[];
  price: number;
  tariffs: ITariff[];
  created: string;
  updated: string;
  weight: number;
  active: boolean;
  name: string;
  name_description: string;
  description: string;
  bail_amount: number;
  renewal_price: number;
  availability_status: {
    parce_locker_id: string;
    name: string;
    available: boolean;
    message: string;
  }[];
  instruction: string | null;
}

export interface IRentedTool {
  id: number;
  name: string;
  description: string;
  renewal_price: number; // цена часа продления
  images: { id: string; image: string }[];
}

export interface IRentedTools {
  id: string;
  status:
    | 'В процессе аренды' //status_type = 0
    | 'Аренда завершена' //1
    | 'Заказ оформлен' //3
    | 'Не оплачена' //2
    | 'Просрочено'; //4
  status_type: number;
  points: number | null;
  total_cost: number;
  parce_locker: number;
  tool: IRentedTool;
  tariff: ITariff;
  created: string;
  ended: string;
  pin: string;
  promo_code: string | null;
  payment_url: string;
  content_type: number;
  overdue_cost: number;
  extend_rent_cost: number;
  no_paid_ended: string;
}

export interface IRentedToolModel {
  list: IRentedTools[];
  page: number;
  loading: boolean;
  moreLoading: boolean;
  isListEnd: boolean;
}

export interface IRentedToolModelUpdate {
  list?: IRentedTools[];
  page?: number;
  loading?: boolean;
  moreLoading?: boolean;
  isListEnd?: boolean;
}

export interface IRent {
  count: number;
  next: string | null;
  previous: string | null;
  results: ITool[];
}

export interface IPostomat {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  cells: ICell[];
}

export interface IPointsHistoryModel {
  list: IUserPoints[];
  nextPage: string | null;
}

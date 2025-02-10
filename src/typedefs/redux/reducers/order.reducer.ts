import { IOrder, IOrderExtend } from '~typedefs/models/Order.model';

export interface IOrderState {
  current: IOrder;
  extend: IOrderExtend;
}

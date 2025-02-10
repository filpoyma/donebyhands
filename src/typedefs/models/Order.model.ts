import { IExtendsTariffsResponse } from '~typedefs/api/rent.api';

export interface IOrderServer {
  tool_id: number;
  postomat_id: number;
  tariff_id: number;
  promocode: string;
  points: number;
  link_card?: number;
}

export interface IOrderExtendServerRequest {
  rent_request: string;
  tariff: number;
  points: number;
  promocode: string;
  link_card?: number;
}

export interface IPromocode {
  id: string;
  created: string;
  updated: string;
  active: boolean;
  name: string;
  validity: string;
  amount: string;
  uses_num: number;
}

export interface IOrder {
  toolId: string;
  postomatId: string;
  distanceToPostomat: number;
  tariffId: string;
  promocodes: IPromocode[];
  promocode: string;
  points: number;
  id: string | null;
  linkCardId?: number;
}

export interface IOrderUpdate {
  toolId?: string;
  postomatId?: string;
  distanceToPostomat?: number;
  tariffId?: string;
  promocodes?: IPromocode[];
  points?: number;
  id?: string | null;
}

export interface IOrderExtend {
  orderId: string;
  points: number;
  promocode: string;
  distanceToPostomat?: number;
  lat?: number;
  lon?: number;
  linkCardId?: number;
  tariffId: string;
}
export interface IOrderExtendUpdate {
  orderId?: string;
  postomatId?: string;
  points?: number;
  promocode?: string;
  extendHours?: number;
  distanceToPostomat?: number;
  tariffId?: string;
  lat?: number;
  lon?: number;
}

export interface ICheckOrderStatusRequestData {
  orderId: string | null;
  contentId: number | null;
}

export interface IExtendsTariffs extends Omit<IExtendsTariffsResponse, 'id'> {
  id: string;
}

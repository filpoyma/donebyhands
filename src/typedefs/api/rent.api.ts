import { IPostomat, IRentedTools } from '~typedefs/models/Tools.model';
import { IPromocode } from '~typedefs/models/Order.model';

export interface IRentedToolsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IRentedTools[];
}

export interface IPostomatsResponce {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPostomat[];
}

export interface IOrderServerResponce {
  message?: string;
  form_url?: string;
  id: string;
  pin: string;
  ended: string;
  redirect_url: string; // "redirect при оплате картой",
  content_type: 24;
}

export interface IOrderExtendServerResponce extends IOrderServerResponce {}

export interface IPromocodesServerResponce {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPromocode[];
}

export interface IEndRentalResponce {
  points: number;
}

export interface IExtendsTariffsResponse {
  id: number;
  name: string;
  period: number;
  price: number;
  status: string;
}

export interface IMetricaRentedToolsResponse {
  cost_with_extensions: number;
  cost_no_extensions: number;
  extensions: number[];
  delay: number[];
}

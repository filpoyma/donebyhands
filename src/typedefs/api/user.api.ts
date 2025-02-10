import { IUserPoints } from '~typedefs/models/User.model';

export interface IUserUpdateRequestData {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  onesignal_id?: string;
  not_verify?: boolean;
  mobile_phone?: string;
}

export interface IUploadItem {
  name: string;
  data: string;
  filename?: string;
  type?: string;
}

export interface IUserPointsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IUserPoints[];
}

import { IUser } from '~typedefs/models/User.model';

export interface ILoginRequestData {
  mobile_phone: string;
  password: string;
}

export interface ILoginResponseData extends IUser {
  auth_token: string;
}

export interface RequestSMSData {
  mobile_phone: string;
}

export interface ResponseSMSData {
  message: string;
}

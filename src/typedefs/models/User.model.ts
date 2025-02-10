import { IBindingsCard } from '~typedefs/api/payment.api';

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  mobile_phone: string;
  email?: string;
  docs_status: 'granted' | 'rejected' | 'checking' | 'not_checked';
  photo: string | null;
  points: number; // баланс баллов
  photo_doc_uri: { photo: string; type: string }[] | null;
  push_notifications: { contents: { en: string }; headings: {}; id: string; is_read: boolean }[];
  is_active: boolean;
  blocking_reason: string;
  is_blocked: boolean;
  bindings: IBindingsCard[];
  verif_failure?: string | null;
}

export interface IUserUpdate extends Partial<IUser> {}

export interface IUserPoints {
  id: string;
  points: number;
  created: string;
  type: number;
}

// export interface IUser {
//   id: number;
//   first_name: string;
//   last_name: string;
//   mobile_phone: string;
//   email?: string;
//   //id push уведомлений
//   onesignal_id: string | null;
//   is_verified: boolean;
//   is_application_rejected: boolean;
//   is_blocked: boolean;
//   avatar_uri: string;
//   // баланс баллов
//   points: number;
//   // история начисления баллов
//   points_history: [{ id: string; points: number; created_at: string }];
//   rent_history: [{ id: string; title: string; status: number; image: string }];
//   //{ id: '2', name: 'Visa', number: '*2267', type: 'visa' }
//   payments_info: [{ id: string; name: string; number: string; type: string }];
// }

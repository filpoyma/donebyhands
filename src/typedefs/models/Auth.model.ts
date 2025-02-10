import { IUser } from '~typedefs/models/User.model';

export interface IAuth {
  token: string | null;
  user: IUser | null;
}

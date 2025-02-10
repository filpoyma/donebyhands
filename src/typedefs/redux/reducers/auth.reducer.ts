import { IUser } from '~typedefs/models/User.model';

export interface IAuthState {
  token: string | null;
  user: IUser | null;
  isLoggedIn: boolean;
}

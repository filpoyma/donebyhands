import { IParcelLocker } from '~typedefs/models/ParcelLocker.model';

export interface IParcelLockersById {
  [id: string | number]: IParcelLocker;
}

export type IParcelLockersState = {
  list: IParcelLocker[];
  byId: IParcelLocker;
};

import { ICell } from '~typedefs/models/Cell.model';

export interface IParcelLocker {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  cells: ICell[];
}

export interface IParcelLockerWithDistance extends IParcelLocker {
  distance: number;
}

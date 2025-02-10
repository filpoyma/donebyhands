import { Asset } from 'react-native-image-picker';

export interface IPhoto extends Asset {
  serverKey: string;
}

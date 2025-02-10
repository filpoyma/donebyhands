import { InitialRegion } from 'react-native-yamap';

export interface IMapState {
  initialRegion: InitialRegion;
  userPosition: { lon: number; lat: number };
  geolocationAccess: 'granted' | 'denied' | null;
}

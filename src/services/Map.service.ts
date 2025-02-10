import { YaMap } from 'react-native-yamap';
import { PermissionsAndroid } from 'react-native';
import GeolocationService, { GeoPosition } from 'react-native-geolocation-service';

import { isAndroid, isIOS } from '~constants/platform.constants';
import mapApi from '~api/map.api';
import store from '~redux/store';
import { mapActions } from '~redux/reducers/map';
import { isNumber } from '~utils/helpers.utils';
import SentryService from '~services/Sentry.service';
import { isLocationEnabled } from 'react-native-device-info';

const MapService = {
  initialize() {
    // store.dispatch(mapActions.setInitialRegion({ lat, lon, zoom: DEFAULT_ZOOM }));
    YaMap.init(process.env.YANDEX_MAPS_API_KEY).catch(e => {
      console.error('YandexMap init error:', e);
    });
  },
  async requestPermissions() {
    console.log('file-Map.service.ts requestPermissions:');
    let res: 'granted' | 'denied' | 'disabled' | 'never_ask_again' | 'restricted' = 'denied';
    if (isIOS) {
      res = await GeolocationService.requestAuthorization('whenInUse');
    }
    if (isAndroid) {
      res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    }
    if (res === 'granted') {
      store.dispatch(mapActions.setGeolocationAccess('granted'));
    } else {
      store.dispatch(mapActions.setGeolocationAccess('denied'));
    }
    return res;
  },

  async getIpLocation() {
    const data = await mapApi.getLocationByIp();
    return { lat: data.lat, lon: data.lon };
  },

  async onLocationHandler() {
    const geolocationAccess = store.getState().map.geolocationAccess;
    const isLocationAvaible = await isLocationEnabled();
    const res = geolocationAccess ? geolocationAccess : await MapService.requestPermissions();
    if (res === 'granted' && isLocationAvaible) {
      GeolocationService.getCurrentPosition(
        (position: GeoPosition) => {
          if (position && isNumber(position.coords.latitude) && isNumber(position.coords.longitude))
            store.dispatch(
              mapActions.setUserPosition({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                //for testing
                // lat: Math.random() >= 0.5 ? 60.002328 : 60.002329,
                // lon: Math.random() >= 0.5 ? 30.262814 : 30.262815,
              }),
            );
        },
        err => {
          console.warn('Error get current position', err.message);
          SentryService.logError('Error get current position (GeolocationService)', { err });
        },
      );
    } else {
      const position = await MapService.getIpLocation();
      console.log('file-Map.service.ts getIpLocation position:', position);
      if (position && isNumber(position.lat) && isNumber(position.lon))
        store.dispatch(mapActions.setUserPosition({ lat: position.lat, lon: position.lon }));
    }
  },
};

export default MapService;

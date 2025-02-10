import { ICoordinates, IHaversineOptions } from '~typedefs/utils/map.utils';
import store from '~redux/store';
import SentryService from '~services/Sentry.service';
import { isNumber } from '~utils/helpers.utils';
import InAppMessageService from '~services/InAppMessage.service';
import { isDev } from '~constants/platform.constants';

const haversine = (function () {
  const RADII = {
    km: 6371,
    mile: 3960,
    meter: 6371000,
    nmi: 3440,
  };

  // convert to radians
  const toRad = function (num: number) {
    return (num * Math.PI) / 180;
  };

  // convert coordinates to standard format based on the passed format option
  const convertCoordinates = function (format: IHaversineOptions['format'], coordinates: any) {
    switch (format) {
      case '[lat,lon]':
        return { lat: coordinates[0], lon: coordinates[1] };
      case '[lon,lat]':
        return { lat: coordinates[1], lon: coordinates[0] };
      case '{lon,lat}':
        return { lat: coordinates.lat, lon: coordinates.lon };
      case '{lat,lng}':
        return { lat: coordinates.lat, lon: coordinates.lng };
      case 'geojson':
        return {
          lat: coordinates.geometry.coordinates[1],
          lon: coordinates.geometry.coordinates[0],
        };
      default:
        return coordinates;
    }
  };

  return function haversine(
    startCoordinates: ICoordinates,
    endCoordinates: ICoordinates,
    options: IHaversineOptions = { unit: 'meter' },
  ) {
    const R = options.unit in RADII ? RADII[options.unit] : RADII.km;

    const start = convertCoordinates(options.format, startCoordinates);
    const end = convertCoordinates(options.format, endCoordinates);

    const dLat = toRad(end.lat - start.lat);
    const dLon = toRad(end.lon - start.lon);
    const lat1 = toRad(start.lat);
    const lat2 = toRad(end.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // if (options.threshold) {
    //   return options.threshold > R * c;
    // }

    return R * c;
  };
})();

export default haversine;

const toRound = (num: number) => (num > 0 && num < 1 ? Math.round(num * 10) / 10 : Math.round(num));

export const distanceToUser = (item: ICoordinates) => {
  const userPosition = store.getState().map.userPosition;
  if (!isNumber(userPosition.lat) || !isNumber(userPosition.lon)) {
    SentryService.logError('User position not found', userPosition);
    isDev &&
      InAppMessageService.danger(
        `User position not found. lat: ${userPosition.lat}, lon: ${userPosition.lon}`,
      );
    return -2;
  }
  if (!isNumber(item.lat) || !isNumber(item.lon)) {
    SentryService.logError('Postamat position not found', {
      postamat: { lat: item.lat, lon: item.lon },
    });
    isDev &&
      InAppMessageService.danger(`Postamat position not found. lat: ${item.lat}, lon: ${item.lon}`);
    return -1;
  }
  return toRound(haversine(userPosition, { lat: item.lat, lon: item.lon }, { unit: 'km' }));
};

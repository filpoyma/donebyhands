import React from 'react';
import { distanceToUser } from '~utils/maps.utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPostomat,
  selectPostomatId,
  selectPostomats,
  selectUserPosition,
} from '~redux/selectors';
import { IParcelLockerWithDistance } from '~typedefs/models/ParcelLocker.model';
import { DEFAULT_ZOOM, defaultCityRegion } from '~constants/map.constants';
import { Animation, YaMap } from 'react-native-yamap';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { orderActions } from '~redux/reducers/order';
import GeolocationService from 'react-native-geolocation-service';
import { mapActions } from '~redux/reducers/map';
import MapService from '~services/Map.service';
import { isNumber } from '~utils/helpers.utils';
import SentryService from '~services/Sentry.service';

export const useMap = ({
  toolId,
  isMainMapScreen,
  isMapInFrameScreen,
  isSelectedToolNotInPostomat,
}: {
  toolId?: string;
  isMainMapScreen?: boolean;
  isMapInFrameScreen?: boolean;
  isSelectedToolNotInPostomat?: boolean;
}) => {
  const allPostomats = useSelector(selectPostomats);
  const userPosition = useSelector(selectUserPosition);
  const postomat = useSelector(selectPostomat);
  const postomatId = useSelector(selectPostomatId);
  const mapRef = React.useRef<YaMap>(null);
  const flatListRef = React.useRef<FlatList>(null);

  const dispatch = useDispatch();

  const [postomatsWithDistance, setPostomatsWithDistance] = React.useState<
    IParcelLockerWithDistance[]
  >([]);
  const [isMapDisplayed, setIsMapDisplayed] = React.useState(false);

  React.useEffect(() => {
    MapService.onLocationHandler()
      .finally(() => {
        const postomats = toolId
          ? allPostomats.filter(postomat =>
              postomat.cells.some(cell => `${cell.tool_id}` === toolId),
            )
          : allPostomats;
        const sortedPostomats = postomats
          .map(item => ({ ...item, distance: distanceToUser(item) }))
          .sort((a, b) => a.distance - b.distance);
        setPostomatsWithDistance(sortedPostomats);

        const shouldUpdateForPostomatWithoutTool =
          sortedPostomats.length > 0 && isSelectedToolNotInPostomat && isMapInFrameScreen;

        const shouldUpdateForOtherCases =
          sortedPostomats.length > 0 && (isMainMapScreen || (!postomat && isMapInFrameScreen));

        if (shouldUpdateForPostomatWithoutTool || shouldUpdateForOtherCases)
          dispatch(orderActions.updateCurrentOrder({ postomatId: sortedPostomats[0]?.id }));
      })
      .catch(err => {
        console.error('Request Location Permissions Error:', err?.message);
        SentryService.logError('onLocationHandler Error (useMap)', err);
      });

    //hack for ios map issue https://github.com/volga-volga/react-native-yamap/issues/211
    setTimeout(() => {
      setIsMapDisplayed(true);
    }, 300);
  }, []);

  React.useEffect(() => {
    if (allPostomats.length) {
      const postamat = allPostomats.find(postomat => postomat.id === postomatId);
      if (postamat)
        dispatch(
          orderActions.updateCurrentOrder({
            distanceToPostomat: distanceToUser(postamat),
          }),
        );
    }
    mapRef.current?.setCenter(
      {
        lat: (postomat?.lat || defaultCityRegion.lat) - 0.005,
        lon: postomat?.lon || defaultCityRegion.lon,
      },
      DEFAULT_ZOOM,
      0,
      0,
      0.6,
      Animation.LINEAR,
    );
  }, [postomatId, isMapDisplayed]);

  useFocusEffect(
    React.useCallback(() => {
      if (postomatsWithDistance.length) {
        let index = postomatsWithDistance.findIndex(
          postomatWithDistance => postomatWithDistance?.id === postomatId,
        );
        flatListRef.current?.scrollToIndex({ animated: true, index: index !== -1 ? index : 0 });
      }
    }, [postomatsWithDistance, postomatId]),
  );

  return { postomatsWithDistance, postomatId, userPosition, mapRef, flatListRef, isMapDisplayed };
};

export const useMapMain = () => {
  const { postomatsWithDistance, postomatId, mapRef, flatListRef, userPosition } = useMap({
    isMainMapScreen: true,
  });

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const watchId = GeolocationService.watchPosition(
        position => {
          if (position && isNumber(position.coords.latitude) && isNumber(position.coords.longitude))
            dispatch(
              mapActions.setUserPosition({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              }),
            );
        },
        err => console.error('Geo watchPosition error', err),
        { distanceFilter: 10 }, // обновление позиции через каждые 10 метров
      );
      return () => {
        watchId && GeolocationService.clearWatch(watchId);
      };
    }, [dispatch]),
  );

  return { postomatsWithDistance, postomatId, userPosition, mapRef, flatListRef };
};

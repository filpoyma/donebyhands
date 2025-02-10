import React from 'react';
import { View } from 'react-native';
import { Marker, YaMap } from 'react-native-yamap';
import { useDispatch } from 'react-redux';

import MyPosIcon from '~assets/icons/mapMyPosMarker.svg';
import { orderActions } from '~redux/reducers/order';
import { defaultCityRegion, mapStyle } from '~constants/map.constants';
import ParcelLockersMarkers from '~components/shared/Map/ParcelLockersMarkers';
import ParcelLockersScrollCards from '~components/shared/Map/ParcelLockersScrollCards';
import { useMap } from '~hooks/useMap.hooks';

import styles from './Map.styles';
import MapOverlay from '~components/shared/Map/MapOverlay';

const MapInFrameScreen = ({
  toolId,
  isSelectedToolNotInPostomat,
}: {
  toolId?: string;
  isSelectedToolNotInPostomat: boolean;
}) => {
  const dispatch = useDispatch();

  const { postomatsWithDistance, postomatId, mapRef, flatListRef, userPosition, isMapDisplayed } =
    useMap({
      toolId,
      isMapInFrameScreen: true,
      isSelectedToolNotInPostomat,
    });

  const onPressParcelLocker = React.useCallback((postomatId: string) => {
    if (postomatId) dispatch(orderActions.updateCurrentOrder({ postomatId }));
  }, []);

  return (
    <View style={styles.container}>
      {isMapDisplayed && (
        <YaMap
          style={styles.map}
          showUserPosition={false}
          rotateGesturesEnabled={false}
          zoomGesturesEnabled={true}
          tiltGesturesEnabled={true}
          scrollGesturesEnabled={true}
          ref={mapRef}
          initialRegion={defaultCityRegion}
          mapStyle={mapStyle}>
          <ParcelLockersMarkers
            postomatsWithDistance={postomatsWithDistance}
            onPressParcelLocker={onPressParcelLocker}
            postomatId={postomatId}
            isLoading={false}
            ref={flatListRef}
          />
          <Marker point={{ lat: userPosition.lat, lon: userPosition.lon }} zIndex={5}>
            <MyPosIcon />
          </Marker>
        </YaMap>
      )}
      <View style={styles.absoluteBottomView}>
        <ParcelLockersScrollCards
          ref={flatListRef}
          postomatId={postomatId}
          postomatsWithDistance={postomatsWithDistance}
          onPressParcelLocker={onPressParcelLocker}
        />
      </View>
      <MapOverlay />
    </View>
  );
};

export default React.memo(MapInFrameScreen);

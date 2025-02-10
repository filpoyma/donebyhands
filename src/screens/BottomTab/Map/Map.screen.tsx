import React from 'react';
import { View } from 'react-native';
import { Marker, YaMap } from 'react-native-yamap';

import MyPosIcon from '~assets/icons/mapMyPosMarker.svg';

import { useDispatch } from 'react-redux';
import { orderActions } from '~redux/reducers/order';
import { defaultCityRegion } from '~constants/map.constants';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import MapBadge from '~components/modal/mapBage';
import parcelLockerService from '~services/ParcelLocker.service';
import { parcelLockersActions } from '~redux/reducers/parcelLockers';
import ParcelLockersMarkers from '~components/shared/Map/ParcelLockersMarkers';
import ParcelLockersScrollCards from '~components/shared/Map/ParcelLockersScrollCards';
import { MapScreenProps } from '~typedefs/screens/Map';
import { useMapMain } from '~hooks/useMap.hooks';
import styles from './Map.styles';
import { isNumeric } from '~utils/helpers.utils';
import { renderLoading } from '~components/shared/Loaders';
import InAppMessageService from '~services/InAppMessage.service';

const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const { isModalOpen, showModal, hideModal } = useModalWithFade();
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();

  const { postomatsWithDistance, postomatId, mapRef, flatListRef, userPosition } = useMapMain();

  const onPressParcelLocker = React.useCallback(
    async (id: string) => {
      if (!postomatId || !isNumeric(id) || isLoading) return;
      setIsLoading(true);
      dispatch(orderActions.updateCurrentOrder({ postomatId: id }));
      try {
        const data = await parcelLockerService.getParcelLockerById(Number(id));
        if (data) {
          dispatch(parcelLockersActions.setById(data));
          showModal();
        }
      } catch (err: any) {
        console.error('getParcelLockerById Err:', err?.message);
        InAppMessageService.danger('Ошибка загрузки данных с постамата.');
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, postomatId, showModal, isLoading],
  );

  return (
    <View style={styles.container}>
      <YaMap
        style={styles.map}
        showUserPosition={false}
        rotateGesturesEnabled={false}
        zoomGesturesEnabled={true}
        tiltGesturesEnabled={true}
        scrollGesturesEnabled={true}
        ref={mapRef}
        initialRegion={defaultCityRegion}>
        <ParcelLockersMarkers
          postomatsWithDistance={postomatsWithDistance}
          onPressParcelLocker={onPressParcelLocker}
          postomatId={postomatId}
          isLoading={isLoading}
          ref={flatListRef}
        />
        <Marker point={{ lat: userPosition.lat, lon: userPosition.lon }} zIndex={5}>
          <MyPosIcon />
        </Marker>
      </YaMap>
      <View style={styles.absoluteBottomView}>
        <ParcelLockersScrollCards
          ref={flatListRef}
          postomatId={postomatId}
          postomatsWithDistance={postomatsWithDistance}
          onPressParcelLocker={onPressParcelLocker}
        />
      </View>
      {renderLoading(isLoading)}
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        <MapBadge
          hideModal={hideModal}
          navigation={navigation}
          isLoading={isLoading}
          isModalOpen={isModalOpen}
        />
      </ModalWithFade>
    </View>
  );
};

export default React.memo(MapScreen);

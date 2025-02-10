import React from 'react';
import { View } from 'react-native';
import { Marker, YaMap } from 'react-native-yamap';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import MyPosIcon from '~assets/icons/mapMyPosMarker.svg';
import { useDispatch } from 'react-redux';
import BackIcon from '~assets/icons/arrowLeftShort.svg';
import IconButton from '~components/shared/buttons/Icon.button';
import { Colors } from '~constants/colors.constants';
import {
  MainStackParamList,
  Screens,
  TabNavigatorParamList,
} from '~constants/navigators.constants';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { orderActions } from '~redux/reducers/order';
import { defaultCityRegion } from '~constants/map.constants';
import ParcelLockersScrollCards from '~components/shared/Map/ParcelLockersScrollCards';
import ParcelLockersMarkers from '~components/shared/Map/ParcelLockersMarkers';
import { useMap } from '~hooks/useMap.hooks';
import styles from './Map.styles';

type MapScreenStack = NativeStackNavigationProp<
  TabNavigatorParamList & MainStackParamList,
  Screens.mapFullScreen
>;
type MapScreenRouteProp = RouteProp<MainStackParamList, Screens.mapFullScreen>;

const MapFullScreen = () => {
  const navigation = useNavigation<MapScreenStack>();
  const route = useRoute<MapScreenRouteProp>();
  const dispatch = useDispatch();
  const toolId = route.params?.toolId;

  const { postomatsWithDistance, postomatId, mapRef, flatListRef, userPosition } = useMap({
    toolId,
  });

  const onBackButtonPress = React.useCallback(() => {
    navigation.navigate(Screens.tabNavigator, { screen: Screens.mainPage });
    navigation.navigate(Screens.arrangeRental);
  }, [navigation]);

  const onPressParcelLocker = React.useCallback(
    (postomatId: string) => {
      if (postomatId) dispatch(orderActions.updateCurrentOrder({ postomatId }));
    },
    [dispatch],
  );

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <IconButton
          Icon={BackIcon}
          size={32}
          onPress={onBackButtonPress}
          color={Colors.transparent}
        />
      </View>

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
          isLoading={false}
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
    </View>
  );
};

export default React.memo(MapFullScreen);

import React from 'react';
import { Marker } from 'react-native-yamap';
import MarkerIconSelected from '~assets/icons/mapPinMarkerSelected.svg';
import MarkerIcon from '~assets/icons/mapPinMarker.svg';
import { FlatList } from 'react-native';
import { ParcelLockersMarkersProps } from '~typedefs/screens/Map';
import { IParcelLockerWithDistance } from '~typedefs/models/ParcelLocker.model';

const ParcelLockersMarkers: React.FC<ParcelLockersMarkersProps> = React.forwardRef(
  (props, ref: React.ForwardedRef<FlatList>) => {
    const { postomatsWithDistance, postomatId, isLoading, onPressParcelLocker } = props;
    return postomatsWithDistance.map((postomat: IParcelLockerWithDistance, index: number) => (
      <Marker
        key={postomat.id}
        onPress={
          isLoading
            ? undefined
            : () => {
                //@ts-ignore
                ref?.current?.scrollToIndex({ animated: true, index: index });
                onPressParcelLocker(postomat.id);
              }
        }
        point={{ lat: postomat.lat || 0, lon: postomat.lon || 0 }}
        zIndex={4}>
        {postomatId === postomat?.id ? <MarkerIconSelected /> : <MarkerIcon />}
      </Marker>
    ));
  },
);

export default React.memo(ParcelLockersMarkers);

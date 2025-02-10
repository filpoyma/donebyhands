import React from 'react';
import { GapH48, GapH7 } from '~components/shared/GapH';
import { waitPromise } from '~utils/helpers.utils';
import PostomatAddressCard from '~components/widgets/PostomatAddressCard';
import { FlatList } from 'react-native';
import { ParcelLockersScrollCardsProps } from '~typedefs/screens/Map';

const ParcelLockersScrollCards: React.FC<ParcelLockersScrollCardsProps> = React.forwardRef(
  ({ postomatsWithDistance, onPressParcelLocker, postomatId }, ref) => {
    return (
      <FlatList
        data={postomatsWithDistance}
        initialNumToRender={25}
        horizontal={true}
        scrollEnabled={postomatsWithDistance?.length !== 0}
        showsHorizontalScrollIndicator={false}
        // ListHeaderComponent={GapH24}
        ListFooterComponent={GapH48}
        ItemSeparatorComponent={GapH7}
        //@ts-ignore
        ref={ref}
        style={{ paddingLeft: 24 }}
        onScrollToIndexFailed={info => {
          waitPromise(500).then(() => {
            //@ts-ignore
            ref?.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
        renderItem={({ item }) => (
          <PostomatAddressCard
            id={item.id}
            title={item.name}
            subtitle={item.address}
            distance={item.distance}
            margins={true}
            isOnMap={true}
            selected={postomatId === item.id}
            onPress={onPressParcelLocker}
          />
        )}
        keyExtractor={item => item.id}
      />
    );
  },
);

export default React.memo(ParcelLockersScrollCards);

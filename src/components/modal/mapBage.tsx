import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';

import { isIOS } from '~constants/platform.constants';

import { Colors } from '~constants/colors.constants';

import { useSwipeVert } from '~hooks/useSwipeVert';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PostomatAddressCard from '~components/widgets/PostomatAddressCard';
import { useSelector } from 'react-redux';
import { selectParcelLockersTools, selectPostomat } from '~redux/selectors';
import { distanceToUser } from '~utils/maps.utils';
import { HeaderText } from '~components/shared/text';
import { getSuffix } from '~utils/dateFormatters.utils';
import { Screens } from '~constants/navigators.constants';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import ItemToolCardCatalogMap from '~components/widgets/Cards/ItemToolCardCatalogMap';
import ToolsCardLoader from '~components/shared/Loaders/ToolsCardLoader';

const MapBadge = ({
  hideModal,
  navigation,
  isLoading,
  isModalOpen,
}: {
  hideModal: () => void;
  navigation: any;
  isLoading: boolean;
  isModalOpen: boolean;
}) => {
  const { height } = useWindowDimensions();
  const { onTouchStart, onScrollEndDrag, onTouchEnd } = useSwipeVert(onSwipe, 4);
  const { bottom } = useSafeAreaInsets();

  const parcelLockersTools = useSelector(selectParcelLockersTools);
  const postomat = useSelector(selectPostomat);
  const numOfTools = parcelLockersTools.length;

  function onSwipe(action: string) {
    if (action === 'down') hideModal();
  }

  const onPressItemToolCard = React.useCallback((id: string) => {
    hideModal();
    navigation.navigate(Screens.toolsPage, { itemId: id, forwardScreen: Screens.map });
  }, []);

  if (!isModalOpen) return null;

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingTop: height / 4,
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onScrollEndDrag={onScrollEndDrag}>
      <TouchableWithoutFeedback>
        <View style={[styles.modalStyle, isIOS && { paddingBottom: bottom ? bottom : 16 }]}>
          <View style={styles.rectangle} />
          <View style={styles.content}>
            <PostomatAddressCard
              title={postomat?.name}
              subtitle={postomat?.address}
              distance={postomat && distanceToUser(postomat)}
              margins={false}
            />
            <HeaderText size={'h4'} centered={false} style={{ marginBottom: -6 }}>
              В постамате
              {isLoading
                ? '...'
                : numOfTools
                ? ' ' + numOfTools + getSuffix(numOfTools, 't')
                : ' нет инстументов.'}
            </HeaderText>
            <View style={styles.cards}>
              {isLoading
                ? [0, 1].map(i => (
                    <View key={i} style={styles.loader}>
                      <ToolsCardLoader />
                    </View>
                  ))
                : parcelLockersTools.map((item, index) => (
                    <ItemToolCardCatalogMap
                      key={item.id}
                      item={item}
                      size={parcelLockersTools.length}
                      index={index}
                      onPress={() => onPressItemToolCard(item.id)}
                    />
                  ))}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 14,
    paddingBottom: 16,
  },
  rectangle: {
    height: 7,
    backgroundColor: Colors.weak,
    borderRadius: 10,
    width: 32,
  },
  content: {
    paddingTop: 9,
    width: '100%',
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    flexBasis: '40%',
    gap: 10,
  },
  contentText: {
    color: Colors.black,
    fontSize: 14,
    lineHeight: 27,
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
  },
  cards: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loader: { marginBottom: 32, marginTop: 10 },
});

export default React.memo(MapBadge);

//     <FlatList
//                 showsVerticalScrollIndicator={false}
//                 data={parcelLockersTools}
//                 numColumns={2}
//                 columnWrapperStyle={styles.columnWrapper}
//                 // ListEmptyComponent={RentedToolsCardEmply}
//                 renderItem={({ item, index }) => (
//                   <View
//                     style={
//                       parcelLockersTools.length - 1 === index
//                         ? { marginBottom: 64, width: '96%' }
//                         : {}
//                     }>
//                     <ItemToolCardCatalog
//                       key={item.id}
//                       imageUri={item.images[0].image}
//                       title={item.name}
//                       price={`${item.price}`}
//                       onPress={() => {
//                         hideModal();
//                         navigation.navigate(Screens.toolsPage, { itemId: item.id });
//                       }}
//                     />
//                   </View>
//                 )}
//                 keyExtractor={item => `${item.id}`}
//               />

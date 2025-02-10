import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { GapV10, GapV16, GapV24 } from '~components/shared/GapH';
import ItemToolCardWideEmpty from '~components/widgets/Cards/ItemToolCardWideEmpty';
import ItemToolCardWideCurrentRent from '~components/widgets/Cards/ItemToolCardWideCurrentRent';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import NothingFound from '~components/shared/NothingFound';
import CurrentRentBadgeComplex from '~components/modal/CurrentRentBadgeComplex';
import { IRentedTools } from '~typedefs/models/Tools.model';
import { Screens } from '~constants/navigators.constants';
import EmptyHistory from '~components/shared/EmptyHistory';
import { TModalNames } from '~typedefs/screens/MainPage';
import { badgeText } from '~utils/dateFormatters.utils';
import GemIcon from '~assets/icons/gem2.svg';
import CheckBoxIcon from '~assets/icons/checkBox.svg';
import HourglassIcon from '~assets/icons/hourglass.svg';
import MapService from '~services/Map.service';

const badgeIcon = (status: number) => {
  switch (status) {
    case 1:
      return GemIcon;
    case 3:
      return CheckBoxIcon;
    default:
      return HourglassIcon;
  }
};

const RentedToolsListCards = ({
  cards = [],
  isSearch = false,
  isHistory = false,
  disabled = false,
  fetchMoreData = () => {},
  navigation,
}: {
  cards: IRentedTools[];
  isSearch?: boolean;
  isHistory?: boolean;
  disabled?: boolean;
  fetchMoreData?: () => void;
  navigation: any;
}) => {
  const { isModalOpen, showModal, hideModal, hideModalAndOverlayLock } = useModalWithFade();
  const [currentItem, setCurrentItem] = React.useState(cards[0]);
  const modalName = React.useRef<TModalNames>('currentRent');

  const EmptyCard = isSearch ? NothingFound : isHistory ? EmptyHistory : ItemToolCardWideEmpty;

  const onCardPress = (item: IRentedTools) => {
    if (item.status_type === 3)
      // заказ оформлен
      return navigation.navigate(Screens.rentPreStarted, {
        pin: item.pin,
        ended: item?.ended,
        orderId: item.id,
        postomatId: `${item?.parce_locker}`,
      });

    if (item.status_type === 2)
      //не оплачено
      return navigation.navigate(Screens.payForTool, {
        orderId: item?.id,
        postomatId: `${item?.parce_locker}`,
        paymentUrl: item?.payment_url,
        contentId: item?.content_type,
      });
    MapService.onLocationHandler().catch(e => {
      console.error('onLocationHandler err', e?.message);
    });
    setCurrentItem(item);
    isHistory && item.status_type === 1
      ? (modalName.current = 'rentHistory')
      : (modalName.current = 'currentRent');
    showModal();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={cards.length !== 0}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={GapV16}
        ListFooterComponent={GapV24}
        ItemSeparatorComponent={GapV10}
        ListEmptyComponent={EmptyCard}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <ItemToolCardWideCurrentRent
            imageUri={item.tool?.images[0].image}
            title={item.tool?.name}
            badgeText={isHistory ? item.status : badgeText(item)}
            BadgeIcon={badgeIcon(item.status_type)}
            disabled={disabled}
            onPress={() => onCardPress(item)}
          />
        )}
        keyExtractor={item => item.id}
      />
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        <CurrentRentBadgeComplex
          modalName={modalName}
          hideModal={hideModal}
          hideModalAndOverlayLock={hideModalAndOverlayLock}
          currentItem={currentItem}
          showModal={showModal}
        />
      </ModalWithFade>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { flexGrow: 1 },
});

export default RentedToolsListCards;

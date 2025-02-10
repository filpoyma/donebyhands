import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { BaseButton } from '~components/shared/buttons';
import SecButton from '~components/shared/buttons/Sec.button';
import { Colors } from '~constants/colors.constants';
import { useSwipeVert } from '~hooks/useSwipeVert';
import ItemToolCardWideCurrentRent from '~components/widgets/Cards/ItemToolCardWideCurrentRent';
import { HeaderText } from '~components/shared/text';
import PostomatAddressCard from '~components/widgets/PostomatAddressCard';
import InTotal from '~components/widgets/InTotal';
import { isIOS } from '~constants/platform.constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IPostomat, IRentedTools } from '~typedefs/models/Tools.model';
import { distanceToUser } from '~utils/maps.utils';
import { badgeText } from '~utils/dateFormatters.utils';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

const CurrentRentBadge = ({
  hideModal,
  item,
  postomat,
  buttonText,
  secButtonText,
  buttonOnPress = () => {},
  secButtonOnPress = () => {},
  isHistory = false,
}: {
  postomat: IPostomat | undefined;
  hideModal: () => void;
  buttonText?: string;
  secButtonText?: string;
  buttonOnPress?: () => void;
  secButtonOnPress?: () => void;
  item: IRentedTools;
  isHistory?: boolean;
}) => {
  const { onTouchStart, onTouchEnd } = useSwipeVert(onSwipe, 7);
  const { bottom } = useSafeAreaInsets();

  function onSwipe(action: string) {
    if (action === 'down') hideModal();
  }
  return (
    <TouchableWithoutFeedback>
      <View
        style={[styles.modalStyle, isIOS && { paddingBottom: bottom ? bottom : 16 }]}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}>
        <View style={styles.rectangle} />
        <View style={{ width: '100%', paddingTop: 15, paddingBottom: 5 }}>
          <ItemToolCardWideCurrentRent
            imageUri={item.tool?.images[0].image}
            title={item.tool?.name}
            badgeText={isHistory ? item.status : badgeText(item)}
            disabled={true}
          />
        </View>
        <View style={styles.content}>
          <HeaderText size="h4" centered={false}>
            Адрес постамата аренды
          </HeaderText>
          <PostomatAddressCard
            title={postomat?.name}
            subtitle={postomat?.address}
            distance={postomat && distanceToUser(postomat)}
          />
          <InTotal
            tariffName={item?.tariff?.name}
            tariffPrice={item?.tariff?.price}
            totalPrice={item?.total_cost}
            overdue={item?.overdue_cost}
            extendRentCost={item?.extend_rent_cost}
          />
          {!!buttonText && <BaseButton text={buttonText} onPressIn={buttonOnPress} />}
          {!!secButtonText && (
            <SecButton
              text={secButtonText}
              onPress={() => {
                secButtonOnPress();
                hideModal();
              }}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    gap: 10,
  },
});

export default CurrentRentBadge;

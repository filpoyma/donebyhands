import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native';

import { BaseButton } from '~components/shared/buttons';
import SecButton from '~components/shared/buttons/Sec.button';
import { Colors } from '~constants/colors.constants';
import { useSwipeVert } from '~hooks/useSwipeVert';
import { HeaderText } from '~components/shared/text';
import PostomatAddressCard from '~components/widgets/PostomatAddressCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isIOS } from '~constants/platform.constants';
import { distanceToUser } from '~utils/maps.utils';
import { IPostomat } from '~typedefs/models/Tools.model';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

const AroundPostomatBadge = ({
  hideModal,
  buttonOnPress = () => {},
  secButtonOnPress = () => {},
  postomat,
}: {
  hideModal: () => void;
  buttonOnPress?: () => void;
  secButtonOnPress?: () => void;
  postomat: IPostomat | undefined;
}) => {
  const { onTouchStart, onTouchEnd } = useSwipeVert(onSwipe, 7);
  const { height } = useWindowDimensions();
  function onSwipe(action: string) {
    if (action === 'down') hideModal();
  }
  const { bottom } = useSafeAreaInsets();

  const onSubmitReturnTool = React.useCallback(() => {
    buttonOnPress();
    hideModal();
  }, []);

  const onCancelReturnTool = React.useCallback(() => {
    secButtonOnPress();
    hideModal();
  }, []);

  return (
    <TouchableWithoutFeedback>
      <View
        style={[
          styles.modalStyle,
          { marginTop: height / 3 },
          isIOS && { paddingBottom: bottom ? bottom : 16 },
        ]}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}>
        <View style={styles.rectangle} />

        <View style={styles.content}>
          <HeaderText size="h2" centered={false}>
            Вы рядом с постаматом?
          </HeaderText>
          <PostomatAddressCard
            title={postomat?.name}
            subtitle={postomat?.address}
            distance={postomat && distanceToUser(postomat)}
          />
          <BaseButton text="Да" onPress={onSubmitReturnTool} />
          <SecButton text="Нет" onPress={onCancelReturnTool} />
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
    paddingTop: 15,
    width: '100%',
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    gap: 10,
  },
});

export default AroundPostomatBadge;

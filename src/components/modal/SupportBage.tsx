import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import { BaseButton } from '~components/shared/buttons';
import SecButton from '~components/shared/buttons/Sec.button';
import { HeaderText } from '~components/shared/text';
import { Colors } from '~constants/colors.constants';
import { useSwipeVert } from '~hooks/useSwipeVert';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isIOS } from '~constants/platform.constants';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

const SupportBage = ({
  hideModal,
  titleText,
  buttonText,
  secButtonText,
  buttonOnPress = () => {},
  secButtonOnPress = () => {},
}: {
  hideModal: () => void;
  titleText: string;
  buttonText: string;
  secButtonText?: string;
  buttonOnPress?: () => void;
  secButtonOnPress?: () => void;
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
        <View style={styles.content}>
          <HeaderText size={'h2'} centered={false} style={{ paddingBottom: 5 }}>
            {titleText}
          </HeaderText>
          <BaseButton
            text={buttonText}
            onPress={() => {
              buttonOnPress();
              hideModal();
            }}
          />
          <SecButton
            text={secButtonText}
            onPress={() => {
              secButtonOnPress();
              hideModal();
            }}
          />
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

export default SupportBage;

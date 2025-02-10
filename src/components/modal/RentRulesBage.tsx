import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import { BaseButton } from '~components/shared/buttons';
import { HeaderText } from '~components/shared/text';
import { Colors } from '~constants/colors.constants';
import { useSwipeVert } from '~hooks/useSwipeVert';
import { isIOS } from '~constants/platform.constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

const RentRulesBage = ({
  hideModal,
  titleText,
  contentText = '',
  buttonText,
  noSwipe = false,
}: {
  hideModal: () => void;
  titleText: string;
  contentText: string | undefined;
  buttonText: string;
  noSwipe?: boolean;
}) => {
  const { onTouchStart, onTouchEnd } = useSwipeVert(onSwipe, 2.5);
  const { width, height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  function onSwipe(action: string) {
    if (noSwipe) return;
    if (action === 'down') hideModal();
  }
  return (
    <View
      style={[
        styles.modalStyle,
        { marginTop: height / 4 },
        isIOS && { paddingBottom: bottom ? bottom : 16 },
      ]}>
      <View style={styles.rectangle} />
      <ScrollView>
        <TouchableWithoutFeedback>
          <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <View style={styles.content}>
              <HeaderText size={'h2'} centered={false}>
                {titleText}
              </HeaderText>
              {/*<TitleText>{contentText}</TitleText>*/}
              <RenderHtml
                source={{ html: `<html lang="ru"><body>${contentText || ''}</html></body>` }}
                contentWidth={width}
                systemFonts={['Inter-Regular']}
                tagsStyles={{
                  body: {
                    fontFamily: 'Inter-Regular',
                    color: Colors.black,
                    fontSize: 14,
                    lineHeight: 21,
                  },
                  p: { lineHeight: 21 },
                  li: { lineHeight: 17 },
                  img: { display: 'none' },
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View
        style={{
          marginTop: 16,
          bottom: 0,
          right: 0,
          width: '100%',
          paddingHorizontal: SCREEN_PADDINGS.horizontal,
        }}>
        <BaseButton text={buttonText} onPress={hideModal} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: Colors.white,
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
    marginBottom: 16,
  },
  content: {
    paddingTop: 9,
    width: '100%',
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    gap: 10,
  },
  contentText: {
    color: Colors.black,
    fontSize: 14,
    lineHeight: 27,
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
  },
});

export default RentRulesBage;

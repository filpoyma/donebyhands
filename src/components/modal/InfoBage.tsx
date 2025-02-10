import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import RenderHtml from 'react-native-render-html';

import { BaseButton } from '~components/shared/buttons';
import SecButton from '~components/shared/buttons/Sec.button';
import { HeaderText } from '~components/shared/text';
import { Colors } from '~constants/colors.constants';
import { isIOS } from '~constants/platform.constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import { TSvgProps } from '~typedefs/common';

const InfoBage = ({
  hideModal,
  titleText,
  contentText = '',
  buttonText,
  buttonOnPress = () => {},
  secButtonText,
  secButtonOnPress = () => {},
  TitleIcon,
  textAlign = 'left',
}: {
  hideModal: () => void;
  titleText: string;
  contentText: string | undefined;
  buttonText: string;
  buttonOnPress?: () => void;
  secButtonText?: string;
  secButtonOnPress?: () => void;
  TitleIcon?: React.FC<TSvgProps>;
  textAlign?: 'left' | 'center';
}) => {
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  return (
    <TouchableWithoutFeedback>
      <View
        style={[
          styles.modalStyle,
          // { marginTop: height / 3 },
          isIOS && { paddingBottom: bottom ? bottom : 16 },
        ]}>
        <View style={styles.rectangle} />
        {TitleIcon && (
          <View style={styles.titleImage}>
            <TitleIcon />
          </View>
        )}
        <View style={styles.content}>
          <HeaderText size={'h2'} centered={textAlign === 'center'}>
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
                textAlign: textAlign,
              },
              p: { lineHeight: 21 },
              li: { lineHeight: 17 },
              img: { display: 'none' },
            }}
          />
          <BaseButton
            text={buttonText}
            onPress={() => {
              console.log('file-InfoBage.tsx BaseButtonOnPress:');
              buttonOnPress();
              hideModal();
            }}
          />
          {secButtonText && (
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
    zIndex: 99,
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
  contentText: {
    color: Colors.black,
    fontSize: 14,
    lineHeight: 27,
    fontFamily: 'Inter-Regular',
    textAlign: 'left',
  },
  titleImage: {
    marginTop: 48,
    marginBottom: 36,
  },
});

export default InfoBage;

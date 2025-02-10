import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { BaseButton } from '~components/shared/buttons';
import SecButton from '~components/shared/buttons/Sec.button';
import { HeaderText } from '~components/shared/text';
import { Colors } from '~constants/colors.constants';
import { useSwipeVert } from '~hooks/useSwipeVert';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isIOS } from '~constants/platform.constants';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

const PhotosInfoBadge = ({
  hideModal,
  titleText,
  message,
  buttonText,
  secButtonText,
  buttonOnPress = () => {},
  secButtonOnPress = () => {},
}: {
  hideModal: () => void;
  titleText: string;
  message: string;
  buttonText: string;
  secButtonText?: string;
  buttonOnPress?: (text: string) => void;
  secButtonOnPress?: () => void;
}) => {
  const { onTouchStart, onTouchEnd } = useSwipeVert(onSwipe, 7);
  const { bottom } = useSafeAreaInsets();
  function onSwipe(action: string) {
    if (action === 'down') hideModal();
  }

  const textRef = React.useRef<string>('');

  const onChangeText = (text: string) => {
    textRef.current = text;
  };

  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'}>
        <View
          style={[styles.modalStyle, isIOS && { paddingBottom: bottom ? bottom : 16 }]}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}>
          <View style={styles.rectangle} />
          <View style={styles.content}>
            <HeaderText size={'h2'} centered={true} style={{ paddingBottom: 5 }}>
              {titleText}
            </HeaderText>
            <TextInput
              style={styles.inputText}
              defaultValue={message}
              onChangeText={onChangeText}
              placeholder="Введите текст"
              multiline={true}
              underlineColorAndroid="transparent"
              cursorColor={Colors.weak}
              selectionColor={Colors.weak}
            />
            <BaseButton
              text={buttonText}
              onPress={() => {
                buttonOnPress(textRef.current);
                hideModal();
              }}
            />
            <SecButton
              text={secButtonText}
              onPress={() => {
                secButtonOnPress();
                textRef.current = '';
                hideModal();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
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
  inputText: {
    width: '100%',
    minHeight: 150,
    borderRadius: 16,
    backgroundColor: Colors.grey,
    padding: 20,
    marginVertical: 5,
    fontFamily: 'Inter-Regular',
    color: Colors.black,
    fontSize: 14,
    lineHeight: 21,
    textAlignVertical: 'top',
  },
});

export default PhotosInfoBadge;

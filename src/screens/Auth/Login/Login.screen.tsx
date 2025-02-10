import React from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import styles from './Login.styles';
import { AppText, HeaderText } from '~components/shared/text';
import { ScreenView } from '~components/view';
import { BaseButton } from '~components/shared/buttons';
import PlHolderText from '~components/shared/text/PlHolder.text';
import MaskInput from '~components/shared/input/MaskInput.component';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import PhoneIcon from '~assets/icons/phone.svg';
import { phoneMask } from '~constants/maskInput.constants';
import { isIOS } from '~constants/platform.constants';
import { Screens, ScreensParams } from '~constants/navigators.constants';
import authService from '~services/Auth.service';
import useFlashMessage from '~hooks/useFlashMessage.hook';
import { useKeyboardView } from '~hooks/useKeyboardView.hook';
import { selectPrivacyPolicy, selectTermsOfService } from '~redux/selectors';
import { LoginScreenProps } from '~typedefs/screens/Login';
import InfoBageScroll from '~components/modal/InfoBageScroll';
import { errorHandler, withCatch } from '~utils/errorHandlers.utils';

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, route }) => {
  const { title, subtitle, buttonText, infoTitle, infoSubtitle, isSignIn } =
    ScreensParams[route.name];
  const [phone, setPhone] = React.useState('');
  const [unmasked, setUnmasked] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const privacyPolicy = useSelector(selectPrivacyPolicy);
  const termsOfService = useSelector(selectTermsOfService);

  const { isModalOpen, showModal, hideModal } = useModalWithFade();
  const { renderFlashMessage } = useFlashMessage();
  const { isOnScreen } = useKeyboardView();

  const maskedInputRef = React.useRef<TextInput>(null);
  const modalName = React.useRef('service');

  const onMaskInputChange = React.useCallback(
    (masked: string, unmasked: string) => {
      if (/^8/.test(unmasked) && !/^\+7/.test(phone)) setPhone('+7');
      else setPhone(masked);
      setUnmasked(unmasked);
    },
    [phone],
  );

  const focusInput = React.useCallback(() => {
    maskedInputRef.current?.focus();
  }, []);
  const resetPhone = React.useCallback(() => {
    setPhone('+7 ');
    setUnmasked('');
    focusInput();
  }, [focusInput]);

  const navigateHandler = () => {
    isSignIn ? navigation.navigate(Screens.signUp) : navigation.navigate(Screens.signIn);
  };

  const navigateToCatalog = () => {
    navigation.navigate(Screens.catalogUnAuth);
  };

  const modalText = () =>
    modalName.current === 'service'
      ? { title: 'Условия обслуживания', content: termsOfService }
      : { title: 'Политика конфиденциальности', content: privacyPolicy };

  const submitPhone = React.useCallback(async () => {
    setIsLoading(true);
    const [error] = await withCatch(
      isSignIn
        ? authService.signInSendcode({ mobile_phone: phone })
        : authService.signUpSendcode({ mobile_phone: phone }),
    );
    if (error) errorHandler('Send SMS error', error);
    else navigation.navigate(Screens.otpConfirmation, { phone: '+7' + unmasked, isSignIn });
    setIsLoading(false);
  }, [isSignIn, phone, unmasked, navigation]);

  return (
    <ScreenView fullArea>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={isIOS ? 'padding' : 'height'}>
          <View style={styles.title}>
            <HeaderText>{title}</HeaderText>
            <HeaderText size={'h3'} style={styles.subtitle}>
              {subtitle}
            </HeaderText>
          </View>

          <View style={styles.form}>
            <MaskInput
              placeholder="Номер телефона"
              keyboardType="phone-pad"
              ref={maskedInputRef}
              mask={phoneMask}
              onChangeText={onMaskInputChange}
              onClosePress={resetPhone}
              minValueLength={3}
              maxLength={18}
              value={phone}
              LeftIcon={PhoneIcon}
            />

            <BaseButton
              text={buttonText}
              onPress={submitPhone}
              disabled={unmasked.length < 10 || isLoading}
            />
            <View style={styles.info}>
              <PlHolderText>{infoTitle}</PlHolderText>
              <TouchableOpacity onPress={navigateHandler}>
                <AppText style={styles.infoSubtitle}>{infoSubtitle}</AppText>
              </TouchableOpacity>
              {isSignIn && (
                <TouchableOpacity onPress={navigateToCatalog}>
                  <AppText style={styles.infoSubtitle}>{'Посмотреть каталог'}</AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      {isOnScreen && (
        <View style={styles.footer}>
          <AppText style={styles.footerText}>Выполняя вход, я подтверждаю, что прочитал</AppText>
          <AppText style={styles.footerText}>
            и принимаю{' '}
            <Text
              style={styles.marked}
              suppressHighlighting
              onPress={() => {
                modalName.current = 'privacy';
                showModal();
              }}>
              Политику конфиденциальности.
            </Text>
          </AppText>
        </View>
      )}
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        <InfoBageScroll
          titleText={modalText().title}
          contentText={modalText().content}
          buttonText="Закрыть"
          hideModal={hideModal}
        />
      </ModalWithFade>
      {renderFlashMessage()}
    </ScreenView>
  );
};

export default LoginScreen;

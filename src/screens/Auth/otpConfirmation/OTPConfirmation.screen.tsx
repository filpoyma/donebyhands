import React from 'react';
import { Text, KeyboardAvoidingView, View, Keyboard } from 'react-native';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { AppText, HeaderText } from '~components/shared/text';
import { ScreenView } from '~components/view';
import { isIOS, isProd } from '~constants/platform.constants';
import { BackButtonHeader } from '~components/widgets/headers';
import PlaceholderOTP from '~components/widgets/PlaceholderOTP';
import styles from './OTPConfirmation.styles';
import { OTPConfirmationScreenProps } from '~typedefs/screens/OTPConfirmation';
import authService from '~services/Auth.service';
import useFlashMessage from '~hooks/useFlashMessage.hook';
import { OTPTimer } from '~constants/api.constants';
import { Screens } from '~constants/navigators.constants';
import AuthService from '~services/Auth.service';
import { HTTPError } from 'ky';
import { errorHandler, errorHandlerSentry } from '~utils/errorHandlers.utils';
import YaMetricaService from '~services/YandexMetrica.service';
import { useDispatch } from 'react-redux';
import { authActions } from '~redux/reducers/auth';

const OTPConfirmationScreen: React.FC<OTPConfirmationScreenProps> = ({ navigation, route }) => {
  const [value, setValue] = React.useState('');
  const [timer, setTimer] = React.useState(OTPTimer);
  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { phone, isSignIn } = route.params;
  const [isOTPCorrect, setIsOTPCorrect] = React.useState<null | boolean>(null);
  const { renderFlashMessage, showFlashMessage } = useFlashMessage();

  const dispatch = useDispatch();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    if (value.length === 4) {
      isSignIn ? submitSignIn() : submitSignUp();
    } else {
      setIsOTPCorrect(null);
    }
  }, [value]);

  const submitSignIn = async () => {
    authService
      .getToken({ mobile_phone: phone, password: value })
      .then(() => {
        setIsOTPCorrect(true);
        AuthService.login()
          .then(() => console.log('Login success'))
          .catch(err => {
            errorHandlerSentry(
              'Login error',
              err,
              'yes',
              isProd ? 'Ошибка сервера. Попробуйте зайти позже.' : undefined,
            );
          });
      })
      .catch(e => {
        console.error('OTP error', e?.message);
        setIsOTPCorrect(false);
      });
  };

  const submitSignUp = async () => {
    authService
      .getToken({ mobile_phone: phone, password: value })
      .then(userId => {
        dispatch(authActions.updateUser({ mobile_phone: phone }));
        YaMetricaService.logInfo('Регистрации');
        setIsOTPCorrect(true);
        navigation.navigate(Screens.personalData, { userId });
      })
      .catch(e => {
        console.error(
          'SignUp error:',
          e instanceof HTTPError ? e.response?.status : (e as Error).message,
        );
        YaMetricaService.logError(phone, 'Ошибка регистрации', e?.message);
        if (e?.response?.status >= 500)
          showFlashMessage('Ошибка сервера. Попробуйте зайти позже.', 'danger');
        setIsOTPCorrect(false);
        // setValue('');\\\\\
        // ref.current?.focus();
      });
  };

  const resendSms = () => {
    authService
      .signInSendcode({
        mobile_phone: phone,
      })
      .catch(e => {
        errorHandler('Send SMS login error', e);
      });
  };

  const resendSMSHandler = () => {
    if (!isOTPCorrect) {
      setIsOTPCorrect(null);
      setValue('');
      setTimer(OTPTimer);
      resendSms();
    }
  };

  return (
    <ScreenView>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={isIOS ? 'padding' : 'height'}>
        <View>
          <BackButtonHeader onBackButtonPress={navigation.goBack} />
        </View>
        <View style={styles.title}>
          <HeaderText>Код подтверждения</HeaderText>
          <HeaderText size={'h3'} style={styles.subtitle}>
            На номер <Text style={styles.marked}>{phone}</Text> отправлен код для подтверждения
            входа
          </HeaderText>
        </View>

        <View style={styles.otp}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            editable={!!timer || !!isOTPCorrect}
            cellCount={4}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            onSubmitEditing={Keyboard.dismiss}
            renderCell={({ index, symbol, isFocused }) => (
              <AppText
                key={index}
                style={[
                  styles.cell,
                  value.length === 4 &&
                    isOTPCorrect !== null &&
                    (isOTPCorrect ? styles.numCorrect : styles.numInCorrect),
                  isFocused && styles.focusCell,
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {/*{symbol || (isFocused ? <Cursor /> : null)}*/}
                {symbol}
              </AppText>
            )}
          />
        </View>
        <PlaceholderOTP
          value={value}
          correctOTP={isOTPCorrect}
          timer={timer}
          onPressResend={resendSMSHandler}
        />
      </KeyboardAvoidingView>
      {renderFlashMessage()}
    </ScreenView>
  );
};

export default OTPConfirmationScreen;

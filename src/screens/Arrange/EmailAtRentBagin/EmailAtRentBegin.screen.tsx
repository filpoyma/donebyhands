import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native';

import { ScreenView } from '~components/view';
import SecButton from '~components/shared/buttons/Sec.button';
import styles from './EmailAtRentBegin.styles';
import { EmailAtRentBeginScreenProps } from '~typedefs/screens/EmailAtRentBegin';
import { isIOS } from '~constants/platform.constants';
import TextInputLabeled from '~components/shared/input/TextInputLabeled.component';
import { HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';
import WebViewPayment from '~components/widgets/Payments/WebViewPayment';
import { renderLoading } from '~components/shared/Loaders';
import emailAtRentalLogic from '~screens/Arrange/EmailAtRentBagin/EmailAtRentalBegin.logic';

const EmailAtRentBeginScreen: React.FC<EmailAtRentBeginScreenProps> = ({ navigation, route }) => {
  const { paymentUrl, catchRedirectedUrl, values, onChangeHandler, isLoading, onSubmitHandler } =
    emailAtRentalLogic(navigation, route);

  if (paymentUrl)
    return (
      <ScreenView screenPaddings={false}>
        <WebViewPayment paymentUrl={paymentUrl} catchRedirectedUrl={catchRedirectedUrl} />
      </ScreenView>
    );

  return (
    <ScreenView fullArea screenPaddings={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.container}>
            <HeaderText>Электронная почта</HeaderText>
            <PlHolderText>
              Введите адрес электронной почты, чтобы получить чек после оплаты. Если чек не нужен,
              поле можно оставить пустым.
            </PlHolderText>
            <View style={styles.inputs}>
              <TextInputLabeled
                name="email"
                value={values.email}
                labelError={values.emailError}
                onChangeTextNamed={onChangeHandler}
                keyboardType="email-address"
                placeholder={'Адрес электронной почты'}
              />
            </View>
          </KeyboardAvoidingView>
          <SecButton text="Оплатить" disabled={isLoading} onPress={onSubmitHandler} />
        </View>
      </TouchableWithoutFeedback>
      {renderLoading(isLoading)}
    </ScreenView>
  );
};

export default EmailAtRentBeginScreen;

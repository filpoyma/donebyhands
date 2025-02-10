import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import TextInputLabeled from '~components/shared/input/TextInputLabeled.component';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import PayoneerIcon from '~assets/icons/payoneerWBg.svg';
import RowView from '~components/view/Row.view';
import { BaseButton } from '~components/shared/buttons';
import { cardNumberMask, cardDateMask, cardCVCMask } from '~constants/maskInput.constants';
import MaskInput from '~components/shared/input/MaskInput.component';
import { isIOS } from '~constants/platform.constants';
import { MainStackParamList, Screens } from '~constants/navigators.constants';

type AddPaymentsScreenProps = StackScreenProps<MainStackParamList, Screens.addPayments>;

const AddPaymentsScreen: React.FC<AddPaymentsScreenProps> = ({ navigation }) => {
  const [values, setValues] = React.useState({
    cardNumber: '',
    name: '',
    expiredDate: '',
    cvv: '',
  });
  const maskedInputRef = React.useRef<TextInput>(null);
  const onChangeHandler = React.useCallback((name: string, value: string) => {
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);
  return (
    <ScreenView fullArea screenPaddings>
      <BackButtonHeader onBackButtonPress={navigation.goBack} title="Контактная информация" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.inputs}>
              <MaskInput
                label="Номер карты"
                placeholder="Номер карты"
                inputMode={'numeric'}
                ref={maskedInputRef}
                mask={cardNumberMask}
                onChangeText={masked => onChangeHandler('cardNumber', masked)}
                minValueLength={19}
                maxLength={19}
                value={values.cardNumber}
                LeftIcon={PayoneerIcon}
              />
              <TextInputLabeled
                name="name"
                value={values.name}
                label="Имя на карте"
                onChangeTextNamed={onChangeHandler}
              />
              <RowView style={styles.row}>
                <View style={styles.inputWrap}>
                  <MaskInput
                    label="Срок действия"
                    placeholder="MM/ГГ"
                    inputMode={'numeric'}
                    ref={maskedInputRef}
                    mask={cardDateMask}
                    onChangeText={masked => onChangeHandler('expiredDate', masked)}
                    minValueLength={5}
                    maxLength={5}
                    value={values.expiredDate}
                  />
                </View>
                <View style={styles.inputWrap}>
                  <MaskInput
                    label="CVC/CVV"
                    placeholder="***"
                    inputMode={'numeric'}
                    ref={maskedInputRef}
                    mask={cardCVCMask}
                    onChangeText={masked => onChangeHandler('cvv', masked)}
                    minValueLength={3}
                    maxLength={3}
                    value={values.cvv}
                  />
                </View>
              </RowView>
            </View>
          </KeyboardAvoidingView>
          <BaseButton
            text="Добавить карту"
            onPress={() => {
              Math.random() > 0.5
                ? navigation.navigate(Screens.paymentsInfo)
                : navigation.navigate(Screens.rentError, {
                    title: 'Карта не привязана',
                    subtitle: 'Что то пошло не так',
                  });
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    gap: 10,
  },
  inputs: {
    marginTop: 10,
    gap: 10,
  },
  inputWrap: {
    flex: 1,
  },
});

export default AddPaymentsScreen;

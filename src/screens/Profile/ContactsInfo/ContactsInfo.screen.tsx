import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import TextInputLabeled from '~components/shared/input/TextInputLabeled.component';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import SecButton from '~components/shared/buttons/Sec.button';
import { useSelector } from 'react-redux';
import { selectUser } from '~redux/selectors';
import { phoneRegex, emailRegex } from '~constants/regex.constants';
import { MainStackParamList, Screens } from '~constants/navigators.constants';
import UserService from '~services/User.service';
import { isIOS } from '~constants/platform.constants';

type ContactsInfoScreenProps = StackScreenProps<MainStackParamList, Screens.contactsInfo>;

const ContactsInfoScreen: React.FC<ContactsInfoScreenProps> = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    surname: user?.last_name || '',
    name: user?.first_name || '',
    phone: user?.mobile_phone || '',
    email: user?.email || '',
    emailError: '',
  });

  const onChangeHandler = React.useCallback((name: string, value: string) => {
    setValues(prevValues => ({ ...prevValues, [name]: value, emailError: '' }));
  }, []);

  const onSubmitHandler = React.useCallback(() => {
    if (!emailRegex.test(values.email))
      return setValues(prevValues => ({ ...prevValues, emailError: ' ' }));
    if (user?.id) {
      setIsLoading(true);
      UserService.updateUser({
        id: user.id,
        first_name: values.name,
        last_name: values.surname,
        email: values.email,
      })
        .then(navigation.goBack)
        .catch(e => console.error('Error while updating user in ContactInfoScreen', e?.message))
        .finally(() => setIsLoading(false));
    }
  }, [values, user?.id, navigation.goBack]);
  return (
    <ScreenView fullArea screenPaddings>
      <BackButtonHeader onBackButtonPress={navigation.goBack} title="Контактная информация" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.inputs}>
              <TextInputLabeled
                name="surname"
                value={values.surname}
                label="Фамилия"
                onChangeTextNamed={onChangeHandler}
                autoCapitalize="words"
              />
              <TextInputLabeled
                name="name"
                value={values.name}
                label="Имя"
                onChangeTextNamed={onChangeHandler}
                autoCapitalize="words"
              />
              <TextInputLabeled
                name="phone"
                value={''}
                label="Контактный телефон"
                onChangeTextNamed={onChangeHandler}
                keyboardType="phone-pad"
                editable={false}
                placeholder={values.phone.replace(phoneRegex, '$1 $2 $3 $4 $5')}
              />
              <TextInputLabeled
                name="email"
                value={values.email}
                label="Электронная почта"
                labelError={values.emailError}
                onChangeTextNamed={onChangeHandler}
                keyboardType="email-address"
              />
            </View>
          </KeyboardAvoidingView>
          <SecButton text="Сохранить" disabled={isLoading} onPress={onSubmitHandler} />
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
  inputs: {
    marginTop: 10,
    gap: 10,
  },
});

export default ContactsInfoScreen;

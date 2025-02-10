import React from 'react';

import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { HeaderText } from '~components/shared/text';
import { ScreenView } from '~components/view';
import { BaseButton } from '~components/shared/buttons';
import { isIOS } from '~constants/platform.constants';
import { Screens } from '~constants/navigators.constants';
import TextInputLabeled from '~components/shared/input/TextInputLabeled.component';
import styles from './PersonalData.styles';
import { PersonalDataScreenProps } from '~typedefs/screens/PersonalData';
import UserService from '~services/User.service';

const PersonalDataScreen: React.FC<PersonalDataScreenProps> = ({ navigation, route }) => {
  const [values, setValues] = React.useState({ name: '', surname: '' });
  const userId = route.params.userId;
  const onSubmitHandler = React.useCallback(() => {
    UserService.updateUser({
      id: userId,
      first_name: values.name,
      last_name: values.surname,
    })
      .then(() => {
        navigation.navigate(Screens.personalDataPhotoPassport, { userId });
      })
      .catch(e => {
        console.error('UpdateUser error:', e?.message);
        // showFlashMessage(e.message.message, 'danger');
      });
  }, [values, navigation, userId]);

  const onChangeHandler = React.useCallback((name: string, value: string) => {
    setValues(prevValues => ({ ...prevValues, [name]: value.replace(/[^a-zA-Zа-яА-Я]+/g, '') }));
  }, []);

  return (
    <ScreenView>
      <View>
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.title}>
            <HeaderText>Персональные данные</HeaderText>
            <HeaderText size={'h3'} style={styles.subtitle}>
              Подтверждение личности
            </HeaderText>
          </View>

          <KeyboardAvoidingView
            enabled
            // keyboardVerticalOffset={100 + 47}
            behavior={isIOS ? 'padding' : 'height'}>
            <View style={styles.inputs}>
              <TextInputLabeled
                name="name"
                value={values.name}
                onChangeTextNamed={onChangeHandler}
                placeholder="Имя"
                autoCapitalize="words"
              />
              <TextInputLabeled
                name="surname"
                value={values.surname}
                onChangeTextNamed={onChangeHandler}
                placeholder="Фамилия"
                autoCapitalize="words"
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        <View style={styles.button}>
          <BaseButton
            text="Далее"
            onPress={onSubmitHandler}
            disabled={!(values.name && values.surname)}
          />
        </View>
      </View>
    </ScreenView>
  );
};

export default PersonalDataScreen;

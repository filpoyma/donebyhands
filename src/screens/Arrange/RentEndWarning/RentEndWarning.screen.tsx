import React from 'react';
import { View } from 'react-native';

import { ScreenView } from '~components/view';
import { HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';

import SecButton from '~components/shared/buttons/Sec.button';
import { Screens } from '~constants/navigators.constants';
import styles from './RentEndWarning.styles';
import { BaseButton } from '~components/shared/buttons';
import IconTitle from '~assets/icons/bigError.svg';
import { RentEndWarningScreenProps } from '~typedefs/screens/RentEndWarning';

const RentEndWarningScreen: React.FC<RentEndWarningScreenProps> = ({ navigation, route }) => {
  const { orderId, postomatId } = route.params;

  return (
    <ScreenView fullArea screenPaddings={true}>
      <View style={styles.container}>
        <IconTitle />
        <HeaderText>Вы завершаете аренду</HeaderText>
        <PlHolderText>
          Обращаем ваше внимание на то, что все оставшееся время аренды сгорает.
        </PlHolderText>
      </View>
      <View style={styles.buttons}>
        <BaseButton
          text={'Завершить аренду'}
          onPress={() => {
            navigation.navigate(Screens.takingToolsPictures, {
              orderId: orderId,
              postomatId: postomatId,
              photoType: 'return',
            });
          }}
        />
        <SecButton
          text={'Отмена'}
          onPress={() => {
            navigation.navigate(Screens.tabNavigator, { screen: Screens.mainPage });
          }}
        />
      </View>
    </ScreenView>
  );
};

export default RentEndWarningScreen;

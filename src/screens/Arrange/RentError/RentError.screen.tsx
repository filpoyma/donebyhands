import React from 'react';
import { View } from 'react-native';

import { ScreenView } from '~components/view';
import { HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';
import ErrorIcon from '~assets/icons/bigError.svg';
import SecButton from '~components/shared/buttons/Sec.button';
import { Screens } from '~constants/navigators.constants';
import styles from './RentError.styles';
import { RentErrorScreenProps } from '~typedefs/screens/RentError';
import RentService from '~services/Rent.service';

const RentErrorScreen: React.FC<RentErrorScreenProps> = ({ navigation, route }) => {
  const { title, subtitle } = route.params;

  React.useEffect(() => {
    RentService.setRentedTools().catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <ScreenView fullArea screenPaddings={true}>
      <View style={styles.container}>
        <ErrorIcon />
        <View style={styles.title}>
          <HeaderText>{title}</HeaderText>
        </View>
        <View style={styles.subtitle}>
          <PlHolderText>{subtitle}</PlHolderText>
        </View>
      </View>
      <SecButton
        text={'На главную'}
        onPress={() => {
          navigation.navigate(Screens.tabNavigator, { screen: Screens.mainPage });
        }}
      />
    </ScreenView>
  );
};

export default RentErrorScreen;

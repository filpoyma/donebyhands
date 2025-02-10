import React from 'react';
import { View } from 'react-native';

import { HeaderText } from '~components/shared/text';
import { ScreenView } from '~components/view';
import { Screens, ScreensParams } from '~constants/navigators.constants';
import SecButton from '~components/shared/buttons/Sec.button';
import PlHolderText from '~components/shared/text/PlHolder.text';
import styles from './CheckFailed.styles';
import { CheckFailedScreenProps } from '~typedefs/screens/ChechFailed';
import { useSelector } from 'react-redux';
import { selectUser } from '~redux/selectors';

const CheckFailedScreen: React.FC<CheckFailedScreenProps> = ({ navigation, route }) => {
  const { title, subtitle } = ScreensParams[route.name];
  const user = useSelector(selectUser);
  const subtitleWithReason = user?.verif_failure;

  return (
    <ScreenView fullArea>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.title}>
            <HeaderText>{subtitleWithReason ? title + '.' : title}</HeaderText>
            <HeaderText size={'h4'} style={styles.subtitle}>
              {subtitleWithReason ? `Причина: ${subtitleWithReason}` : subtitle}
            </HeaderText>
          </View>
        </View>
        <View style={styles.secButton}>
          <SecButton
            text="Продолжить без верификации"
            onPress={() => navigation.navigate(Screens.tabNavigator)}
          />
          <PlHolderText>К стоимости аренды будет добавлен залог</PlHolderText>
        </View>
      </View>
    </ScreenView>
  );
};

export default CheckFailedScreen;

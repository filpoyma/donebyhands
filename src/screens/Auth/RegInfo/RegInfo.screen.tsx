import React from 'react';
import { View } from 'react-native';

import { HeaderText } from '~components/shared/text';
import { ScreenView } from '~components/view';
import { ScreensParams } from '~constants/navigators.constants';
import SecButton from '~components/shared/buttons/Sec.button';
import PlHolderText from '~components/shared/text/PlHolder.text';
import styles from './Reginfo.styles';
import { RegInfoScreenProps } from '~typedefs/screens/RegInfo';
import UserService from '~services/User.service';
import AuthService from '~services/Auth.service';

const RegInfoScreen: React.FC<RegInfoScreenProps> = ({ route }) => {
  const { title, subtitle } = ScreensParams[route.name];

  React.useEffect(() => {
    const id = setInterval(() => {
      (async () => {
        try {
          const user = await UserService.getUser();
          if (user?.docs_status === 'granted') {
            clearInterval(id);
            appLoginHandler();
          }
        } catch (e: any) {
          clearInterval(id);
          console.error('Error get user', e?.message);
        }
      })();
    }, 10 * 60 * 1000);

    return () => id && clearInterval(id);
  }, []);

  const appLoginHandler = () => {
    AuthService.login().catch(e => console.error('Registration complete error:', e?.message));
  };

  return (
    <ScreenView fullArea>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.title}>
            <HeaderText>{title}</HeaderText>
            <HeaderText size={'h4'} style={styles.subtitle}>
              {subtitle}
            </HeaderText>
          </View>
        </View>
        <View style={styles.secButton}>
          <SecButton text="Продолжить без верификации" onPress={appLoginHandler} />
          <PlHolderText>К стоимости аренды будет добавлен залог</PlHolderText>
        </View>
      </View>
    </ScreenView>
  );
};

export default RegInfoScreen;

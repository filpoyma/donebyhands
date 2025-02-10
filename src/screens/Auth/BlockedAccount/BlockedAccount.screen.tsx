import React from 'react';
import { View, Linking } from 'react-native';

import { HeaderText } from '~components/shared/text';
import { ScreenView } from '~components/view';
import SecButton from '~components/shared/buttons/Sec.button';
import styles from './BlockedAccount.styles';
import { BlockedAccountScreenProps } from '~typedefs/screens/BlockedAccount';
import { useSelector } from 'react-redux';
import { selectSupportLink, selectUser } from '~redux/selectors';

const BlockedAccountScreen: React.FC<BlockedAccountScreenProps> = () => {
  // const supportPhNumber = useSelector(selectSupportPhNumber);
  const user = useSelector(selectUser);
  const supportLink = useSelector(selectSupportLink);
  return (
    <ScreenView fullArea style={styles.container}>
      <View style={styles.title}>
        <View>
          <HeaderText>Ваш аккаунт</HeaderText>
          <HeaderText>заблокирован</HeaderText>
        </View>
        <HeaderText size={'h4'} style={styles.subtitle}>
          {user?.blocking_reason || ''}
        </HeaderText>
      </View>
      <SecButton
        // onPress={() => {
        //   Linking.openURL(isIOS ? `tel://${supportPhNumber}` : `tel:${supportPhNumber}`).catch(
        //     err => {
        //       console.warn('Error from call to us ', err);
        //     },
        //   );
        // }}
        onPress={() => {
          Linking.openURL(supportLink).catch(err => {
            console.warn('Error from support ', err);
          });
        }}
        text={'Обратиться в поддержку'}
      />
    </ScreenView>
  );
};

export default BlockedAccountScreen;

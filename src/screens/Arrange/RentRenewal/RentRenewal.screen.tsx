import React from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';

import { ScreenView } from '~components/view';
import { HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';
import WideBadgeSm from '~components/widgets/WideBadgeSm';
import HourGlassIcon from '~assets/icons/hourglass.svg';
import AddresCard from '~components/widgets/AddresCard';
import SecButton from '~components/shared/buttons/Sec.button';
import { Screens } from '~constants/navigators.constants';
import styles from './RentRenewal.styles';
import { useSelector } from 'react-redux';
import { selectPostomats } from '~redux/selectors';
import { RentRenewalScreenProps } from '~typedefs/screens/RentRenewal';

const RentRenewalScreen: React.FC<RentRenewalScreenProps> = ({ navigation, route }) => {
  const { ended, postomatId } = route.params;
  const postomats = useSelector(selectPostomats);
  const postomat = React.useMemo(
    () => postomats.find(postomat => `${postomat.id}` === `${postomatId}`),
    [postomats, postomatId],
  );

  return (
    <ScreenView fullArea screenPaddings={true}>
      <View style={styles.container}>
        <HeaderText>Аренда продлена</HeaderText>
        <PlHolderText>Инструмент доступен</PlHolderText>
        <WideBadgeSm Icon={HourGlassIcon} text={dayjs(ended).format('[до] D MMMM[,] HH:mm')} />
        <View style={styles.addressCard}>
          <AddresCard title={postomat?.name} subtitle={postomat?.address} />
        </View>
      </View>
      <View style={styles.buttons}>
        <SecButton
          text={'На главную'}
          onPress={() => {
            navigation.navigate(Screens.tabNavigator, { screen: Screens.mainPage });
          }}
        />
      </View>
    </ScreenView>
  );
};

export default RentRenewalScreen;

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
import styles from './RentPreStarted.styles';

import { useDispatch, useSelector } from 'react-redux';
import { selectPostomats } from '~redux/selectors';
import { BaseButton } from '~components/shared/buttons';
import { RentPreStartedScreenProps } from '~typedefs/screens/RentPreStarted';
import RentService from '~services/Rent.service';
import { orderActions } from '~redux/reducers/order';
import OrderService from '~services/Order.service';

const RentPreStartedScreen: React.FC<RentPreStartedScreenProps> = ({ navigation, route }) => {
  const postomats = useSelector(selectPostomats);

  const { pin, ended, orderId, postomatId } = route.params;
  const postomat = React.useMemo(
    () => postomats.find(postomat => `${postomat.id}` === `${postomatId}`),
    [postomats, postomatId],
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    RentService.getCurrentRentedTools().catch(err => {
      console.error(err);
    });
    RentService.setRentedTools().catch(err => {
      console.error(err);
    });
    dispatch(orderActions.clearCurrentOrder(OrderService.getNearestParcelLockerId()));
  }, []);

  return (
    <ScreenView fullArea screenPaddings={true}>
      <View style={styles.container}>
        <HeaderText>Аренда начата</HeaderText>
        <PlHolderText>Инструмент доступен</PlHolderText>
        <WideBadgeSm Icon={HourGlassIcon} text={dayjs(ended).format('[до] D MMMM[,] HH:mm')} />
        {postomat ? (
          <View style={styles.addressCard}>
            <AddresCard title={postomat?.name} subtitle={postomat?.address} />
          </View>
        ) : null}
      </View>
      <View style={styles.buttons}>
        <BaseButton
          text={'Открыть ячейку'}
          onPress={() => {
            navigation.navigate(Screens.rentStarted, { pin, ended, orderId, postomatId });
          }}
        />
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

export default RentPreStartedScreen;

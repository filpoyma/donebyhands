import React from 'react';
import { Keyboard, View } from 'react-native';
import { CodeField } from 'react-native-confirmation-code-field';

import { ScreenView } from '~components/view';
import { AppText, HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';
import AddresCard from '~components/widgets/AddresCard';
import SecButton from '~components/shared/buttons/Sec.button';
import { Screens } from '~constants/navigators.constants';
import styles from './RentEndPin.styles';
import { RentStartedScreenProps } from '~typedefs/screens/RentEndPin';
import { useSelector } from 'react-redux';
import { selectPostomats } from '~redux/selectors';
import { errorHandlerSentry } from '~utils/errorHandlers.utils';
import ParcelLockerService from '~services/ParcelLocker.service';
import InAppMessageService from '~services/InAppMessage.service';
import orderService from '~services/Order.service';

const RentEndPinScreen: React.FC<RentStartedScreenProps> = ({ navigation, route }) => {
  const { orderId, postomatId, pin } = route.params;
  const postomats = useSelector(selectPostomats);
  const postomat = React.useMemo(
    () => postomats.find(postomat => `${postomat.id}` === `${postomatId}`),
    [postomats, postomatId],
  );

  const onSubmit = React.useCallback(async () => {
    try {
      const { isOpen, isCellWasOpenedAtEnd } = await ParcelLockerService.getCellStatus(orderId);
      if (isOpen) {
        navigation.navigate(Screens.cellNotClosed, {
          orderId,
          forwardScreen: Screens.rateUs,
        });
      } else if (isCellWasOpenedAtEnd) {
        const points = await orderService.endRental(orderId);
        navigation.navigate(Screens.rateUs, { points, orderId });
      } else {
        InAppMessageService.danger('Введите код на постамате.');
      }
    } catch (err: any) {
      errorHandlerSentry('End Rental error:', err);
    }
  }, [navigation, orderId]);

  return (
    <ScreenView fullArea screenPaddings={true}>
      <View style={styles.container}>
        <HeaderText>Завершение аренды</HeaderText>
        {/*<PlHolderText>Введите пин код для открытия ячейки</PlHolderText>*/}
        {/*<WideBadgeSm Icon={HourGlassIcon} text={dayjs(ended).format('[до] HH:mm D MMMM')} />*/}
        <View style={styles.addressCard}>
          <AddresCard title={postomat?.name} subtitle={postomat?.address} />
        </View>

        <View style={styles.otp}>
          <CodeField
            value={pin}
            cellCount={4}
            editable={false}
            rootStyle={styles.codeFiledRoot}
            onSubmitEditing={Keyboard.dismiss}
            renderCell={({ index, symbol }) => (
              <AppText key={index} style={styles.cell}>
                {symbol}
              </AppText>
            )}
          />
          <PlHolderText>Введите пинкод на постамате</PlHolderText>
        </View>
      </View>
      <View style={styles.buttons}>
        <SecButton text={'Далее'} onPress={onSubmit} />
      </View>
    </ScreenView>
  );
};

export default RentEndPinScreen;

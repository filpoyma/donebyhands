import React from 'react';
import { Keyboard, View } from 'react-native';
import { CodeField } from 'react-native-confirmation-code-field';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import { ScreenView } from '~components/view';
import { AppText, HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';
import WideBadgeSm from '~components/widgets/WideBadgeSm';
import HourGlassIcon from '~assets/icons/hourglass.svg';
import AddresCard from '~components/widgets/AddresCard';
import SecButton from '~components/shared/buttons/Sec.button';
import { Screens } from '~constants/navigators.constants';
import styles from './RentStarted.styles';
import { RentStartedScreenProps } from '~typedefs/screens/RentStarted';
import { selectPostomats } from '~redux/selectors';
import ParcelLockerService from '~services/ParcelLocker.service';
import InAppMessageService from '~services/InAppMessage.service';
import arrangeRentalDataStorageItem from '~storage/arrangeRentalData.storageItem';

const RentStartedScreen: React.FC<RentStartedScreenProps> = ({ navigation, route }) => {
  const { pin, ended, orderId, postomatId } = route.params;
  const [isLoading, setIsLoading] = React.useState(false);
  const postomats = useSelector(selectPostomats);
  const postomat = React.useMemo(
    () => postomats.find(postomat => `${postomat.id}` === `${postomatId}`),
    [postomats, postomatId],
  );

  React.useEffect(() => {
    arrangeRentalDataStorageItem
      .set({ orderId, postomatId, fromScreen: Screens.rentStarted })
      .catch(console.error);
    //dispatch(orderActions.clearCurrentOrder());
  }, []);

  const onSubmit = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const { isOpen, isCellWasOpenedAtStart } = await ParcelLockerService.getCellStatus(orderId);
      if (isOpen || isCellWasOpenedAtStart) {
        navigation.navigate(Screens.takingToolsPictures, {
          orderId: orderId,
          photoType: 'start',
          postomatId: postomatId,
        });
      } else {
        InAppMessageService.danger('Введите код на постамате.');
      }
    } catch (err: any) {
      console.error('Check parcellocker status error', err?.message);
      InAppMessageService.danger('Ошибка при проверке статуса постамата.');
    } finally {
      setIsLoading(false);
    }
  }, [navigation, orderId, postomatId]);

  return (
    <ScreenView fullArea screenPaddings={true}>
      <View style={styles.container}>
        <HeaderText>Аренда начата</HeaderText>
        <PlHolderText>Инструмент доступен</PlHolderText>
        <WideBadgeSm Icon={HourGlassIcon} text={dayjs(ended).format('[до] D MMMM[,] HH:mm')} />
        <View style={styles.addressCard}>
          <AddresCard title={postomat?.name} subtitle={postomat?.address} />
        </View>
        {!!pin && (
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
        )}
      </View>
      <View style={styles.buttons}>
        <SecButton text={'Проверьте инструмент'} onPressIn={onSubmit} disabled={isLoading} />
      </View>
    </ScreenView>
  );
};

export default RentStartedScreen;

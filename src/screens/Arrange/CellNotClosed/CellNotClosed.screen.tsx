import React from 'react';
import { View } from 'react-native';

import { ScreenView } from '~components/view';
import { HeaderText } from '~components/shared/text';
import SecButton from '~components/shared/buttons/Sec.button';
import { Screens } from '~constants/navigators.constants';

import styles from './CellNotClosed.styles';
import PlHolderText from '~components/shared/text/PlHolder.text';
import { CellNotClosedScreenProps } from '~typedefs/screens/CellNotClosed';
import orderService from '~services/Order.service';
import { errorHandler } from '~utils/errorHandlers.utils';
import ParcelLockerService from '~services/ParcelLocker.service';
import InAppMessageService from '~services/InAppMessage.service';
import arrangeRentalDataStorageItem from '~storage/arrangeRentalData.storageItem';

const CellNotClosedScreen: React.FC<CellNotClosedScreenProps> = ({ navigation, route }) => {
  const { orderId, forwardScreen } = route.params;
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmitCellClose = async () => {
    try {
      setIsLoading(true);
      const { isOpen } = await ParcelLockerService.getCellStatus(orderId);
      if (isOpen) {
        setIsLoading(false);
        return InAppMessageService.danger('Ячейка не закрыта');
      }
      if (forwardScreen === Screens.rentStartedFromCell) {
        arrangeRentalDataStorageItem.remove().catch(err => {
          console.error(err);
        });
        navigation.navigate(forwardScreen, { orderId });
      }
      if (forwardScreen === Screens.rateUs) {
        //cell checking , get points and complete rental
        const points = await orderService.endRental(orderId);
        navigation.navigate(forwardScreen, { points, orderId });
      }
    } catch (err: any) {
      if (err?.response?.status === 400) {
        if (err?.message?.message === 'Ячейка не закрыта') {
          navigation.popToTop();
          return navigation.navigate(Screens.cellNotClosed, { orderId, forwardScreen });
        }
      } else {
        errorHandler('onClose Cell error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScreenView fullArea screenPaddings={false}>
      <View style={styles.container}>
        <HeaderText>Ячейка не закрыта</HeaderText>
        <View style={{ width: 180 }}>
          <PlHolderText>Проверьте ячейку, наша система показывает, что она не закрыта</PlHolderText>
        </View>
      </View>
      <View style={styles.buttons}>
        <SecButton text={'Я закрыл ячейку'} onPress={onSubmitCellClose} disabled={isLoading} />
      </View>
    </ScreenView>
  );
};

export default CellNotClosedScreen;

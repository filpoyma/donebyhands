import React from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';

import { ScreenView } from '~components/view';
import { HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';
import SecButton from '~components/shared/buttons/Sec.button';
import ItemToolCardWideCurrentRent from '~components/widgets/Cards/ItemToolCardWideCurrentRent';
import styles from './PayForTool.styles';

import AddresCard from '~components/widgets/AddresCard';
import { PayForToolScreenProps } from '~typedefs/screens/PayForTool';
import { renderLoading } from '~components/shared/Loaders';
import WebViewPayment from '~components/widgets/Payments/WebViewPayment';
import PayForToolsLogic from './PayForTools.logic';

const PayForToolScreen: React.FC<PayForToolScreenProps> = ({ navigation, route }) => {
  const {
    isLoading,
    paymentUrlState,
    catchRedirectedUrl,
    rentedTool,
    postomat,
    onPaymentSubmit,
    onPaymentCancelScreen,
  } = PayForToolsLogic({ navigation, route });

  if (paymentUrlState)
    return (
      <ScreenView fullArea screenPaddings={false}>
        <WebViewPayment paymentUrl={paymentUrlState} catchRedirectedUrl={catchRedirectedUrl} />
      </ScreenView>
    );

  return (
    <ScreenView fullArea screenPaddings={false}>
      <View style={styles.container}>
        <HeaderText>Инструмент забронирован</HeaderText>
        <View style={{ width: 330 }}>
          <PlHolderText style={{ textAlign: 'center' }}>
            Оплатите инструмент до конца действия брони. Если вы сделали заказ случайно и хотите
            выбрать другой инструмент, вы можете отменить его.
          </PlHolderText>
        </View>
        {rentedTool ? (
          <View style={styles.itemCard}>
            <ItemToolCardWideCurrentRent
              imageUri={rentedTool?.tool?.images[0].image}
              title={rentedTool?.tool?.name}
              badgeText={dayjs(rentedTool?.no_paid_ended).format('[бронь до] D MMMM[,] HH:mm')}
            />
          </View>
        ) : null}
        {postomat ? (
          <View style={styles.addressCard}>
            <AddresCard title={postomat?.name} subtitle={postomat?.address} />
          </View>
        ) : null}
      </View>
      <View style={styles.buttons}>
        <SecButton text={'Оплатить'} onPress={onPaymentSubmit} disabled={isLoading} />
        <SecButton text={'Отменить заказ'} onPress={onPaymentCancelScreen} disabled={isLoading} />
      </View>

      {renderLoading(isLoading)}
    </ScreenView>
  );
};

export default PayForToolScreen;

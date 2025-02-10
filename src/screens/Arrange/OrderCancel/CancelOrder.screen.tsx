import React from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';

import { ScreenView } from '~components/view';
import { HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';
import SecButton from '~components/shared/buttons/Sec.button';
import ItemToolCardWideCurrentRent from '~components/widgets/Cards/ItemToolCardWideCurrentRent';
import styles from './CancelOrder.styles';

import AddresCard from '~components/widgets/AddresCard';
import { renderLoading } from '~components/shared/Loaders';
import CancelOrderLogic from './CancelOrder.logic';
import { OrderCancelScreenProps } from '~typedefs/screens/OrderCancel';

const CancelOrderScreen: React.FC<OrderCancelScreenProps> = ({ navigation, route }) => {
  const { isLoading, rentedTool, postomat, onOrderCancel } = CancelOrderLogic({
    navigation,
    route,
  });

  return (
    <ScreenView fullArea screenPaddings={false}>
      <View style={styles.container}>
        <HeaderText>Отмена заказа</HeaderText>
        <View style={{ width: 190 }}>
          <PlHolderText>Вы подтверждаете отмену данного заказа?</PlHolderText>
        </View>
        {rentedTool ? (
          <View style={styles.itemCard}>
            <ItemToolCardWideCurrentRent
              imageUri={rentedTool?.tool?.images[0].image}
              title={rentedTool?.tool?.name}
              badgeText={dayjs(rentedTool?.ended).format('D MMMM[,] HH:mm')}
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
        <SecButton text={'Да'} onPress={onOrderCancel} disabled={isLoading} />
        <SecButton text={'Нет'} onPress={navigation.goBack} disabled={isLoading} />
      </View>

      {renderLoading(isLoading)}
    </ScreenView>
  );
};

export default CancelOrderScreen;

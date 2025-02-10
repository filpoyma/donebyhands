import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '~constants/colors.constants';
import { AppText, HeaderText } from '~components/shared/text';
import RowView from '~components/view/Row.view';
// import InfoIcon from '~assets/icons/info.svg';
//import InfoRedIcon from '~assets/icons/infoRed.svg';
import DashedLine from '~components/shared/DashedLine';
import { capitalizeFirstLetter } from '~utils/helpers.utils';

const InTotal = ({
  tariffName = 'По тарифу',
  tariffPrice = 0,
  fee = 0,
  promo = 0,
  overdue = 0,
  points = 0,
  totalPrice = 0,
  extendRentCost = 0,
}: {
  fee?: number;
  overdue?: number;
  tariffName?: string;
  tariffPrice?: number;
  promo?: number;
  points?: number;
  totalPrice?: number;
  extendRentCost?: number;
}) => {
  return (
    <View style={styles.container}>
      <HeaderText style={styles.title} size="h3" centered={false}>
        Итого стоимость
      </HeaderText>
      <View style={styles.subtitle}>
        <RowView style={styles.prices}>
          <AppText style={styles.priceTitle}>{capitalizeFirstLetter(tariffName)}</AppText>
          <AppText style={styles.price}>{tariffPrice} руб</AppText>
        </RowView>
        {/*<RowView style={styles.prices}>*/}
        {/*  <AppText style={styles.priceTitle}>{tariff?.name}</AppText>*/}
        {/*  <AppText style={styles.price}>{totalPrice.price * 12} руб</AppText>*/}
        {/*</RowView>*/}
        {extendRentCost > 0 && (
          <RowView style={styles.prices}>
            <RowView alignedCenter>
              <AppText style={styles.priceTitle}>Продления аренды</AppText>
              {/*<InfoRedIcon />*/}
            </RowView>
            <AppText style={styles.price}>{extendRentCost} руб</AppText>
          </RowView>
        )}
        {overdue > 0 && (
          <RowView style={styles.prices}>
            <RowView alignedCenter>
              <AppText style={[styles.priceTitle, { color: Colors.red }]}>Просрочено</AppText>
              {/*<InfoRedIcon />*/}
            </RowView>
            <AppText style={[styles.price, { color: Colors.red }]}>{overdue} руб</AppText>
          </RowView>
        )}
        {fee > 0 && (
          <RowView style={styles.prices}>
            <RowView alignedCenter>
              <AppText style={styles.priceTitle}>Залог:</AppText>
              {/*<InfoIcon />*/}
            </RowView>
            <AppText style={styles.price}>{fee} руб</AppText>
          </RowView>
        )}
        {promo > 0 && (
          <RowView style={styles.prices}>
            <RowView alignedCenter>
              <AppText style={styles.priceTitle}>Скидка по промокоду:</AppText>
            </RowView>
            <AppText style={styles.price}>{promo * -1} руб</AppText>
          </RowView>
        )}

        {points > 0 && (
          <RowView style={styles.prices}>
            <RowView alignedCenter>
              <AppText style={styles.priceTitle}>Скидка по баллам:</AppText>
            </RowView>
            <AppText style={styles.price}>{points * -1} руб</AppText>
          </RowView>
        )}

        <DashedLine dashLength={10} dashThickness={1} dashGap={5} dashColor={Colors.grey} />
        <RowView style={styles.prices}>
          <AppText style={styles.priceTitle}>Итого:</AppText>
          <AppText style={styles.price}>{totalPrice < 0 ? 0 : totalPrice} руб</AppText>
        </RowView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.grey,
    gap: 8,
  },
  prices: {
    height: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceTitle: {
    marginRight: 5,
    color: Colors.weak,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  price: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    lineHeight: 21,
  },
  separator: {
    height: 1,
    borderBottomWidth: 1,
    // borderStyle: 'dotted',
    borderColor: Colors.grey,
    marginVertical: 8,
  },
});

export default React.memo(InTotal);

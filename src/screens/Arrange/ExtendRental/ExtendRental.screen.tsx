import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';

import { ScreenView } from '~components/view';
import { AppText } from '~components/shared/text';
import { BackButtonHeader } from '~components/widgets/headers';
import ItemToolCardWideCatalog from '~components/widgets/Cards/ItemToolCardWideArrangeRent';
import InTotal from '~components/widgets/InTotal';
import { BaseButton } from '~components/shared/buttons';
import { placeholderUri } from '~constants/api.constants';
import PostomatAddressCard from '~components/widgets/PostomatAddressCard';
import styles from './ExtendedRental.styles';
import { ExtendRentalScreenProps } from '~typedefs/screens/ExtendRental';
// import HorizontalStepSlider from '~components/shared/input/Slider/HorisontalStep.slider';
// import InfoIcon from '~assets/icons/infoCircleGrey.svg';
// import RowView from '~components/view/Row.view';
import { renderLoading } from '~components/shared/Loaders';
import WebViewPayment from '~components/widgets/Payments/WebViewPayment';
import ExtendRentalLogic from './ExtendRental.logic';
import { GapH24, GapH7 } from '~components/shared/GapH';
import TimeGapCard from '~components/widgets/TimeGapCard';
import TariffsLoader from '~components/shared/Loaders/TariffsLoader';

const ExtendRentalScreen: React.FC<ExtendRentalScreenProps> = ({ navigation, route }) => {
  const {
    isLoading,
    isTariffsLoading,
    paymentUrl,
    values,
    totalPrice,
    catchRedirectedUrl,
    extendOrderItem,
    postomat,
    extendOrder,
    onSubmitExtendOrder,
    tariffs,
    setExtendedTariff,
    selectedTariff,
    // onChangeHandler,
    // userPoints,
    // tariffPrice,
    // promoDiscountRub,
  } = ExtendRentalLogic({ navigation, route });

  if (paymentUrl)
    return (
      <ScreenView fullArea screenPaddings={false}>
        <WebViewPayment paymentUrl={paymentUrl} catchRedirectedUrl={catchRedirectedUrl} />
      </ScreenView>
    );

  return (
    <ScreenView fullArea screenPaddings={false}>
      <BackButtonHeader paddings title="Продление аренды" onBackButtonPress={navigation.goBack} />
      <ScrollView>
        <View style={styles.container}>
          <ItemToolCardWideCatalog
            imageUri={extendOrderItem?.tool.images[0].image || placeholderUri}
            title={extendOrderItem?.tool?.name}
          />
          <View style={{ marginTop: 10 }}>
            <PostomatAddressCard
              title={postomat?.name}
              subtitle={postomat?.address}
              distance={extendOrder.distanceToPostomat}
            />
          </View>
        </View>

        <View style={styles.container}>
          <AppText style={[styles.label, { marginTop: 18 }]}>
            Выберите тариф продления аренды
          </AppText>
        </View>
        {isTariffsLoading ? (
          <View style={styles.loader}>
            <TariffsLoader />
          </View>
        ) : (
          <FlatList
            data={tariffs}
            horizontal={true}
            scrollEnabled={tariffs?.length !== 0}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={GapH24}
            ListFooterComponent={GapH24}
            ItemSeparatorComponent={GapH7}
            keyExtractor={item => item?.id}
            renderItem={({ item }) => (
              <TimeGapCard
                title={item.name}
                id={item?.id}
                selected={values.tariffId === item?.id}
                status={'доступен'}
                onPress={setExtendedTariff}
              />
            )}
          />
        )}
        <View style={styles.container}>
          {/*<AppText style={[styles.label, { marginTop: 8 }]}>Списать баллы</AppText>*/}
          {/*<HorizontalStepSlider*/}
          {/*  name="points"*/}
          {/*  onSlidingComplete={onChangeHandler}*/}
          {/*  maxPoints={Math.min(userPoints, tariffPrice / 2)}*/}
          {/*/>*/}
          {/*<RowView alignedCenter>*/}
          {/*  <InfoIcon />*/}
          {/*  <AppText style={styles.pointsInfo}>Баллами можно оплатить не более 50% тарифа</AppText>*/}
          {/*</RowView>*/}
          {/*<AppText style={styles.label}>Промокод</AppText>*/}
          {/*<View style={{ marginTop: 10 }}>*/}
          {/*  <TextInputLabeled*/}
          {/*    name="promoCode"*/}
          {/*    value={values.promoCode}*/}
          {/*    placeholder="Введите промокод"*/}
          {/*    onChangeTextNamed={onChangeHandler}*/}
          {/*  />*/}
          {/*</View>*/}
          <InTotal
            tariffName={selectedTariff?.name}
            tariffPrice={selectedTariff?.price}
            totalPrice={totalPrice}
            // promo={promoDiscountRub}
          />
          <BaseButton style={styles.button} text="Продлить аренду" onPress={onSubmitExtendOrder} />
        </View>
      </ScrollView>
      {renderLoading(isLoading)}
    </ScreenView>
  );
};

export default ExtendRentalScreen;

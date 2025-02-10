import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ScreenView } from '~components/view';
import { AppText } from '~components/shared/text';
import { BackButtonHeader } from '~components/widgets/headers';
import ItemToolCardWideCatalog from '~components/widgets/Cards/ItemToolCardWideArrangeRent';
import TextInputLabeled from '~components/shared/input/TextInputLabeled.component';
import TimeGapCard from '~components/widgets/TimeGapCard';
import { GapH24, GapH7 } from '~components/shared/GapH';
import InTotal from '~components/widgets/InTotal';
import { BaseButton } from '~components/shared/buttons';
import { placeholderUri } from '~constants/api.constants';
import PostomatAddressCard from '~components/widgets/PostomatAddressCard';
import { ArrangeRentalPreviewScreenProps } from '~typedefs/screens/ArrangeRental';
import InfoIcon from '~assets/icons/infoCircleGrey.svg';
import RowView from '~components/view/Row.view';
import { selectRentRules } from '~redux/selectors';
import ModalWithFade from '~components/modal/ModalWithFade';
import HorizontalSlider from '~components/shared/input/Slider/Horisontal.slider';
import RentRulesBage from '~components/modal/RentRulesBage';
import ArrangeRentalLogic from './ArrangeRentalLogicPreview';
import styles from './ArrangeRentalPreview.styles';
import SecButton from '~components/shared/buttons/Sec.button';
import TariffsLoader from '~components/shared/Loaders/TariffsLoader';

const ArrangeRentalPreviewScreen: React.FC<ArrangeRentalPreviewScreenProps> = ({ navigation }) => {
  const rentRules = useSelector(selectRentRules);
  const {
    values,
    tool,
    fee,
    totalPrice,
    promoDiscountRub,
    maximumPoints,
    postomat,
    order,
    tariff,
    tariffs,
    onPressTimeGap,
    onSubmitPromo,
    onSubmitOrder,
    onChangeHandler,
    isModalOpen,
    isTariffsAvailable,
    hideModal,
    openDocumentsScreen,
    isUserDocsGranted,
  } = ArrangeRentalLogic(navigation);

  return (
    <ScreenView screenPaddings={false}>
      <BackButtonHeader paddings title="Оформление аренды" onBackButtonPress={navigation.goBack} />
      <ScrollView>
        <View style={styles.container}>
          <ItemToolCardWideCatalog
            imageUri={tool?.images[0]?.image || placeholderUri}
            title={tool?.name}
          />
          <AppText style={styles.label}>Выберите постамат</AppText>
          <View style={{ marginTop: 10 }}>
            <PostomatAddressCard
              title={postomat?.name}
              subtitle={postomat?.address}
              distance={order.distanceToPostomat}
              onPress={() => {
                // navigation.navigate(Screens.mapFullScreen, { toolId: tool?.id });
              }}
            />
          </View>
          <AppText style={styles.label}>Тип аренды</AppText>
        </View>
        <View>
          {isTariffsAvailable ? (
            <FlatList
              data={tariffs}
              horizontal={true}
              scrollEnabled={isTariffsAvailable}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={GapH24}
              ListFooterComponent={GapH24}
              ItemSeparatorComponent={GapH7}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TimeGapCard
                  title={item.name}
                  id={item?.id}
                  // startTimestamp={dropSeconds(item.started_at)}
                  // endTimestamp={dropSeconds(item.ended_at)}
                  status="Доступен"
                  selected={order.tariffId === item?.id}
                  onPress={onPressTimeGap}
                />
              )}
            />
          ) : (
            <View style={styles.loader}>
              <TariffsLoader />
            </View>
          )}
        </View>
        <View style={styles.container}>
          <AppText style={[styles.label, { marginTop: 8 }]}>Списать баллы</AppText>
          <HorizontalSlider
            name="points"
            onSlidingComplete={onChangeHandler}
            maximumValue={maximumPoints}
          />
          <RowView alignedCenter>
            <InfoIcon />
            <AppText style={styles.pointsInfo}>Баллами можно оплатить не более 50% тарифа</AppText>
          </RowView>
          <AppText style={styles.label}>Промокод</AppText>
          <View style={{ marginTop: 10 }}>
            <TextInputLabeled
              name="promocode"
              value={values.promocode}
              placeholder="Введите промокод"
              onChangeTextNamed={onChangeHandler}
              onSubmitEditing={onSubmitPromo}
            />
          </View>
          <InTotal
            tariffName={tariff?.name}
            tariffPrice={tariff?.price}
            fee={fee}
            promo={promoDiscountRub}
            points={values.points}
            totalPrice={totalPrice}
          />
          <View style={styles.buttons}>
            {!isUserDocsGranted && (
              <SecButton
                text="Арендовать без залога"
                onPress={openDocumentsScreen}
                disabled={!isTariffsAvailable}
              />
            )}
            <BaseButton
              text="Оформить заказ"
              onPress={onSubmitOrder}
              disabled={!isTariffsAvailable}
            />
          </View>
        </View>
      </ScrollView>
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        <RentRulesBage
          titleText={'Правила аренды'}
          contentText={rentRules}
          buttonText="Прочитал и согласен"
          hideModal={onSubmitOrder}
          noSwipe={true}
        />
      </ModalWithFade>
    </ScreenView>
  );
};

export default ArrangeRentalPreviewScreen;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import { BaseButton, IconButton } from '~components/shared/buttons';
import RowView from '~components/view/Row.view';
import TrashIcon from '~assets/icons/trash2.svg';
import PayoneerIcon from '~assets/icons/payoneer.svg';
import PlHolderText from '~components/shared/text/PlHolder.text';
import { MainStackParamList, Screens } from '~constants/navigators.constants';
import { AppText, HeaderText } from '~components/shared/text';
import PaymentService from '~services/Payment.service';
import WebViewPayment from '~components/widgets/Payments/WebViewPayment';
import { renderLoading } from '~components/shared/Loaders';
import { selectUserBindingsCards } from '~redux/selectors';
import { authActions } from '~redux/reducers/auth';
import { getCardType } from '~utils/helpers.utils';
import { errorHandler } from '~utils/errorHandlers.utils';

type PaymentsInfoScreenProps = StackScreenProps<MainStackParamList, Screens.paymentsInfo>;

const PaymentsInfoScreen: React.FC<PaymentsInfoScreenProps> = ({ navigation }) => {
  const payCards = useSelector(selectUserBindingsCards) || [];
  const [bindUrlState, setbindUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();

  const bindCardId = React.useRef<null | string>(null);

  const onAddNewCard = async () => {
    try {
      setIsLoading(true);
      const data = await PaymentService.getBindInfo();
      bindCardId.current = `${data.id}`;
      setbindUrl(data.form_url);
    } catch (err: any) {
      errorHandler('onAddNewCard error', err);
      setIsLoading(false);
    }
  };

  const catchRedirectedUrl = async ({ url }: { url: string }) => {
    if (/payment\/payment_status/i.test(url)) {
      setIsLoading(false);
      return setbindUrl('');
    }
    //const params = getQueryParams(url);
    if (!/success/i.test(url) || !bindCardId.current) return;
    setbindUrl('');
    setIsLoading(true);

    try {
      await PaymentService.bindStatus(bindCardId.current);
      const bindings = await PaymentService.getBindings();
      dispatch(authActions.updateUser({ bindings }));
    } catch (err: any) {
      let subtitle = 'Ошибка привязки карты';
      if (err?.response?.status === 404) subtitle = 'Связка не существует';
      if (err?.response?.status === 400) subtitle = 'Карта отклонена';
      if (err?.response?.status === 500) subtitle = 'Ошибка данных';
      navigation.navigate(Screens.rentError, {
        title: 'Карта не привязана',
        subtitle: subtitle,
      });
      console.error('onOpenURL error:', err?.message);
    } finally {
      setIsLoading(false);
      setbindUrl('');
    }
  };

  const delCardHandler = async (id: number) => {
    try {
      setIsLoading(true);
      const bindings = payCards?.filter(card => card.id !== id);
      await PaymentService.unBindCard(id);
      dispatch(authActions.updateUser({ bindings }));
    } catch (err: any) {
      errorHandler('error to delete card:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (bindUrlState)
    return (
      <ScreenView fullArea screenPaddings={false}>
        <WebViewPayment paymentUrl={bindUrlState} catchRedirectedUrl={catchRedirectedUrl} />
      </ScreenView>
    );

  return (
    <ScreenView fullArea screenPaddings>
      <BackButtonHeader onBackButtonPress={navigation.goBack} title="Платежная информация" />
      <View style={styles.container}>
        {payCards?.length ? (
          <View style={styles.cards}>
            {payCards.map(card => {
              return (
                <RowView key={card?.id} style={styles.card}>
                  <RowView style={styles.cardText}>
                    <PayoneerIcon />
                    <AppText style={styles.name}>{getCardType(card?.masked_pan)}</AppText>
                    <AppText style={styles.number}>{card?.masked_pan}</AppText>
                  </RowView>
                  <IconButton
                    Icon={TrashIcon}
                    size={16}
                    onPress={
                      isLoading
                        ? undefined
                        : () => {
                            delCardHandler(card.id).catch(err => {
                              console.error(err);
                            });
                          }
                    }
                  />
                </RowView>
              );
            })}
          </View>
        ) : (
          <View style={styles.title}>
            <HeaderText>Способы оплаты</HeaderText>
            <PlHolderText>Здесь будут храниться сохраненные карты для быстрой оплаты</PlHolderText>
          </View>
        )}
        <BaseButton
          style={{ marginTop: 'auto' }}
          text="Добавить новую карту"
          onPress={onAddNewCard}
          disabled={isLoading}
          //navigation.navigate(Screens.addPayments);
        />
      </View>
      {renderLoading(isLoading)}
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  title: {
    gap: 8,
    paddingHorizontal: '11%',
    flex: 1,
    justifyContent: 'center',
  },
  cards: {
    gap: 18,
  },
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    alignItems: 'center',
    gap: 9,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 21,
  },
  number: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 21,
  },
});

export default PaymentsInfoScreen;

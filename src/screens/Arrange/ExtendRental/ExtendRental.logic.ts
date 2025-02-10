import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentRentedTools,
  selectExtendOrder,
  selectExtendsTariffs,
  selectPostomats,
  selectPromocodes,
  selectUserBindingsCards,
  selectUserPoints,
} from '~redux/selectors';
import { orderActions } from '~redux/reducers/order';
import InAppMessageService from '~services/InAppMessage.service';
import { appActions } from '~redux/reducers/app';
import OrderService from '~services/Order.service';
import { Screens, ScreensParams } from '~constants/navigators.constants';
import { getErrorMessage, serverErrorFieldsNames } from '~utils/errorHandlers.utils';
import { pollingcheckOrderStatus } from '~utils/component.async.utils';
import SentryService from '~services/Sentry.service';
import RentService from '~services/Rent.service';

const ExtendRentalLogic = ({ navigation, route }: any) => {
  const { orderId, postomatId } = route.params;
  const [paymentUrl, setPaymentUrl] = React.useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTariffsLoading, setIsTariffsLoading] = React.useState(true);
  const [values, setValues] = React.useState({
    geoPosition: '',
    points: 0,
    promoCode: '',
    tariffId: '',
  });

  const orderIdCallBack = React.useRef<null | string>(null);
  const contentId = React.useRef<null | number>(null);

  const currentRentedTools = useSelector(selectCurrentRentedTools);
  const postomats = useSelector(selectPostomats);
  const extendOrder = useSelector(selectExtendOrder);
  const promocodes = useSelector(selectPromocodes);
  const userPoints = useSelector(selectUserPoints) || 0;
  const bindingsCards = useSelector(selectUserBindingsCards) || [];

  const dispatch = useDispatch();

  const tariffs = useSelector(selectExtendsTariffs);
  const selectedTariff = tariffs?.find(tariff => tariff.id === extendOrder.tariffId);
  const promoDiscountPersent =
    promocodes?.find(promocode => promocode.name === values.promoCode)?.amount || '0';
  const extendOrderItem = currentRentedTools.find(item => item.id === orderId);
  const postomat = postomats.find(postomat => postomat.id === `${postomatId}`);
  const tariffPrice = tariffs.find(tariff => tariff.id === values.tariffId)?.price || 0;
  const promoDiscountRub = (parseInt(promoDiscountPersent, 10) * tariffPrice) / 100;
  const totalPrice = tariffPrice - promoDiscountRub - values.points;
  const linkCardId = bindingsCards[0]?.id;
  const isCardLinked = !!linkCardId;

  React.useEffect(() => {
    setIsTariffsLoading(true);
    RentService.getExtendsTariffs(orderId)
      .then(tariffs => {
        tariffs?.length && setExtendedTariff(tariffs[0]?.id);
        setIsTariffsLoading(false);
      })
      .catch(err => {
        console.error('getExtendsTariffs err:', err?.message);
        InAppMessageService.danger('Ошибка получения тарифов продления аренды.');
      });
    dispatch(orderActions.updateExtendOrder({ orderId, postomatId }));
    dispatch(orderActions.updateCurrentOrder({ postomatId })); // для отображения постомата в rentStartedScreen
  }, []);

  const onChangeHandler = React.useCallback((name: string, value: string | number) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  const onSubmitExtendOrder = React.useCallback(async () => {
    if (!values.tariffId) return InAppMessageService.danger('Укажите тариф продления аренды.');
    if (values.points && values.promoCode)
      return InAppMessageService.danger(
        'Промокод и баллы не могут быть использованы одновременно.',
      );
    setIsLoading(true);
    dispatch(appActions.setOverlayShown(true));
    try {
      const dataExtendOrder = await OrderService.extendOrder({
        orderId: extendOrderItem?.id || '',
        points: values.points,
        promocode: values.promoCode,
        linkCardId: linkCardId ? linkCardId : undefined,
        tariffId: values.tariffId,
      });
      orderIdCallBack.current = dataExtendOrder?.id;
      contentId.current = dataExtendOrder.content_type;
      dispatch(
        orderActions.updateExtendOrder({ orderId: dataExtendOrder?.id, tariffId: values.tariffId }),
      );
      if (isCardLinked) {
        navigation.navigate(Screens.rentRenewal, {
          ended: dataExtendOrder.ended,
          postomatId: postomatId,
        });
      } else {
        setPaymentUrl(dataExtendOrder?.form_url);
      }
    } catch (err) {
      const error = getErrorMessage(err);
      console.error('Failed to extend order:', error.message);
      if (serverErrorFieldsNames.includes(error.field))
        return InAppMessageService.danger(error.message);
      InAppMessageService.danger(error.message);
      SentryService.logError(`Failed to extend order: ${error?.message}`);
      if (isCardLinked) navigation.navigate(Screens.rentError, ScreensParams.paymentError);
    } finally {
      setIsLoading(false);
      dispatch(appActions.setOverlayShown(false));
    }
  }, [linkCardId, isCardLinked, values, extendOrderItem?.id, dispatch, postomatId, navigation]);

  const catchRedirectedUrl = async ({ url }: { url: string }) => {
    if (!/success/i.test(url) || orderIdCallBack.current === null) return;
    setPaymentUrl(undefined);
    await pollingcheckOrderStatus({
      orderId: orderIdCallBack,
      contentId,
      navigation,
      setIsLoading,
      requestType: 'extendRental',
      postomatId,
    });
  };

  const setExtendedTariff = React.useCallback(
    (tariffId: string) => {
      dispatch(orderActions.updateExtendOrder({ tariffId }));
      setValues(prev => ({ ...prev, tariffId }));
    },
    [dispatch],
  );

  return {
    isLoading,
    isTariffsLoading,
    paymentUrl,
    values,
    promoDiscountRub,
    totalPrice,
    catchRedirectedUrl,
    extendOrderItem,
    postomat,
    extendOrder,
    onChangeHandler,
    userPoints,
    tariffPrice,
    onSubmitExtendOrder,
    tariffs,
    selectedTariff,
    setExtendedTariff,
    setValues,
  };
};
export default ExtendRentalLogic;

import { appActions } from '~redux/reducers/app';
import OrderService from '~services/Order.service';
import { orderActions } from '~redux/reducers/order';
import { Screens, ScreensParams } from '~constants/navigators.constants';
import {
  errorHandlerSentry,
  getErrorMessage,
  serverErrorFieldsNames,
} from '~utils/errorHandlers.utils';
import InAppMessageService from '~services/InAppMessage.service';
import React from 'react';
import { pollingcheckOrderStatus } from '~utils/component.async.utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrder, selectPostomat, selectUser } from '~redux/selectors';
import { emailRegex } from '~constants/regex.constants';
import UserService from '~services/User.service';

const EmailAtRentalLogic = (navigation: any, route: any) => {
  const { points, promocode } = route.params;

  const dispatch = useDispatch();
  const order = useSelector(selectOrder);
  const postomat = useSelector(selectPostomat);
  const user = useSelector(selectUser);
  const orderId = React.useRef<null | string>(null);
  const contentId = React.useRef<null | number>(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentUrl, setPaymentUrl] = React.useState<string | undefined>(undefined);
  const [values, setValues] = React.useState({
    email: user?.email || '',
    emailError: '',
  });

  const linkCardId = user?.bindings ? user?.bindings[0]?.id : undefined;
  const isCardLinked = !!linkCardId;

  const onSubmitEmailHandler = async () => {
    if (!values.email) return;
    if (!emailRegex.test(values.email))
      return setValues(prevValues => ({ ...prevValues, emailError: 'Неправильный email' }));
    try {
      await UserService.updateUser({ email: values.email });
    } catch (err) {
      console.error('Error to update users email', err);
      setIsLoading(false);
    }
  };

  const onSubmitHandler = async () => {
    if (!user?.id) return;
    setIsLoading(true);
    await onSubmitEmailHandler();
    dispatch(appActions.setOverlayShown(true));
    try {
      const dataOrder = await OrderService.createOrder({
        ...order,
        points,
        promocode,
        linkCardId,
      });
      orderId.current = dataOrder.id;
      contentId.current = dataOrder.content_type;
      dispatch(orderActions.updateCurrentOrder({ id: dataOrder.id }));
      if (isCardLinked)
        //оплата была по привязанной карте в момент создания ордера
        navigation.navigate(Screens.rentPreStarted, {
          pin: dataOrder.pin,
          ended: dataOrder.ended,
          orderId: orderId.current,
          postomatId: order.postomatId,
        });
      // или открывает webView, если карта не привязана
      else setPaymentUrl(dataOrder?.form_url);
    } catch (err) {
      const error = getErrorMessage(err);
      if (serverErrorFieldsNames.includes(error.field))
        return InAppMessageService.danger(error.message);
      errorHandlerSentry('Failed to arrange order', err, 'no');
      if (isCardLinked) navigation.navigate(Screens.rentError, ScreensParams.paymentError);
    } finally {
      setIsLoading(false);
      dispatch(appActions.setOverlayShown(false));
    }
  };

  const catchRedirectedUrl = React.useCallback(
    async ({ url }: { url: string }) => {
      if (/payment\/payment_status/i.test(url)) {
        navigation.navigate(Screens.tabNavigator, { screen: Screens.mainPage });
      }
      if (/success/i.test(url) && orderId.current) {
        setPaymentUrl(undefined);
        await pollingcheckOrderStatus({
          orderId,
          contentId,
          navigation,
          setIsLoading,
          requestType: 'startRental',
          postomatId: postomat?.id || '',
        });
      }
    },
    [postomat?.id, navigation],
  );

  const onChangeHandler = React.useCallback((name: string, value: string) => {
    setValues(prevValues => ({ ...prevValues, [name]: value, emailError: '' }));
  }, []);

  return { paymentUrl, catchRedirectedUrl, values, onChangeHandler, isLoading, onSubmitHandler };
};

export default EmailAtRentalLogic;

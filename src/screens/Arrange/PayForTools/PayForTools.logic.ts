import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { selectCurrentRentedTools, selectPostomats, selectUser } from '~redux/selectors';
import OrderService from '~services/Order.service';
import { Screens, ScreensParams } from '~constants/navigators.constants';
import { errorHandlerSentry } from '~utils/errorHandlers.utils';
import { appActions } from '~redux/reducers/app';
import { pollingcheckOrderStatus } from '~utils/component.async.utils';

const PayForToolsLogic = ({ navigation, route }: any) => {
  const { orderId, postomatId, paymentUrl, contentId } = route.params;
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);
  const [paymentUrlState, setPaymentUrl] = React.useState('');

  const rentedTools = useSelector(selectCurrentRentedTools);
  const postomats = useSelector(selectPostomats);
  const user = useSelector(selectUser);

  const linkCardId = user?.bindings && user?.bindings[0]?.id;
  const isCardLinked = !!linkCardId;

  const rentedTool = React.useMemo(
    () => rentedTools.find(tool => tool.id === orderId),
    [rentedTools, orderId],
  );
  const postomat = React.useMemo(
    () => postomats.find(postomat => `${postomat.id}` === `${postomatId}`),
    [postomats, postomatId],
  );

  const onPaymentSubmit = React.useCallback(async () => {
    if (isCardLinked) {
      try {
        setIsLoading(true);
        const data = await OrderService.repeatOrder(linkCardId, orderId);
        navigation.navigate(Screens.rentPreStarted, {
          pin: data.pin,
          ended: data.ended,
          orderId: orderId,
          postomatId: postomatId,
        });
      } catch (err: any) {
        errorHandlerSentry('Repeat order error', err, isCardLinked ? 'no' : 'yes');
        if (isCardLinked) navigation.navigate(Screens.rentError, ScreensParams.paymentError);
      } finally {
        setIsLoading(false);
      }
    } else {
      setPaymentUrl(paymentUrl);
    }
  }, [isCardLinked, linkCardId, navigation, orderId, paymentUrl, postomatId]);

  const onPaymentCancelScreen = React.useCallback(async () => {
    navigation.navigate(Screens.orderCancel, { orderId, postomatId });
  }, [orderId, postomatId, navigation]);

  const catchRedirectedUrl = ({ url }: { url: string }) => {
    // const params = getQueryParams(url);
    if (/payment\/payment_status/i.test(url)) {
      navigation.navigate(Screens.tabNavigator, { screen: Screens.mainPage });
    }
    if (/success/i.test(url) && orderId && postomat?.id) {
      setPaymentUrl('');
      setIsLoading(true);
      dispatch(appActions.setOverlayShown(true));
      pollingcheckOrderStatus({
        orderId: { current: orderId },
        contentId: { current: contentId },
        navigation,
        setIsLoading,
        requestType: 'startRental',
        postomatId: postomat?.id,
      });
    }
  };

  return {
    isLoading,
    paymentUrlState,
    catchRedirectedUrl,
    rentedTool,
    postomat,
    onPaymentSubmit,
    onPaymentCancelScreen,
  };
};
export default PayForToolsLogic;

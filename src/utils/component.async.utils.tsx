import React from 'react';
import { Screens, ScreensParams } from '~constants/navigators.constants';
import store from '~redux/store';
import { appActions } from '~redux/reducers/app';
import { errorHandlerSentry } from '~utils/errorHandlers.utils';
import PaymentService from '~services/Payment.service';

export const pollingcheckOrderStatus = async ({
  orderId,
  contentId,
  navigation,
  setIsLoading,
  count = 0,
  requestType,
  postomatId,
}: {
  orderId: React.MutableRefObject<string | null>;
  contentId: React.MutableRefObject<number | null>;
  navigation: any;
  count?: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  requestType: 'startRental' | 'extendRental';
  postomatId: string;
}) => {
  try {
    if (count > 5) throw new Error('TimeOut error');
    if (!orderId) throw new Error('orderId undefined');
    store.dispatch(appActions.setOverlayShown(true));
    setIsLoading(true);
    const res = await PaymentService.checkPaymentStatus({
      orderId: orderId?.current,
      contentId: contentId?.current,
    });
    if (res?.status === 200) {
      if (requestType === 'startRental')
        navigation.navigate(Screens.rentPreStarted, {
          pin: res.data.pin,
          ended: res.data.ended,
          orderId: orderId.current,
          postomatId: postomatId,
        });
      if (requestType === 'extendRental')
        navigation.navigate(Screens.rentRenewal, {
          ended: res.data.ended,
          postomatId: postomatId,
        });
    }
    if (res?.status === 202) {
      setTimeout(() => {
        pollingcheckOrderStatus({
          orderId,
          contentId,
          navigation,
          count: count + 1,
          setIsLoading,
          requestType,
          postomatId,
        });
      }, 3000);
      return;
    }
  } catch (err: any) {
    const errTitle =
      requestType === 'startRental' ? 'Failed to pay start rental' : 'Failed to pay extend rental';
    console.error(errTitle, err?.message);
    errorHandlerSentry(requestType, err, 'no');
    navigation.navigate(Screens.rentError, ScreensParams.paymentError);
  } finally {
    store.dispatch(appActions.setOverlayShown(false));
    setIsLoading(false);
  }
};

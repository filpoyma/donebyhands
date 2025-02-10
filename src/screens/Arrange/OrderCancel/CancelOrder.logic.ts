import { useSelector } from 'react-redux';
import React from 'react';
import { selectCurrentRentedTools, selectPostomats } from '~redux/selectors';
import OrderService from '~services/Order.service';
import { Screens } from '~constants/navigators.constants';
import { errorHandler } from '~utils/errorHandlers.utils';

const CancelOrderLogic = ({ navigation, route }: any) => {
  const { orderId, postomatId } = route.params;
  const [isLoading, setIsLoading] = React.useState(false);

  const rentedTools = useSelector(selectCurrentRentedTools);
  const postomats = useSelector(selectPostomats);

  const rentedTool = React.useMemo(
    () => rentedTools.find(tool => tool.id === orderId),
    [rentedTools, orderId],
  );
  const postomat = React.useMemo(
    () => postomats.find(postomat => `${postomat.id}` === `${postomatId}`),
    [postomats, postomatId],
  );

  const onOrderCancel = React.useCallback(async () => {
    try {
      setIsLoading(true);
      await OrderService.cancelOrder(orderId);
      navigation.navigate(Screens.tabNavigator, { screen: Screens.mainPage });
    } catch (err: any) {
      errorHandler('onOrderCancel error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [navigation, orderId]);

  return {
    isLoading,
    rentedTool,
    postomat,
    onOrderCancel,
  };
};
export default CancelOrderLogic;

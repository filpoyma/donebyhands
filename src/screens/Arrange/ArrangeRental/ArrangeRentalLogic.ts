import React from 'react';
import { Alert } from 'react-native';
import { orderActions } from '~redux/reducers/order';
import { Screens } from '~constants/navigators.constants';

import { useDispatch, useSelector } from 'react-redux';
import { selectOrder, selectPostomat, selectTool, selectUser } from '~redux/selectors';
import { useModalWithFade } from '~components/modal/ModalWithFade';
import InAppMessageService from '~services/InAppMessage.service';
import { checkOrder } from '~utils/order.utils';

const ArrangeRentalLogic = (navigation: any) => {
  const [values, setValues] = React.useState({ points: 0, promocode: '' });
  const { isModalOpen, showModal, hideModal } = useModalWithFade();

  const dispatch = useDispatch();

  const order = useSelector(selectOrder);
  const tool = useSelector(selectTool);
  const postomat = useSelector(selectPostomat);
  const user = useSelector(selectUser);

  const tariffId = order?.tariffId;
  const linkCardId = user?.bindings && user?.bindings[0]?.id;
  const isCardLinked = !!linkCardId;
  const isUserDocsGranted = user?.docs_status === 'granted';

  const tariffs = React.useMemo(() => tool?.tariffs || [], [tool]);
  const tariff = React.useMemo(() => {
    const selectedTariffIndex = tariffs?.findIndex(tariff => tariff.id === tariffId);
    return tariffs[selectedTariffIndex];
  }, [tariffId, tariffs]);

  const tariffPrice = tariff?.price || 0;
  const isTariffsAvailable = tariffs?.length > 0;

  const halfTarifPrice = tariffPrice ? tariffPrice / 2 : 0;
  const fee = isUserDocsGranted ? 0 : tool?.bail_amount || 0;
  const maximumPoints = React.useMemo(
    () => ((user?.points || 0) < halfTarifPrice ? user?.points : halfTarifPrice),
    [halfTarifPrice, user?.points],
  );

  const promocodeDiscount = React.useMemo(
    () =>
      parseInt(
        order?.promocodes.find(promocode => promocode.name === values.promocode.toLowerCase())
          ?.amount || '0',
        10,
      ),
    [order?.promocodes, values.promocode],
  );

  const promoDiscountRub = (promocodeDiscount * tariffPrice) / 100;
  const totalPrice = tariffPrice + fee - promoDiscountRub - values.points || 0;

  React.useEffect(() => {
    dispatch(orderActions.updateCurrentOrder({ tariffId: tariffs[0]?.id }));
  }, []);

  const onChangeHandler = React.useCallback((name: string, value: string | number) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  const onShowRentRulesModal = React.useCallback(() => {
    showModal();
  }, [showModal]);

  const openDocumentsScreen = React.useCallback(() => {
    navigation.navigate(Screens.documents);
  }, [navigation]);

  const onSubmitPromo = () => {
    if (!values.promocode) return;
    if (promocodeDiscount === 0) {
      InAppMessageService.danger('Промокод не найден.');
      setValues(() => ({ ...values, promocode: '' }));
    } else {
      InAppMessageService.danger('Промокод найден.');
    }
  };

  const onPressTimeGap = React.useCallback(
    (tariffId: string) => {
      dispatch(orderActions.updateCurrentOrder({ tariffId }));
      setValues(prev => ({ ...prev, points: 0 }));
    },
    [dispatch],
  );

  const onSubmitOrder = React.useCallback(async () => {
    hideModal();
    if (values.promocode && values.points)
      return Alert.alert('Промокод и баллы не могут быть использованны одновременно');
    if (checkOrder(order).isInvalid) return InAppMessageService.danger(checkOrder(order).message);
    // setIsLoading(true);
    navigation.navigate(Screens.emailAtRentBegin, {
      points: values.points,
      promocode: values.promocode,
    });
  }, [linkCardId, order, values, dispatch, isCardLinked]);

  return {
    values,
    onSubmitPromo,
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
    onSubmitOrder,
    onChangeHandler,
    onShowRentRulesModal,
    isModalOpen,
    isTariffsAvailable,
    hideModal,
    openDocumentsScreen,
    isUserDocsGranted,
  };
};

export default ArrangeRentalLogic;

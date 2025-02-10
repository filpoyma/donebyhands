import React from 'react';
import { orderActions } from '~redux/reducers/order';
import { Screens } from '~constants/navigators.constants';

import { useDispatch, useSelector } from 'react-redux';
import { selectOrder, selectPostomat, selectTool } from '~redux/selectors';
import { useModalWithFade } from '~components/modal/ModalWithFade';

const ArrangeRentalLogic = (navigation: any) => {
  const [values, setValues] = React.useState({ points: 0, promocode: '' });
  const { isModalOpen, showModal, hideModal } = useModalWithFade();

  const dispatch = useDispatch();

  const order = useSelector(selectOrder);
  const tool = useSelector(selectTool);
  const postomat = useSelector(selectPostomat);
  const tariffId = order?.tariffId;
  const isUserDocsGranted = true;

  const tariffs = React.useMemo(() => tool?.tariffs || [], [tool]);
  const tariff = React.useMemo(() => {
    const selectedTariffIndex = tariffs?.findIndex(tariff => tariff.id === tariffId);
    return tariffs[selectedTariffIndex];
  }, [tariffId, tariffs]);

  const tariffPrice = tariff?.price || 0;
  const isTariffsAvailable = tariffs?.length > 0;

  const fee = 0;
  const maximumPoints = 0;

  React.useEffect(() => {
    dispatch(orderActions.updateCurrentOrder({ tariffId: tariffs[0].id }));
  }, []);

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
  const totalPrice = tariffPrice + fee - promoDiscountRub;

  const onChangeHandler = React.useCallback((name: string, value: string | number) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  const onShowRentRulesModal = React.useCallback(() => {
    showModal();
  }, [showModal]);

  const openDocumentsScreen = React.useCallback(() => {
    navigation.navigate(Screens.documents);
  }, [navigation]);

  const onSubmitPromo = () => {};

  const onPressTimeGap = React.useCallback(
    (tariffId: string) => {
      dispatch(orderActions.updateCurrentOrder({ tariffId }));
      setValues(prev => ({ ...prev, points: 0 }));
    },
    [dispatch],
  );

  const onSubmitOrder = React.useCallback(async () => {
    navigation.navigate(Screens.signUp);
  }, []);

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

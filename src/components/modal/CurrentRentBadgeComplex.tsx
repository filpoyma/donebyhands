import React from 'react';

import CurrentRentBadge from '~components/modal/CurrentRentBadge';
import { MainStackParamList, Screens } from '~constants/navigators.constants';
import { useNavigation } from '@react-navigation/native';
import { IRentedTools } from '~typedefs/models/Tools.model';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostomats } from '~redux/selectors';
import { orderActions } from '~redux/reducers/order';
import { distanceToUser } from '~utils/maps.utils';
import { TModalNames } from '~typedefs/screens/MainPage';
import { errorHandlerSentry } from '~utils/errorHandlers.utils';
import RentService from '~services/Rent.service';
import { renderModalLoading } from '~components/shared/Loaders';
import IconTitle from '~assets/icons/bigError.svg';
import InfoBageScroll from '~components/modal/InfoBageScroll';
import { StackNavigationProp } from '@react-navigation/stack';

type extendRentalStack = StackNavigationProp<MainStackParamList, Screens.extendRental>;

const CurrentRentBadgeComplex = ({
  modalName,
  hideModal,
  currentItem,
}: {
  modalName: React.MutableRefObject<TModalNames>;

  hideModal: () => void;
  hideModalAndOverlayLock: () => void;
  currentItem: IRentedTools;
  showModal: () => void;
}) => {
  const navigation = useNavigation<extendRentalStack>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  const postomats = useSelector(selectPostomats);
  const postomat = React.useMemo(
    () => postomats.find(postomat => postomat.id === `${currentItem?.parce_locker}`),
    [currentItem?.parce_locker, postomats],
  );

  const orderId = currentItem?.id;
  const postomatId = `${currentItem?.parce_locker}`;
  const extendRentalHandler = () => {
    dispatch(
      orderActions.updateExtendOrder({
        distanceToPostomat: (postomat && distanceToUser(postomat)) || 0,
      }),
    );
    navigation.navigate(Screens.extendRental, {
      orderId,
      postomatId,
    });
  };

  // завершить аренду. предупреждение
  const returnToolAlert = () => {
    if (currentItem.status_type === 4) return onReturnSubmit();
    hideModal();
    navigation.navigate(Screens.rentEndWarning, {
      orderId: orderId,
      postomatId: postomatId,
    });
  };

  // завершить аренду
  // да нажата
  const onReturnSubmit = React.useCallback(async () => {
    try {
      setIsLoading(true);
      await RentService.debtCheck(orderId);
      hideModal();
      setIsLoading(false);
      navigation.navigate(Screens.takingToolsPictures, {
        orderId: orderId,
        postomatId: postomatId,
        photoType: 'return',
      });
    } catch (err: any) {
      errorHandlerSentry(
        'Return tool error',
        err,
        'yes',
        'Не удалось оплатить просроченную аренду',
      );
      setIsLoading(false);
      hideModal();
    }
  }, [orderId, postomatId, navigation, hideModal]);

  return (
    <>
      {modalName.current === 'currentRent' && (
        <CurrentRentBadge
          item={currentItem}
          postomat={postomat}
          hideModal={hideModal}
          buttonText="Вернуть инструмент"
          secButtonText="Продлить аренду"
          buttonOnPress={returnToolAlert}
          secButtonOnPress={extendRentalHandler}
        />
      )}
      {modalName.current === 'rentHistory' && (
        <CurrentRentBadge
          item={currentItem}
          isHistory={true}
          postomat={postomat}
          hideModal={hideModal}
          buttonText=""
          secButtonText=""
          //buttonOnPress={returnToolHandler}
          buttonOnPress={onReturnSubmit}
          secButtonOnPress={extendRentalHandler}
        />
      )}
      {/*{modalName === 'returnToolsAlert' && (*/}
      {/*  <AroundPostomatBadge*/}
      {/*    hideModal={hideModal}*/}
      {/*    postomat={postomat}*/}
      {/*    buttonOnPress={onReturnSubmit}*/}
      {/*    secButtonOnPress={() => {}}*/}
      {/*  />*/}
      {/*)}  */}
      {modalName.current === 'returnToolsAlert' && (
        <InfoBageScroll
          hideModal={hideModal}
          titleText="Вы завершаете аренду"
          contentText="Обращаем ваше внимание на то, что все оставшееся время аренды сгорает."
          buttonText="Завершить аренду"
          buttonOnPress={onReturnSubmit}
          secButtonText="Отмена"
          TitleIcon={IconTitle}
          textAlign="center"
        />
      )}
      {renderModalLoading(isLoading)}
    </>
  );
};

export default CurrentRentBadgeComplex;

//hideModal,
//   titleText,
//   contentText = '',
//   buttonText,
//   secButtonText,
//   secButtonOnPress = () => {},
//   TitleIcon,

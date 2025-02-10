import React from 'react';
import { ImageBackground, View } from 'react-native';

import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import { BaseButton } from '~components/shared/buttons';
import RowView from '~components/view/Row.view';
import LoadFile from '~components/widgets/Camera/LoadFile';
import styles from './TakingPhotoPictures.styles';
import { TakingToolsPicturesScreenProps } from '~typedefs/screens/TakingToolsPicturies';
import { AppText, HeaderText } from '~components/shared/text';
import { Asset } from 'react-native-image-picker';
import { IPhoto } from '~typedefs/models/Camera';
import { uploadImageKeys } from '~constants/api.constants';
import orderService from '~services/Order.service';
import PlHolderText from '~components/shared/text/PlHolder.text';
import { errorHandlerSentry } from '~utils/errorHandlers.utils';
import { Screens } from '~constants/navigators.constants';
import ParcelLockerService from '~services/ParcelLocker.service';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import PhotosInfoBadge from '~components/modal/PhotosInfoBadge';
import { renderLoading } from '~components/shared/Loaders';
import arrangeRentalDataStorageItem from '~storage/arrangeRentalData.storageItem';
import { useSelector } from 'react-redux';
import { selectOrder } from '~redux/selectors';

const TakingToolsPicturesScreen: React.FC<TakingToolsPicturesScreenProps> = ({
  navigation,
  route,
}) => {
  const currentOrder = useSelector(selectOrder) || {};
  let { orderId, photoType, postomatId } = route.params || { ...currentOrder, photoType: 'start' };
  const { isModalOpen, showModal, hideModal } = useModalWithFade();

  const [photos, setPhotos] = React.useState<IPhoto[]>([]);
  const [message, setMessage] = React.useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const takedPhoto = React.useRef<Asset | undefined>(undefined);

  React.useEffect(() => {
    if (photoType === 'start')
      arrangeRentalDataStorageItem
        .set({ orderId, postomatId, fromScreen: Screens.takingToolsPictures })
        .catch(console.error);
  }, []);

  const onChangeHandler = React.useCallback(
    (serverPath: string, photo: Asset) => {
      takedPhoto.current = photo;
      setPhotos(prevValues => [...prevValues, { ...photo, serverKey: serverPath }]);
      if (photos.length === 2) setIsDisabled(false);
    },
    [photos.length],
  );
  const onTextSubmit = (text: string) => {
    setMessage(text);
  };

  const onTextCancel = () => {
    setMessage('');
  };

  const onSubmitHandler = React.useCallback(async () => {
    setIsDisabled(true);
    setIsLoading(true);
    try {
      if (photoType === 'return') {
        //get pin and load photos
        const data = await ParcelLockerService.getEndRentalPinAndLoadPhotos(
          orderId,
          photos,
          message,
        );
        arrangeRentalDataStorageItem.remove().catch(console.error);
        navigation.navigate(Screens.rentEndPin, {
          orderId: orderId,
          photoType: 'return',
          postomatId: postomatId,
          pin: data?.end_pin,
        });
      }
      if (photoType === 'start') {
        await orderService.uploadPhotosOnRentalStart(orderId, photos, message);
        arrangeRentalDataStorageItem.remove().catch(console.error);
        navigation.navigate(Screens.rentStartedFromCell, { orderId });
      }
    } catch (err: any) {
      console.error('TakingToolsPictures.screen.tsx err:', err);
      //TODO add error codes for backend
      if (err.message === 'Ячейка не закрыта')
        navigation.navigate(Screens.cellNotClosed, {
          orderId,
          forwardScreen: photoType === 'start' ? Screens.rentStartedFromCell : Screens.rateUs,
        });
      else errorHandlerSentry('End Rental error:', err);
    } finally {
      setIsDisabled(false);
      setIsLoading(false);
    }
  }, [navigation, photos, orderId, photoType, postomatId, message]);
  return (
    <ScreenView screenPaddings={false} style={styles.container}>
      <View style={{ flex: 1 }}>
        <BackButtonHeader
          paddings
          title="Фотографирование инструмента"
          onBackButtonPress={navigation.goBack}
          canGoBack={navigation.canGoBack()}
        />
        <ImageBackground
          style={{ flex: 1 }}
          source={
            takedPhoto?.current?.uri
              ? { uri: takedPhoto.current?.uri }
              : require('../../../assets/images/empty.png')
          }>
          <View style={styles.backgroundImg}>
            {!photos.length && (
              <View style={{ gap: 8 }}>
                <HeaderText size="h1">Сфотографируйте инструмент</HeaderText>
                <PlHolderText>крупным планом и все комплектующие</PlHolderText>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <RowView style={styles.photos}>
          <LoadFile
            name={uploadImageKeys.endRent}
            cameraType="back"
            onPress={onChangeHandler}
            disabled={isDisabled}
          />
          <LoadFile
            name={uploadImageKeys.endRent}
            cameraType="back"
            onPress={onChangeHandler}
            disabled={isDisabled}
          />
          <LoadFile
            name={uploadImageKeys.endRent}
            cameraType="back"
            onPress={onChangeHandler}
            disabled={isDisabled}
          />
        </RowView>
        <View style={{ gap: 16 }}>
          <BaseButton text="Далее" onPress={onSubmitHandler} disabled={isDisabled} />
          <AppText onPress={() => showModal()} style={styles.messageText}>
            Сообщить о неисправности
          </AppText>
        </View>
      </View>
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        <PhotosInfoBadge
          titleText="Сообщить о повреждениях и неисправностях"
          buttonText="Отправить"
          message={message}
          buttonOnPress={onTextSubmit}
          secButtonText={message ? 'Удалить' : 'Отмена'}
          secButtonOnPress={onTextCancel}
          hideModal={hideModal}
        />
      </ModalWithFade>
      {renderLoading(isLoading)}
    </ScreenView>
  );
};

export default TakingToolsPicturesScreen;

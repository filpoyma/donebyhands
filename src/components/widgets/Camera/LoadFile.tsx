import React from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Asset, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { CameraType } from 'react-native-image-picker/src/types';

import PlusIcon from '~assets/icons/plus.svg';
import { Colors } from '~constants/colors.constants';
import { requestCameraPermission, requestExternalWritePermission } from '~utils/permission.utils';
import PersonIcon from '~assets/icons/person.svg';
import PencilIcon from '~assets/icons/pencilSquare.svg';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import SelectPhotoMode from '~components/modal/SelectOhotoMode';

const photoSize = {
  avatar: {
    maxWidth: 500,
    maxHeight: 500,
    quality: 0.8,
  },
  takePhoto: {
    maxWidth: 800,
    maxHeight: 1280,
    quality: 0.7,
  },
  getPhoto: {
    maxWidth: 800,
    maxHeight: 1280,
    quality: 0.7,
  },
};

const LoadFile = ({
  onPress,
  name,
  cameraType,
  size = null,
  imageUri,
  avatar = false,
  isSelectMode = false,
  disabled = false,
}: {
  onPress: (name: string, photo: Asset) => void;
  name: string;
  cameraType: CameraType;
  size?: { width: number; height: number } | null;
  imageUri?: string;
  avatar?: boolean;
  isSelectMode?: boolean;
  disabled?: boolean;
}) => {
  const [filePath, setFilePath] = React.useState<string | undefined>(imageUri);
  const { isModalOpen, showModal, hideModal } = useModalWithFade();
  const getImageHandler = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: avatar ? photoSize.avatar.maxWidth : photoSize.getPhoto.maxWidth,
      maxHeight: avatar ? photoSize.avatar.maxHeight : photoSize.getPhoto.maxHeight,
      quality: avatar ? photoSize.avatar.quality : photoSize.getPhoto.quality,
      includeExtras: true,
      cameraType: cameraType,
    };

    try {
      await requestExternalWritePermission();
      //@ts-ignore
      const response = await launchImageLibrary(options);
      // if (response.didCancel) {
      //   Alert.alert('Загрузка картинки отменена');
      //   return;
      // } else
      if (response.errorCode === 'permission') {
        Alert.alert('Доступ к файлам не разрешен');
        return;
      } else if (response.errorCode === 'others') {
        Alert.alert(response.errorMessage || '');
        return;
      }
      if (response.assets) {
        hideModal();
        const photo: Asset = response.assets[0];
        setFilePath(photo.uri);
        onPress(name, photo);
      }
    } catch (err) {
      console.error('Error get Image:', err);
    }
  };

  const takePhotoHandler = async () => {
    let options = {
      mediaType: 'photo',
      ...photoSize.takePhoto,
      cameraType: cameraType,
      // saveToPhotos: true,
    };
    try {
      let isCameraPermitted = await requestCameraPermission();
      if (!isCameraPermitted)
        return Alert.alert(
          'Доступ к камере запрещен.',
          'Пожалуйста, разрешите доступ к камере в системных настройках.',
        );
      // @ts-ignore
      const response = await launchCamera(options);
      // if (response.didCancel) {
      //   Alert.alert('Загрузка картинки отменена');
      //   return;
      // } else
      if (response.errorCode === 'camera_unavailable') {
        Alert.alert('Камера недоступна на устройстве');
        return;
      } else if (response.errorCode === 'permission') {
        Alert.alert('Доступ к камере не разрешен');
        return;
      } else if (response.errorCode === 'others') {
        Alert.alert(response?.errorMessage || '');
        return;
      }
      if (response.assets) {
        hideModal();
        const photo: Asset = response.assets[0];
        setFilePath(photo.uri || '');
        onPress(name, photo);
      }
    } catch (error) {
      console.error('Camera error:', error);
    }
  };

  const onPressHandler = async () => {
    if (isSelectMode) return showModal(false);
    await takePhotoHandler();
  };

  if (avatar)
    return (
      <TouchableOpacity onPress={disabled ? undefined : onPressHandler} activeOpacity={0.6}>
        <View style={styles.photoAvatar}>
          {imageUri ? (
            <Image
              source={{ uri: filePath, cache: 'force-cache' }}
              resizeMode="cover"
              style={styles.imageStyleAvatar}
            />
          ) : (
            <PersonIcon width={32} height={32} />
          )}
        </View>
        <View style={styles.editIcon}>
          <PencilIcon height={16} width={16} fill={Colors.white} />
        </View>
        <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
          <SelectPhotoMode
            hideModal={hideModal}
            takePhoto={takePhotoHandler}
            getImage={getImageHandler}
          />
        </ModalWithFade>
      </TouchableOpacity>
    );
  return (
    <TouchableOpacity onPress={onPressHandler} activeOpacity={0.6}>
      <View style={[styles.photo, size && { width: size.width, height: size.height }]}>
        {filePath ? (
          <Image
            source={{ uri: filePath, cache: 'force-cache' }}
            resizeMode="cover"
            style={[styles.imageStyle, size && { width: size.width, height: size.height }]}
          />
        ) : (
          <PlusIcon />
        )}
      </View>
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        <SelectPhotoMode
          hideModal={hideModal}
          takePhoto={takePhotoHandler}
          getImage={getImageHandler}
        />
      </ModalWithFade>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  photo: {
    width: 88,
    height: 96,
    backgroundColor: Colors.grey2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoAvatar: {
    width: 80,
    height: 80,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    overflow: 'hidden',
  },
  imageStyle: {
    width: 88,
    height: 96,
  },
  imageStyleAvatar: {
    width: 80,
    height: 80,
  },
  editIcon: {
    position: 'absolute',
    left: 57,
    bottom: 0,
    backgroundColor: Colors.red,
    borderRadius: 12,
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadFile;

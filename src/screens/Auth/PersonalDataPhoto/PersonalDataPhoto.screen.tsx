import React from 'react';
import { View } from 'react-native';
import { Asset } from 'react-native-image-picker';

import { HeaderText } from '~components/shared/text';
import { Row, ScreenView } from '~components/view';
import { BaseButton } from '~components/shared/buttons';
import SecButton from '~components/shared/buttons/Sec.button';
import PlHolderText from '~components/shared/text/PlHolder.text';
import LoadFile from '~components/widgets/Camera/LoadFile';
import { PersonalDataPhotoProps } from '~typedefs/screens/PersonalDataPhoto';
import UserService from '~services/User.service';
import AuthService from '~services/Auth.service';
import YaMetricaService from '~services/YandexMetrica.service';
import { IPhoto } from '~typedefs/models/Camera';
import { Screens, ScreensParams } from '~constants/navigators.constants';
import { uploadImageKeys } from '~constants/api.constants';
import styles from './PersonalDataPhoto.style';

const PersonalDataPhoto: React.FC<PersonalDataPhotoProps> = ({ navigation, route }) => {
  const { title, subtitle } = ScreensParams[route.name];
  const [photos, setPhotos] = React.useState<IPhoto[]>([]);
  const [isDisabled, setIsDisabled] = React.useState(true);

  const isSelfieScreen = route.name === Screens.personalDataPhotoSelfie;
  const cameraType = isSelfieScreen ? 'front' : 'back';
  // const isVerified = useSelector(selectUserVerified);
  const uploadImageKey = isSelfieScreen ? uploadImageKeys.selfie : uploadImageKeys.passport;
  const selfies = photos.filter(({ serverKey }) => serverKey === uploadImageKeys.selfie);
  const passports = photos.filter(({ serverKey }) => serverKey === uploadImageKeys.passport);

  React.useEffect(() => {
    if (selfies.length === 1 || passports.length === 2) setIsDisabled(false);
  }, [photos]);

  const onSubmitHandler = React.useCallback(async () => {
    if (!photos.length) return;
    try {
      setIsDisabled(true);
      await UserService.uploadImages(photos);
      if (isSelfieScreen) {
        navigation.navigate(Screens.regInfo);
        YaMetricaService.logInfo('Заявки на верификацию');
      }
      // navigation.navigate(Screens.checkFailed);
      else navigation.navigate(Screens.personalDataPhotoSelfie);
    } catch (e: any) {
      console.error('Error while loafFile user', e?.message);
    } finally {
      setIsDisabled(false);
    }
  }, [photos, isSelfieScreen, navigation]);

  const onChangeHandler = React.useCallback((serverKey: string, photo: Asset) => {
    setPhotos(prevValues => [...prevValues, { ...photo, serverKey }]);
  }, []);

  const skipVerification = () => {
    if (isSelfieScreen)
      UserService.updateUser({ not_verify: true }).catch(err =>
        console.error('set not-verify err:', err),
      );
    AuthService.login().catch(e => console.error('Registration complete error:', e?.message));
  };

  return (
    <ScreenView fullArea>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.title}>
            <HeaderText>{title}</HeaderText>
            <HeaderText size={'h3'} style={styles.subtitle}>
              {subtitle}
            </HeaderText>
          </View>
          <Row style={styles.photos}>
            <LoadFile
              name={uploadImageKey}
              isSelectMode={!isSelfieScreen}
              cameraType={cameraType}
              onPress={onChangeHandler}
            />
            {!isSelfieScreen && (
              <LoadFile
                name={uploadImageKey}
                isSelectMode={!isSelfieScreen}
                cameraType={cameraType}
                onPress={onChangeHandler}
              />
            )}
          </Row>
          <View style={styles.button}>
            <BaseButton text="Продолжить" onPress={onSubmitHandler} disabled={isDisabled} />
          </View>
        </View>
        <View style={styles.secButton}>
          <SecButton text="Продолжить без верификации" onPress={skipVerification} />
          <PlHolderText>К стоимости аренды будет добавлен залог</PlHolderText>
        </View>
      </View>
    </ScreenView>
  );
};

export default PersonalDataPhoto;

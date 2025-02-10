import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { HeaderText } from '~components/shared/text';
import { Row, ScreenView } from '~components/view';
import { Colors } from '~constants/colors.constants';
import { BaseButton } from '~components/shared/buttons';
import { MainStackParamList, Screens } from '~constants/navigators.constants';

import LoadFile from '~components/widgets/Camera/LoadFile';
import { hp, wp } from '~utils/dimensions.utils';
import { BackButtonHeader } from '~components/widgets/headers';
import { StackScreenProps } from '@react-navigation/stack';
import UserService from '~services/User.service';
import { IPhoto } from '~typedefs/models/Camera';
import { Asset } from 'react-native-image-picker';
import { uploadImageKeys } from '~constants/api.constants';
import { HTTPError } from 'ky';
import YaMetricaService from '~services/YandexMetrica.service';
import { renderLoading } from '~components/shared/Loaders';

type DocumentsEditScreenProps = StackScreenProps<MainStackParamList, Screens.documentsEdit>;

const DocumentsEditScreen: React.FC<DocumentsEditScreenProps> = ({ navigation }) => {
  const [photos, setPhotos] = React.useState<IPhoto[]>([]);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const selfies = photos.filter(({ serverKey }) => serverKey === uploadImageKeys.selfie);
  const passports = photos.filter(({ serverKey }) => serverKey === uploadImageKeys.passport);

  React.useEffect(() => {
    if (selfies.length === 1 && passports.length === 2) setIsDisabled(false);
  }, [photos]);

  const onSubmitHandler = React.useCallback(() => {
    if (!photos.length) return;
    setIsDisabled(true);
    setIsLoading(true);
    UserService.uploadImages(photos)
      .then(() => {
        YaMetricaService.logInfo('Заявки на верификацию');
        navigation.goBack();
      })
      .catch((e: HTTPError) => {
        e.response?.status === 500 && Alert.alert('Ошибка на сервере');
        console.error('onSubmitHandler Error while loafFile user.', e?.message);
      })
      .finally(() => {
        setIsLoading(false);
        setIsDisabled(false);
      });
  }, [photos, navigation]);

  const onChangeHandler = React.useCallback((serverPath: string, photo: Asset) => {
    setPhotos(prevValues => [...prevValues, { ...photo, serverKey: serverPath }]);
  }, []);

  return (
    <ScreenView fullArea>
      <BackButtonHeader title="Документы" onBackButtonPress={navigation.goBack} />
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            <HeaderText size="h4" centered={false}>
              Фотографии паспорта: главная и прописка
            </HeaderText>

            <Row style={styles.photos}>
              <LoadFile
                name={uploadImageKeys.passport}
                isSelectMode={true}
                cameraType="back"
                size={{ height: 141, width: 129 }}
                onPress={onChangeHandler}
              />
              <LoadFile
                name={uploadImageKeys.passport}
                isSelectMode={true}
                cameraType="back"
                size={{ height: 141, width: 129 }}
                onPress={onChangeHandler}
              />
            </Row>
          </View>
          <View>
            <HeaderText size="h4" centered={false}>
              Селфи с паспортом
            </HeaderText>

            <Row style={styles.photos}>
              <LoadFile
                name={uploadImageKeys.selfie}
                cameraType="front"
                size={{ height: 141, width: 129 }}
                onPress={onChangeHandler}
              />
            </Row>
          </View>
        </View>
        <View style={styles.secButton}>
          <BaseButton
            text="Сохранить изменения"
            onPress={onSubmitHandler}
            disabled={isDisabled || isLoading}
          />
        </View>
        {renderLoading(isLoading)}
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(45),
    gap: hp(32),
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    color: Colors.weak,
  },
  photos: {
    marginTop: hp(12),
    gap: wp(8),
  },
  button: {
    marginTop: hp(16),
  },
  secButton: {
    marginBottom: 8,
    gap: 8,
  },
});

export default DocumentsEditScreen;

import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenView } from '~components/view';
import { AppText, HeaderText } from '~components/shared/text';
import { BackButtonHeader } from '~components/widgets/headers';
import { useSelector } from 'react-redux';
import { selectUser } from '~redux/selectors';
import { Colors } from '~constants/colors.constants';
import { hp, ms } from '~utils/dimensions.utils';
import InfoCard from '~components/widgets/InfoCard';
import ExitIcon from '~assets/icons/boxArrowRight.svg';
import SecButton from '~components/shared/buttons/Sec.button';
import InfoCardBalance from '~components/widgets/InfoCardBalance';
import { MainStackParamList, Screens } from '~constants/navigators.constants';
import { phoneRegex } from '~constants/regex.constants';
import LoadFile from '~components/widgets/Camera/LoadFile';
import AuthService from '~services/Auth.service';
import { Asset } from 'react-native-image-picker';
import UserService from '~services/User.service';
import { StackScreenProps } from '@react-navigation/stack';
import { uploadImageKeys } from '~constants/api.constants';
import { IPhoto } from '~typedefs/models/Camera';
import PlHolderText from '~components/shared/text/PlHolder.text';

type ProfileScreenProps = StackScreenProps<MainStackParamList, Screens.profile>;

const getStatus = (status: string | undefined) => {
  switch (status) {
    case 'granted':
      return 'проверено';
    case 'rejected':
      return 'отклонено';
    case 'checking':
      return 'на проверке';
    case 'not_checked':
      return 'не проверено';
    default:
      return '';
  }
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const user = useSelector(selectUser);
  const status = getStatus(user?.docs_status);
  const [isLoading, setIsLoading] = React.useState(false);
  const phoneMasked = user?.mobile_phone?.replace(phoneRegex, '$1 $2 $3 $4 $5');
  const userFullName = `${user?.last_name || ''} ${user?.first_name || ''}`;

  const signOut = React.useCallback(() => {
    setIsLoading(true);
    AuthService.logout()
      .catch(e => console.error('Logout error:', e.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onChangePhoto = React.useCallback(
    (serverKey: string, photo: Asset) => {
      if (!user?.id) {
        console.error('User id did not find...');
        return;
      }
      const photos: IPhoto[] = [{ ...photo, serverKey }];
      // const data = createFormData(photos, {});
      UserService.uploadImages(photos).catch(e =>
        console.error('Error while loadFile:', e?.message),
      );
    },
    [user?.id],
  );

  const onProfileDeletePress = React.useCallback(async () => {
    user?.id &&
      AuthService.deleteUser(user?.id).catch(e => {
        console.error('Delete user error:', e.message);
      });
  }, [user?.id]);

  return (
    <ScreenView fullArea screenPaddings={true}>
      <BackButtonHeader onBackButtonPress={navigation.goBack} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.avatar}>
          {/*<AvatarButton imageUri={user?.avatar_uri} big onPress={() => {}} />*/}
          <LoadFile
            avatar
            isSelectMode={true}
            name={uploadImageKeys.avatar}
            cameraType="front"
            imageUri={user?.photo || ''}
            onPress={onChangePhoto}
          />
        </View>
        <HeaderText size="h2">{userFullName}</HeaderText>
        <AppText style={styles.phone}>{phoneMasked}</AppText>
        <View style={styles.infoCards}>
          <InfoCardBalance
            points={user?.points}
            onPress={() => {
              navigation.navigate(Screens.pointsHistory);
            }}
          />
          <InfoCard
            title="История аренды инструмента"
            onPress={() => {
              navigation.navigate(Screens.rentHistory);
            }}
          />
          <InfoCard
            withBage={user?.docs_status !== 'granted'}
            title="Документы"
            badgeText={status}
            onPress={() => {
              navigation.navigate(Screens.documents);
            }}
          />
          <InfoCard
            title="Контактная информация"
            onPress={() => {
              navigation.navigate(Screens.contactsInfo);
            }}
          />
          <InfoCard
            title="Платежная информация"
            onPress={() => {
              navigation.navigate(Screens.paymentsInfo);
            }}
          />
          <SecButton
            text="Выйти"
            IconLeft={ExitIcon}
            style={{ borderWidth: 1, borderColor: Colors.red, marginBottom: 18 }}
            disabled={isLoading}
            onPress={signOut}
          />
        </View>
        <HeaderText
          size="h4"
          color={Colors.red}
          style={styles.delText}
          suppressHighlighting={true}
          onPress={() => {
            Alert.alert(
              'Вы действительно хотите удалить профиль?',
              'Это действие нельзя будет отменить',
              [
                {
                  text: 'Удалить профиль',
                  onPress: onProfileDeletePress,
                },
                {
                  text: 'Не удалять профиль',
                  onPress: () => {},
                  style: 'cancel',
                },
              ],
            );
          }}>
          Удалить профиль
        </HeaderText>
        <PlHolderText style={{ fontSize: ms(10), lineHeight: hp(14) }}>
          При удалении профиля из системы будут удалены все ваши личные данные. Для удаления профиля
          необходимо завершить все активные аренды.
        </PlHolderText>
      </ScrollView>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  phone: {
    fontSize: ms(12),
    lineHeight: hp(18),
    fontFamily: 'Inter-Regular',
    color: Colors.weak,
    textAlign: 'center',
  },
  infoCards: {
    marginTop: 16,
    // marginBottom: 46,
    gap: 10,
  },
  delText: { marginTop: 'auto', marginBottom: 14 },
  avatar: { alignItems: 'center', marginBottom: 16 },
});

export default ProfileScreen;

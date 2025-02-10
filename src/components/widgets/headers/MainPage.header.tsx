import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText, HeaderText } from '~components/shared/text';
import { Row } from '~components/view';
import InfoIcon from '~assets/icons/infoCircleFill.svg';
import AvatarButton from '~components/shared//buttons/Avatar.button';
import HeadsetIcon from '~assets/icons/headset.svg';
import BellIcon from '~assets/icons/bell.svg';
import IconDottedButton from '~components/shared//buttons/IconDotted.button';
import WideBadgeSm from '~components/widgets/WideBadgeSm';
import GemIcon from '~assets/icons/gem2.svg';
import { Screens, MainStackParamList } from '~constants/navigators.constants';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import { Colors } from '~constants/colors.constants';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import { selectPushNotifications, selectSupportIcon, selectUser } from '~redux/selectors';
import SupportBageWrap from '~components/modal/SupportBageWrap';

type MainPageHeaderStack = StackNavigationProp<MainStackParamList, Screens.notification>;

const MainPageHeader = ({ paddings = false }: { paddings?: boolean }) => {
  const navigation = useNavigation<MainPageHeaderStack>();
  const { isModalOpen, showModal, hideModal } = useModalWithFade();

  const user = useSelector(selectUser);
  const notifications = useSelector(selectPushNotifications);
  const supportIconUrl = useSelector(selectSupportIcon);

  const isUnreadNotifications = React.useMemo(
    () => notifications.some(notification => !notification.is_read),
    [notifications],
  );
  const userFullName = `${user?.last_name || ''} ${
    user?.first_name ? user?.first_name[0] + '.' : ''
  }`;

  return (
    <Row
      style={[
        styles.container,
        paddings && {
          paddingHorizontal: SCREEN_PADDINGS.horizontal,
          paddingTop: SCREEN_PADDINGS.vertical,
        },
      ]}>
      <Row alignedCenter>
        <AvatarButton imageUri={user?.photo} onPress={() => navigation.navigate(Screens.profile)} />
        <View style={styles.title}>
          <HeaderText style={styles.titleText} centered={false} size={'h4'}>
            {userFullName || ''}
          </HeaderText>
          {user?.docs_status === 'granted' ? (
            <WideBadgeSm Icon={GemIcon} text={user?.points} />
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Screens.documents);
              }}>
              <Row alignedCenter>
                <InfoIcon width={14} height={14} />
                <AppText style={styles.subtitleText}>Пройти верификацию</AppText>
              </Row>
            </TouchableOpacity>
          )}
        </View>
      </Row>
      <Row alignedCenter style={{ gap: 12 }}>
        <TouchableOpacity onPress={() => showModal()}>
          {supportIconUrl ? (
            <Image
              source={{
                uri: supportIconUrl,
                cache: 'force-cache',
              }}
              width={20}
              height={20}
            />
          ) : (
            <HeadsetIcon />
          )}
        </TouchableOpacity>
        <IconDottedButton
          Icon={BellIcon}
          size={24}
          hideDot={!isUnreadNotifications}
          onPress={() => {
            navigation.navigate(Screens.notification);
          }}
        />
      </Row>
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        <SupportBageWrap hideModal={hideModal} />
      </ModalWithFade>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingBottom: 5,
  },
  title: {
    marginLeft: 12,
    alignItems: 'flex-start',
    gap: 2,
  },
  titleText: {
    fontFamily: 'Inter-SemiBold',
  },
  subtitleText: {
    fontSize: 10,
    lineHeight: 15,
    fontFamily: 'Inter-Regular',
  },
});

export default React.memo(MainPageHeader);

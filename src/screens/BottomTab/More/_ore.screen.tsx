import React from 'react';
import { AppState, Linking, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { ScreenView } from '~components/view';
import BackButtonHeader from '~components/widgets/headers/BackButton.header';
import LogoIcon from '~assets/icons/logo.svg';
import SwitchCard from '~components/widgets/moreScreen/SwitchCard';
import BellIcon from '~assets/icons/bellGrey.svg';
import GeoIcon from '~assets/icons/geo.svg';
import InfoCard from '~components/widgets/InfoCard';
import { Screens, TabNavigatorParamList } from '~constants/navigators.constants';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import InfoBage from '~components/modal/InfoBage';
import { onShareApp } from '~utils/helpers.utils';
import SupportBageWrap from '~components/modal/SupportBageWrap';
import { appUrl } from '~constants/api.constants';
import OneSignalService from '~services/OneSignal.service';
import { useSelector } from 'react-redux';
import { selectPrivacyPolicy } from '~redux/selectors';
import { useFocusEffect } from '@react-navigation/native';
import GeoInfo from '~components/widgets/moreScreen/SysPrefInfo';

type MoreScreenProps = BottomTabScreenProps<TabNavigatorParamList, Screens.more>;

const _oreScreen: React.FC<MoreScreenProps> = ({ navigation }) => {
  const [isPush, setIsPush] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { isModalOpen, showModal, hideModal } = useModalWithFade();
  const privacyPolicyText = useSelector(selectPrivacyPolicy);
  const modalName = React.useRef('support');

  React.useLayoutEffect(() => {
    (async () => {
      const { isPushDisabled, hasNotificationPermission } = await OneSignalService.getPermissions();
      if (!isPushDisabled && hasNotificationPermission) setIsPush(true);
      else setIsPush(false);
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const subscription = AppState.addEventListener('change', handleAppStateChange);
      return () => {
        subscription.remove();
      };
    }, []),
  );

  const handleAppStateChange = async () => {
    const { hasNotificationPermission, isPushDisabled } = await OneSignalService.getPermissions();
    if (!hasNotificationPermission) {
      setIsPush(false);
      await OneSignalService.disableSubscription();
    }
    if (!isPushDisabled && hasNotificationPermission) {
      setIsPush(true);
      await OneSignalService.enableSubscription();
    }
  };

  const onToggleSwitch = async (toggleState: boolean) => {
    try {
      setIsLoading(true);
      const { hasNotificationPermission } = await OneSignalService.getPermissions();
      if (!hasNotificationPermission && toggleState) {
        setIsPush(false);
        setIsLoading(false);
        return;
        // return Alert.alert(
        //   'Сервис пуш уведомлений запрещен. ',
        //   'Для включения показа уведомлений, разрешите его в системных настройках.',
        //   [
        //     {
        //       text: 'отмена',
        //       onPress: () => {},
        //       style: 'cancel',
        //     },
        //     { text: 'ок', onPress: () => Linking.openSettings().catch() },
        //   ],
        // );
      }

      if (toggleState) await OneSignalService.enableSubscription();
      if (!toggleState) await OneSignalService.disableSubscription();
    } catch (err: any) {
      console.error('Error to disable/enable push:', err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const setPrivacyPolicyModal = React.useCallback(() => {
    modalName.current = 'privacyPolicy';
    showModal();
  }, []);
  const setSupportModal = React.useCallback(() => {
    modalName.current = 'support';
    showModal();
  }, []);

  const openSysPref = React.useCallback(() => {
    Linking.openSettings().catch(err => {
      console.error(err);
    });
  }, []);

  return (
    <ScreenView screenPaddings={true}>
      <BackButtonHeader title="О приложении" onBackButtonPress={navigation.goBack} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logo}>
          <LogoIcon />
        </View>
        <View style={styles.switchCards}>
          <SwitchCard
            Icon={BellIcon}
            title="Показывать уведомления"
            subtitle="Выводить push уведомления"
            isEnabled={isPush}
            setIsEnabled={setIsPush}
            disabled={isLoading}
            onTogleSwitch={onToggleSwitch}
          />
          <GeoInfo
            Icon={GeoIcon}
            title="Геолокация"
            subtitle="При отключенной геопозиции вы не сможете полноценно работать с картой"
            linkText="Настройка местоположения"
            onPress={openSysPref}
          />
        </View>
        <View style={styles.infoCards}>
          <InfoCard
            title="Оценить приложение"
            onPress={() => {
              Linking.openURL(appUrl).catch(err => {
                console.warn('Error from rate us ', err);
              });
            }}
          />
          <InfoCard title="Техническая поддержка" onPress={setSupportModal} />
          <InfoCard title="Политика конфиденциальности" onPress={setPrivacyPolicyModal} />
          <InfoCard title="Поделиться приложением" onPress={onShareApp} />
        </View>
      </ScrollView>
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        {modalName.current === 'privacyPolicy' ? (
          <InfoBage
            titleText="Политика конфиденциальности"
            contentText={privacyPolicyText}
            buttonText="Закрыть"
            hideModal={hideModal}
          />
        ) : (
          <SupportBageWrap hideModal={hideModal} />
        )}
      </ModalWithFade>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 38,
    alignItems: 'center',
  },
  switchCards: {
    marginTop: 96,
    gap: 16,
  },
  infoCards: {
    marginTop: 19,
    marginBottom: 46,
    gap: 10,
  },
});

export default _oreScreen;

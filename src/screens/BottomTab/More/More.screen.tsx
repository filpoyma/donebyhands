import React from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { ScreenView } from '~components/view';
import BackButtonHeader from '~components/widgets/headers/BackButton.header';
import LogoIcon from '~assets/icons/logo.svg';
import BellIcon from '~assets/icons/bellGrey.svg';
import GeoIcon from '~assets/icons/geo.svg';
import InfoCard from '~components/widgets/InfoCard';
import {
  MainStackParamList,
  Screens,
  TabNavigatorParamList,
} from '~constants/navigators.constants';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import { onShareApp } from '~utils/helpers.utils';
import SupportBageWrap from '~components/modal/SupportBageWrap';
import { appUrl } from '~constants/api.constants';
import { useSelector } from 'react-redux';
import { selectPrivacyPolicy } from '~redux/selectors';
import SysPrefInfo from '~components/widgets/moreScreen/SysPrefInfo';
import InfoBageScroll from '~components/modal/InfoBageScroll';
import { CompositeScreenProps, StackScreenProps } from '~typedefs/screens';

type MoreScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabNavigatorParamList, Screens.more>,
  StackScreenProps<MainStackParamList, Screens.faq>
>;

const MoreScreen: React.FC<MoreScreenProps> = ({ navigation }) => {
  const { isModalOpen, showModal, hideModal } = useModalWithFade();
  const privacyPolicyText = useSelector(selectPrivacyPolicy) || '';
  const modalName = React.useRef('support');

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

  const openFAQScreen = React.useCallback(() => {
    navigation.navigate(Screens.faq);
  }, []);

  return (
    <ScreenView screenPaddings={true}>
      <BackButtonHeader title="О приложении" onBackButtonPress={navigation.goBack} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logo}>
          <LogoIcon />
        </View>
        <View style={styles.switchCards}>
          <SysPrefInfo
            Icon={BellIcon}
            title="Показывать уведомления"
            subtitle={''}
            linkText="Настройка уведомлений"
            onPress={openSysPref}
          />
          <SysPrefInfo
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
          <InfoCard title="Часто задаваемые вопросы" onPress={openFAQScreen} />
          <InfoCard title="Техническая поддержка" onPress={setSupportModal} />
          <InfoCard title="Политика конфиденциальности" onPress={setPrivacyPolicyModal} />
          <InfoCard title="Поделиться приложением" onPress={onShareApp} />
        </View>
      </ScrollView>
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        {modalName.current === 'privacyPolicy' ? (
          <InfoBageScroll
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

export default MoreScreen;

import React, { useCallback } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import Swiper from './Swiper.component';
import onboardingElementsLocal from '~screens/Onboarding/Onboarding.constants';
import { AppText, HeaderText } from '~components/shared/text';
import { BaseButton } from '~components/shared/buttons';
import SecButton from '~components/shared/buttons/Sec.button';
import { ScreenView } from '~components/view';
import onboardingPassedStorageItem from '~storage/onboardingPassed.storageItem';
import { appActions } from '~redux/reducers/app';
import { Screens } from '~constants/navigators.constants';
import styles from '~screens/Onboarding/Onboarding.styles';
import { selectOnboardingImages } from '~redux/selectors';
import { OnboardingScreenProps } from '~typedefs/screens/Onboarding';

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [bgImgIndex, setBgImgIndex] = React.useState(0);

  let onboardingElements = onboardingElementsLocal;
  const onboardingElementsServer = useSelector(selectOnboardingImages);
  if (onboardingElementsServer && onboardingElementsServer?.length > 0) {
    onboardingElements = onboardingElementsServer?.map(el => ({
      id: el.id.toString(),
      photo: { uri: el.photo, cache: 'force-cache' },
      background: { uri: undefined },
      title: el.title,
    }));
  }

  const setOnboardingPassed = useCallback(async () => {
    await onboardingPassedStorageItem.set(true);
    dispatch(appActions.setOnboardingPassed(true));
  }, [dispatch]);
  const signInHandler = () => {
    setOnboardingPassed();
    navigation.navigate(Screens.signIn);
  };
  const signUpHandler = () => {
    setOnboardingPassed();
    navigation.navigate(Screens.signUp);
  };

  const navigateToCatalog = () => {
    navigation.navigate(Screens.catalogUnAuth);
  };
  // const offsetX = React.useRef(0);
  return (
    <>
      {/*<ImageBackground source={onboardingElements[bgImgIndex].background}>*/}
      <View style={styles.swiper}>
        <Swiper
          showsPagination={true}
          style={styles.wrapper}
          showsButtons={false}
          loop={false}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          // @ts-ignore
          onIndexChanged={(index: number) => {
            setBgImgIndex(index);
          }}>
          {onboardingElements.map(item => {
            return (
              <View key={item.id} style={styles.slide}>
                <Image style={styles.image} source={item.photo} />
                <View style={styles.text}>
                  <HeaderText>{item.title}</HeaderText>
                </View>
              </View>
            );
          })}
        </Swiper>
      </View>
      {/*</ImageBackground>*/}
      <ScreenView fullArea style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.button}>
          <TouchableOpacity onPress={navigateToCatalog}>
            <AppText style={styles.infoSubtitle}>{'Посмотреть каталог'}</AppText>
          </TouchableOpacity>
          <BaseButton text="Войти" onPress={signInHandler} />
          <SecButton text="Зарегистрироваться" onPress={signUpHandler} />
        </View>
      </ScreenView>
    </>
  );
};

export default OnboardingScreen;

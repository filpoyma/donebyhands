import React from 'react';
import { Image, ImageBackground, Linking, View } from 'react-native';

import { ScreenView } from '~components/view';
import { HeaderText } from '~components/shared/text';
import SecButton from '~components/shared/buttons/Sec.button';
import EllipsShadowIcon from '~assets/icons/ellipseOrangeShadow.svg';
import styles from './NeedUpdate.styles';
import PlHolderText from '~components/shared/text/PlHolder.text';
import { appUrlAppStore, metricaLink } from '~constants/api.constants';
import { isIOS } from '~constants/platform.constants';
import { hp, wp } from '~utils/dimensions.utils';

const NeedUpdateScreen: React.FC = () => {
  return (
    <ScreenView bottomOnly screenPaddings={false}>
      <ImageBackground
        style={styles.titleImage}
        source={require('~assets/images/orangeGradient.png')}>
        <View style={{ alignItems: 'center', marginTop: 5 }}>
          <Image
            source={require('~assets/images/underConstruction.png')}
            style={{ height: hp(272), width: wp(272), margin: 10 }}
            resizeMode="contain"
          />
          <EllipsShadowIcon />
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <HeaderText>Устаревшая версия</HeaderText>
        <View style={{ width: 240 }}>
          <PlHolderText>Необходимо обновить приложение для дальнейшего использования</PlHolderText>
        </View>
      </View>
      <View style={styles.buttons}>
        <SecButton
          text={'Обновить'}
          onPress={() => {
            isIOS
              ? Linking.openURL(appUrlAppStore)
              : Linking.openURL(metricaLink).catch(err => {
                  console.warn('Error open metric link ', err);
                });
          }}
        />
      </View>
    </ScreenView>
  );
};

export default NeedUpdateScreen;

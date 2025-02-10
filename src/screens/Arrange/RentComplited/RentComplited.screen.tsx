import React from 'react';
import { Image, ImageBackground, View } from 'react-native';

import { ScreenView } from '~components/view';
import { HeaderText, TitleText } from '~components/shared/text';
import SecButton from '~components/shared/buttons/Sec.button';
import { Screens } from '~constants/navigators.constants';
import EllipsShadowIcon from '~assets/icons/ellipseGrShadow.svg';
import GemIcon from '~assets/icons/gem2.svg';
import WideBadgeSm from '~components/widgets/WideBadgeSm';
import { RentComplitedScreenProps } from '~typedefs/screens/RentComplited';
import styles from './RentComplited.styles';
import RentService from '~services/Rent.service';
import YaMetricaService from '~services/YandexMetrica.service';
import { errorHandlerSentry } from '~utils/errorHandlers.utils';
import { yaMetricaEvents } from '~constants/yaMetrica.constants';
import SentryService from '~services/Sentry.service';
import { useSelector } from 'react-redux';
import { selectUser } from '~redux/selectors';

const RentComplitedScreen: React.FC<RentComplitedScreenProps> = ({ navigation, route }) => {
  const { points, orderId } = route.params || {};
  const [isLoading, setIsLoading] = React.useState(true);
  const user = useSelector(selectUser);

  React.useEffect(() => {
    const maxRetries = 3;
    let attempt = 0;

    const sendMetricaWithRetry = () => {
      attempt += 1;

      RentService.getMerticaRentedTools(orderId)
        .then(metrica => {
          YaMetricaService.logInfo(yaMetricaEvents.rents, {
            totalCost: metrica.cost_with_extensions,
            costWithoutExtensions: metrica.cost_no_extensions,
            extensions: metrica.extensions.join(','),
            delays: metrica.delay.join(','),
          });
          SentryService.logInfo('Rent Completed', {
            userId: user?.id,
            totalCost: metrica.cost_with_extensions,
            costWithoutExtensions: metrica.cost_no_extensions,
            extensions: metrica.extensions.join(','),
            delays: metrica.delay.join(','),
          });
          setIsLoading(false);
        })
        .catch(e => {
          console.error(`sendMetrica error (attempt ${attempt}):`, e?.message);

          if (attempt < maxRetries) {
            setTimeout(sendMetricaWithRetry, 1000);
          } else {
            errorHandlerSentry('Send YaMetrica error', e, 'no'); // todo change to 'no'
            setIsLoading(false);
          }
        });
    };

    sendMetricaWithRetry();
  }, [orderId]);

  return (
    <ScreenView bottomOnly screenPaddings={false}>
      <ImageBackground
        style={styles.titleImage}
        source={require('~assets/images/greenGradient.png')}>
        <View>
          <Image source={require('~assets/images/checkGreen.png')} />
          <EllipsShadowIcon />
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <HeaderText>Спасибо за аренду</HeaderText>
        <TitleText>Вам начислено</TitleText>
        <WideBadgeSm bigger Icon={GemIcon} text={`${points ? points : 0} баллов`} />
      </View>
      <View style={styles.buttons}>
        <SecButton
          text={isLoading ? 'Завершаем аренду...' : 'На главную'}
          onPress={() => {
            navigation.navigate(Screens.tabNavigator, { screen: Screens.mainPage });
          }}
          disabled={isLoading}
        />
      </View>
    </ScreenView>
  );
};

export default RentComplitedScreen;

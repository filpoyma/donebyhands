import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import BootSplash from 'react-native-bootsplash';
import MainNavigator from './Main.navigator';

import AppService from '~services/App.service';
import InAppMessageService from '~services/InAppMessage.service';
import { defaultScreenOptions, Screens } from '~constants/navigators.constants';
import OnboardingScreen from '~screens/Onboarding';
import {
  selectIsNewVersionAvailable,
  selectIsOnboardingPassed,
  selectLoginInfo,
} from '~redux/selectors';
import LoginScreen from '~screens/Auth/Login';
import OTPConfirmationScreen from '~screens/Auth/otpConfirmation';
import PersonalDataPhotoScreen from '~screens/Auth/PersonalDataPhoto';
import PersonalDataScreen from '~screens/Auth/PersonalData';
import RegInfoScreen from '~screens/Auth/RegInfo';
import SentryService from '~services/Sentry.service';
import CatalogPreviewScreen from '~screens/Auth/Preview/CatalogPreview';
import NeedUpdateScreen from '~screens/NeedUpdate';
import { errorHandler } from '~utils/errorHandlers.utils';
import { isProd } from '~constants/platform.constants';
import ToolsPagePreviewScreen from '~screens/Auth/Preview/ToolsPreview/ToolsPagePreview.screen';
import ToolsPdfScreen from '~screens/Arrange/ToolsPdf';
import ArrangeRentalPreviewScreen from '~screens/Auth/Preview/ArrangeRentalPreview';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  const isOnboardingPassed = useSelector(selectIsOnboardingPassed);
  const isLoggedIn = useSelector(selectLoginInfo);
  const isNewVersionAvailable = useSelector(selectIsNewVersionAvailable);

  React.useEffect(() => {
    AppService.initialize()
      .finally(() => {
        BootSplash.hide({ fade: true }).catch(console.error);
      })
      .catch(e => {
        isProd
          ? InAppMessageService.danger('Ошибка при запуске приложения')
          : errorHandler('Ошибка при запуске:', e);
        SentryService.logError('App startup error', e?.message);
        console.error('Err while app loading:', e?.message);
      });
  }, []);

  if (isOnboardingPassed === null) return null;

  if (isNewVersionAvailable) return <NeedUpdateScreen />;

  if (isLoggedIn) return <MainNavigator />;

  return (
    <AppStack.Navigator
      screenOptions={defaultScreenOptions}
      initialRouteName={isOnboardingPassed ? Screens.signIn : Screens.onboarding}>
      <AppStack.Screen name={Screens.onboarding} component={OnboardingScreen} />
      <AppStack.Screen name={Screens.signIn} component={LoginScreen} />
      <AppStack.Screen name={Screens.signUp} component={LoginScreen} />
      <AppStack.Screen name={Screens.regInfo} component={RegInfoScreen} />
      <AppStack.Screen name={Screens.otpConfirmation} component={OTPConfirmationScreen} />
      <AppStack.Screen
        name={Screens.personalDataPhotoPassport}
        component={PersonalDataPhotoScreen}
      />
      <AppStack.Screen name={Screens.personalDataPhotoSelfie} component={PersonalDataPhotoScreen} />
      <AppStack.Screen name={Screens.personalData} component={PersonalDataScreen} />
      <AppStack.Screen name={Screens.catalogUnAuth} component={CatalogPreviewScreen} />
      <AppStack.Screen name={Screens.toolsPreview} component={ToolsPagePreviewScreen} />
      <AppStack.Screen name={Screens.pdfViewer} component={ToolsPdfScreen} />
      <AppStack.Screen name={Screens.arrangeRentalPreview} component={ArrangeRentalPreviewScreen} />
    </AppStack.Navigator>
  );
};

export default AppNavigator;

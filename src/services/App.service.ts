import OnboardingService from '~services/Onboarding.service';
import AuthService from '~services/Auth.service';
import OneSignalService from '~services/OneSignal.service';
import appApi from '~api/app.api';
import store from '~redux/store';
import { appActions } from '~redux/reducers/app';
import AppUpdateService from '~services/AppUpdate.service';
import YaMetricaService from '~services/YandexMetrica.service';
import LogService from '~services/Log.service';

const AppService = {
  async initialize() {
    LogService.initialize();
    await this.getAppSettings();
    YaMetricaService.initialize();
    await AuthService.initialize();
    await OnboardingService.initialize();
    OneSignalService.initialize();
    await AuthService.login(); //this runs after signUp and signIn also...
    await AppUpdateService.checkForUpdate();
  },

  async getAppSettings() {
    const data = await appApi.getSettings();
    if (data) store.dispatch(appActions.setGeneralSettings(data));
  },
};

export default AppService;

import AppMetrica, { AppMetricaConfig } from '@appmetrica/react-native-analytics';
import store from '~redux/store';
import { isLocalDev } from '~constants/platform.constants';

const YaMetricaService = {
  initialize() {
    const appVersion = store.getState().app.generalSettings?.app_version || 'unknown';
    const config: AppMetricaConfig = {
      apiKey: process.env.YANDEX_METRIKA_KEY,
      firstActivationAsUpdate: false,
      logs: true,
      sessionTimeout: 30,
      appVersion: appVersion,
      crashReporting: true,
    };
    AppMetrica.activate(config);
  },

  logInfo(message: string, extras?: Record<string, unknown>) {
    if (isLocalDev) return;
    const userId = store.getState().auth.user?.id || 'no_id';
    AppMetrica.reportEvent(message, {
      profileId: { [userId]: extras || 'Не_определено' },
    });
  },

  logError(identifier: string, message: string, reason?: Record<string, unknown>) {
    if (isLocalDev) return;
    AppMetrica.reportError(identifier, message, reason);
  },

  setUserID(userId: number) {
    AppMetrica.setUserProfileID(`${userId}`);
  },
};

export default YaMetricaService;

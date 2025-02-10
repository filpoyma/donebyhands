import * as Sentry from '@sentry/react-native';
import { isLocalDev } from '~constants/platform.constants';

const SentryService = {
  initialize() {
    Sentry.init({
      dsn: isLocalDev ? undefined : process.env.SENTRY_DSN,
      environment: process.env.ENVIRONMENT,
    });
  },

  logInfo(message: string, extras: Record<string, unknown>) {
    if (isLocalDev) return;
    Sentry.withScope(scope => {
      scope.setLevel('info');
      scope.setTransactionName(message);
      if (extras) scope.setExtras(extras);
      Sentry.captureMessage('Info');
    });
  },

  logError(message: string, extras?: Record<string, unknown>) {
    if (isLocalDev) return;
    Sentry.withScope(scope => {
      if (extras) scope.setExtras(extras);
      Sentry.captureMessage(message, 'error');
    });
  },

  setUser(userId: number) {
    Sentry.setUser({ id: `${userId}` });
  },

  removeUser() {
    Sentry.setUser(null);
  },
};

export default SentryService;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL_DEV: string;
      API_URL_PROD: string;
      ONESIGNAL_APP_ID: string;
      SENTRY_DSN: string;
      YANDEX_MAPS_API_KEY: string;
      YANDEX_METRIKA_KEY: string;
      GEOIP: string;
      ENVIRONMENT: 'DEVELOPMENT' | 'PRODUCTION';
    }
    //export default ProcessEnv;
  }
}

export {};

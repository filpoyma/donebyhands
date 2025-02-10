declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module 'react-native-config' {
  interface IConfig {
    API_URL_DEV: string;
    API_URL_PROD: string;
    APP_METRICA_API_KEY: string;
    YANDEX_MAPS_API_KEY: string;
    YANDEX_METRIKA_KEY: string;
    CLOUD_PAYMENTS_PUBLIC_ID: string;
    ONESIGNAL_APP_ID: string;
    SENTRY_DSN: string;
    ENVIRONMENT: 'DEVELOPMENT' | 'PRODUCTION';
  }

  const Config: IConfig;
  export default Config;
}

type PreloadInfo = {
  trackingId: string;
  additionalInfo?: Object;
};

type Location = {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  course?: number;
  speed?: number;
  timestamp?: number;
};

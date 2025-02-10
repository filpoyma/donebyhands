import { AppRegistry } from 'react-native';
import { Text, TextInput } from 'react-native';

import { name as appName } from './app.json';
import SentryService from './src/services/Sentry.service';
import MapService from './src/services/Map.service';
import App from './src/App';

MapService.initialize();
SentryService.initialize();

// prevent text scaling on ios
if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
}

AppRegistry.registerComponent(appName, () => App);

import React from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.locale('ru');
dayjs.extend(duration);
dayjs.extend(customParseFormat);

import AppNavigator from '~navigation/App.navigator';
import OverlayDim from '~components/modal/OverlayDim';
import store from '~redux/store';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <Provider store={store}>
          <OverlayDim />
          <View style={styles.container}>
            <StatusBar
              barStyle={'dark-content'}
              backgroundColor={'transparent'}
              translucent={true}
            />
            <AppNavigator />
          </View>
        </Provider>
      </NavigationContainer>
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;

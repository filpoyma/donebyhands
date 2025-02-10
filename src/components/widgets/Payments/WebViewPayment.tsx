import { Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';
import React from 'react';

const WebViewPayment = ({
  paymentUrl,
  catchRedirectedUrl,
}: {
  paymentUrl: string;
  catchRedirectedUrl: any;
}) => {
  const { height, width } = Dimensions.get('window');

  if (!paymentUrl) return null;
  return (
    <View style={{ width, height }}>
      <WebView
        source={{ uri: paymentUrl }}
        onNavigationStateChange={catchRedirectedUrl}
        onError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
        }}
        onHttpError={syntheticEvent => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView received error status code: ', nativeEvent.statusCode);
        }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
      />
    </View>
  );
};

export default React.memo(WebViewPayment);

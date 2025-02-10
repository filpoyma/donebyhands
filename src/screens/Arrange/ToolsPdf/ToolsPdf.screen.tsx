import React from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';

import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import styles from './ToolsPage.styles';
import { ToolsPdfPageScreenProps } from '~typedefs/screens/ToolsPdf';
import InAppMessageService from '~services/InAppMessage.service';
import { errorHandler } from '~utils/errorHandlers.utils';
import { HTTPError } from 'ky';
import { isProd } from '~constants/platform.constants';

const ToolsPdfScreen: React.FC<ToolsPdfPageScreenProps> = ({ navigation, route }) => {
  const { pdfUri } = route.params;
  const source = { uri: pdfUri, cache: true };

  return (
    <ScreenView fullArea screenPaddings={true}>
      <BackButtonHeader onBackButtonPress={navigation.goBack} />
      <View style={styles.container}>
        <Pdf
          trustAllCerts={false}
          source={source}
          spacing={25}
          onError={error => {
            isProd
              ? InAppMessageService.danger('Невозможно открыть инструкцию')
              : errorHandler('PDF read err:', error as HTTPError);
          }}
          style={styles.pdf}
        />
      </View>
    </ScreenView>
  );
};

export default ToolsPdfScreen;

import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { Colors } from '~constants/colors.constants';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import { IScreenViewProps } from '~components/view/interfaces';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  screenPaddings: {
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    // paddingVertical: SCREEN_PADDINGS.vertical,
    paddingBottom: SCREEN_PADDINGS.vertical - 8,
  },
});

const ScreenView: React.FC<IScreenViewProps> = ({
  backgroundColor = Colors.white,
  style,
  screenPaddings = true,
  fullArea = false,
  bottomOnly = false,
  ...props
}) => {
  const screenViewStyles = useMemo(
    () =>
      StyleSheet.flatten([
        styles.screenView,
        screenPaddings ? styles.screenPaddings : undefined,
        { backgroundColor },
        style,
      ]),
    [backgroundColor, screenPaddings, style],
  );

  return (
    <SafeAreaView
      edges={
        fullArea
          ? ['top', 'left', 'right', 'bottom']
          : bottomOnly
          ? ['bottom']
          : ['top', 'left', 'right']
      }
      style={screenViewStyles}
      {...props}>
      {props.children}
    </SafeAreaView>
  );
};

export default ScreenView;

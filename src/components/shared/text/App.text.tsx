import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { Colors } from '~/constants/colors.constants';

interface IProps extends TextProps {
  color?: Colors;
}

const AppText: React.FC<IProps> = ({ style, color = Colors.black, ...props }) => (
  <Text {...props} style={StyleSheet.flatten([styles.appText, { color }, style])} />
);

const styles = StyleSheet.create({
  appText: {
    fontFamily: 'Inter-Medium',
  },
});

export default React.memo(AppText);

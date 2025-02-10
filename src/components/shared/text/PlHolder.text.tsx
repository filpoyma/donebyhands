import React from 'react';
import { StyleSheet, TextProps } from 'react-native';

import { AppText } from './';
import { Colors } from '~constants/colors.constants';

interface IProps extends TextProps {
  color?: Colors;
}

const PlHolderText: React.FC<IProps> = ({ style, color, ...props }) => (
  <AppText style={[styles.title, style, color ? { color } : {}]} {...props} />
);

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Inter-Medium',
    color: Colors.weak,
    textAlign: 'center',
  },
});

export default PlHolderText;

import React from 'react';
import { StyleSheet, TextProps, Text } from 'react-native';

import { Colors } from '~constants/colors.constants';

interface IProps extends TextProps {}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    lineHeight: 27,
    fontFamily: 'Inter-Regular',
    color: Colors.black,
  },
});

const Title: React.FC<IProps> = props => <Text {...props} style={styles.title} />;

export default Title;

//text
// color: var(--Text, #111827);
// font-family: Inter;
// font-size: 14px;
// font-style: normal;
// font-weight: 400;
// line-height: 150%;

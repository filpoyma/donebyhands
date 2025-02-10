import React, { useMemo } from 'react';
import { StyleSheet, TextProps, TextStyle, Text } from 'react-native';

import { Colors } from '~constants/colors.constants';
import { hp, ms } from '~utils/dimensions.utils';

export type THeaderSizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

interface IProps extends TextProps {
  size?: THeaderSizes;
  color?: Colors;
  centered?: boolean;
}

const sizeStyles = StyleSheet.create({
  h1: {
    fontSize: ms(24),
    lineHeight: hp(36),
    fontFamily: 'Inter-Bold',
  },
  h2: {
    fontSize: ms(18),
    lineHeight: hp(27),
    fontFamily: 'Inter-Bold',
  },
  h3: {
    fontSize: ms(16),
    lineHeight: hp(24),
    fontFamily: 'Inter-Bold',
  },
  h4: {
    fontSize: ms(14),
    lineHeight: hp(21),
    fontFamily: 'Inter-Bold',
  },
  h5: {
    fontSize: ms(12),
    lineHeight: hp(16),
    fontFamily: 'Inter-Bold',
  },
});

const HeaderText: React.FC<IProps> = ({
  color = Colors.black,
  style,
  size = 'h1',
  centered = true,
  ...props
}) => {
  const styles = useMemo(
    () =>
      StyleSheet.flatten([
        sizeStyles[size],
        {
          color,
          textAlign: (centered ? 'center' : 'left') as TextStyle['textAlign'],
        },
        style,
      ]),
    [centered, color, size, style],
  );

  return <Text style={styles} {...props} />;
};

export default React.memo(HeaderText);

/* h1 -  h2 в фигме */
// font-family: Inter;
// font-size: 24px;
// font-style: normal;
// font-weight: 700;
// line-height: 150%; /* 36px */
// letter-spacing: -0.2px;

// h2
// color: var(--Text, #111827);
// font-family: Inter;
// font-size: 18px;
// font-style: normal;
// font-weight: 700;
// line-height: 150%; /* 27px */

// h3 header component
// color: var(--Text, #111827);
// text-align: center;
// font-family: Inter;
// font-size: 16px;
// font-style: normal;
// font-weight: 700;
// line-height: 150%; /* 24px */

//h4 заголовок товара
// color: var(--Text, #111827);
// font-family: Inter;
// font-size: 14px;
// font-style: normal;
// font-weight: 700;
// line-height: 150%; /* 21px */

//h5 заголовок товара
// сolor: var(--Text, #111827);
// font-family: Inter;
// font-size: 12px;
// font-style: normal;
// font-weight: 700;
// line-height: 140%; /* 16.031px */

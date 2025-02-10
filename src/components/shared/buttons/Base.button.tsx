import React, { useMemo } from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';

import { Colors } from '~constants/colors.constants';
import { AppText } from '~components/shared/text';
import { Row } from '~components/view';
import { TButtonSizes } from '~constants/buttons.constants';
import { TSvgComponent } from '~typedefs/common';
import { hp, ms, wp } from '~utils/dimensions.utils';

export interface IBaseButtonProps extends TouchableOpacityProps {
  backgroundColor?: Colors;
  textColor?: Colors;
  size?: TButtonSizes;
  text?: string;
  IconLeft?: TSvgComponent;
}

const BaseButton: React.FC<IBaseButtonProps> = ({
  backgroundColor = Colors.red,
  textColor = Colors.white,
  size = 'L',
  style,
  text,
  disabled,
  IconLeft,
  ...props
}) => {
  const baseButtonStyles = useMemo(
    () =>
      StyleSheet.flatten([
        buttonStyles.button,
        baseButtonSizes[size],
        backgroundColor && { backgroundColor },
        disabled && buttonStyles.disabled,
        !disabled &&
          backgroundColor !== Colors.transparent &&
          StyleSheet.flatten([
            buttonStyles.shadow,
            { shadowColor: backgroundColor ?? Colors.grey },
          ]),
        style,
      ]),
    [backgroundColor, disabled, size, style],
  );
  const baseButtonTextStyles = useMemo(
    () =>
      StyleSheet.flatten([
        buttonStyles.text,
        baseButtonTextSizes[size],
        textColor ? { color: textColor } : undefined,
      ]),
    [size, textColor],
  );
  return (
    <TouchableOpacity style={baseButtonStyles} disabled={disabled} {...props}>
      <Row alignedCenter>
        {IconLeft && <IconLeft style={buttonStyles.iconLeft} />}
        {text && <AppText style={baseButtonTextStyles}>{text}</AppText>}
      </Row>
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    zIndex: 1,
  },
  text: {},
  disabled: {
    opacity: 0.5,
  },
  iconLeft: {
    marginRight: wp(4),
  },
  shadow: {
    // shadowOffset: {
    //   width: 0,
    //   height: hp(10),
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: hp(10),
    //
    // elevation: 4,
  },
});

const baseButtonSizes = StyleSheet.create({
  M: {
    height: hp(40),
  },
  L: {
    height: hp(56),
  },
});

const baseButtonTextSizes = StyleSheet.create({
  M: {
    fontSize: ms(14),
    lineHeight: hp(21),
    fontFamily: 'Inter-Bold',
  },
  L: {
    fontSize: ms(16),
    lineHeight: hp(24),
    fontFamily: 'Inter-Medium',
  },
});

export default BaseButton;

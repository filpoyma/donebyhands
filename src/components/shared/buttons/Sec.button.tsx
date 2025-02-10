import React from 'react';
import { Colors } from '~constants/colors.constants';
import BaseButton from '~components/shared/buttons/Base.button';
import { TSvgComponent } from '~typedefs/common';
import { TouchableOpacityProps } from 'react-native';
import { TButtonSizes } from '~constants/buttons.constants';

export interface ISecButtonProps extends TouchableOpacityProps {
  backgroundColor?: Colors;
  textColor?: Colors;
  size?: TButtonSizes;
  text?: string;
  IconLeft?: TSvgComponent;
}

const SecButton: React.FC<ISecButtonProps> = props => {
  return (
    <BaseButton
      backgroundColor={Colors.white}
      textColor={Colors.red}
      style={{ borderWidth: 1, borderColor: Colors.red }}
      {...props}
    />
  );
};

export default SecButton;

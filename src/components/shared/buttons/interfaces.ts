import { TouchableOpacityProps, ViewStyle } from 'react-native';
import { TSvgComponent } from '~typedefs/common';
import { Colors } from '~constants/colors.constants';

export interface IIconButtonProps extends TouchableOpacityProps {
  iconStyle?: ViewStyle;
  Icon: TSvgComponent;
  size?: number;
  color?: Colors;
  backgroundColor?: Colors;
  containerType?: 'rounded' | 'default';
  colorAttribute?: 'fill' | 'stroke';
  hasShadow?: boolean;
  containerSize?: number;
  onPress?: () => void;
}

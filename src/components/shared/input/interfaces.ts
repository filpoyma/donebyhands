import { TextInputProps } from 'react-native';
import { TSvgComponent } from '~typedefs/common';

export interface ITextInputComponentProps extends TextInputProps {
  value: string;
  onChangeTextNamed: (event: string, value: string) => void;
  name: string;
  label?: string;
  labelBottom?: string;
  labelError?: string;
  hideBottomLabel?: boolean;
  LeftIcon?: TSvgComponent;
  leftIconSize?: number;
  RightIcon?: TSvgComponent;
  rightIconSize?: number;
}

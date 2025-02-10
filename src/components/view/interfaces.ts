import { ViewProps } from 'react-native';

import { Colors } from '~constants/colors.constants';

export interface IScreenViewProps extends ViewProps {
  screenPaddings?: boolean;
  backgroundColor?: Colors;
  fullArea?: boolean;
  bottomOnly?: boolean;
}

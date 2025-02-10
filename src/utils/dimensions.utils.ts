import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

import { DESIGN_DIMENSIONS } from '~constants/dimensions.constants';
import { IResponsiveHelper, TDeviceDimensions } from '~typedefs/utils/dimensions.utils';

function createResponsiveHelper(): IResponsiveHelper {
  const { width, height }: TDeviceDimensions = DESIGN_DIMENSIONS;
  const hp = (elHeight: number): number => heightPercentageToDP((elHeight * 97) / height);
  const wp = (elWidth: number): number => widthPercentageToDP((elWidth * 97) / width);
  const ms = (size: number, factor = 0.5): number => size + (wp(size) - size) * factor;
  return { hp, wp, ms };
}

export const { hp, wp, ms }: IResponsiveHelper = createResponsiveHelper();
// ms for fontsize and borderradius

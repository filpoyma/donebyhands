import React, { useMemo } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Colors } from '~constants/colors.constants';

import { IIconButtonProps } from '~components/shared/buttons/interfaces';

const IconButton: React.FC<IIconButtonProps> = ({
  iconStyle,
  onPress,
  size = 32,
  Icon,
  color = Colors.white,
  backgroundColor = Colors.grey,
  containerType,
  containerSize = size * 1.8333,
  colorAttribute = 'fill',
  hasShadow = false,
  ...props
}) => {
  const iconSize = size;
  const containerStyles: TouchableOpacityProps['style'] = useMemo(() => {
    if (!containerType) {
      return undefined;
    }
    const borderRadius = containerType === 'rounded' ? containerSize / 2 : containerSize / 4;
    const shadowStyles = hasShadow
      ? {
          shadowColor: Colors.grey,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 5,

          elevation: 4,
        }
      : {};
    return {
      width: containerSize,
      height: containerSize,
      backgroundColor,
      borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      ...shadowStyles,
    };
  }, [backgroundColor, containerType, hasShadow, containerSize]);

  const iconProps = useMemo(() => {
    return {
      width: iconSize,
      height: iconSize,
      [colorAttribute]: color,
      style: iconStyle,
    };
  }, [color, colorAttribute, iconSize, iconStyle]);

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <Icon {...iconProps} />
      {props.children}
    </TouchableOpacity>
  );
};

export default React.memo(IconButton);

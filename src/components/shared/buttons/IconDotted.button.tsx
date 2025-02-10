import React from 'react';
import { IconButton } from './';
import DotSmall from '~assets/icons/dotSm.svg';
import { View } from 'react-native';
import { TSvgComponent } from '~typedefs/common';

const IconDottedButton = ({
  Icon,
  size,
  hideDot,
  onPress,
}: {
  Icon: TSvgComponent;
  size: number;
  hideDot?: boolean;
  onPress: () => void;
}) => {
  return (
    <IconButton Icon={Icon} size={size} containerType={'default'} onPress={onPress}>
      {!hideDot && (
        <View style={{ position: 'absolute', top: 10, right: 10 }}>
          <DotSmall />
        </View>
      )}
    </IconButton>
  );
};

export default IconDottedButton;

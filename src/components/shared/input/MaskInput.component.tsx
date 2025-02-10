import React from 'react';
import { StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import RNMaskInput, { MaskInputProps } from 'react-native-mask-input';

import { Row } from '~components/view';
import { AppText } from '~components/shared/text';
import { Colors } from '~constants/colors.constants';
import { isIOS } from '~constants/platform.constants';
import { TSvgComponent } from '~typedefs/common';
import { hp, ms, wp } from '~utils/dimensions.utils';

interface IProps extends MaskInputProps {
  containerStyles?: ViewStyle;
  minValueLength?: number;
  label?: string;
  LeftIcon?: TSvgComponent;
  onClosePress?(): void;
}

const MaskInput = React.forwardRef<TextInput, IProps>(
  ({ label, containerStyles, value, style, LeftIcon, ...props }, ref) => {
    const memoizedContainerStyles = React.useMemo(
      () => [styles.container, containerStyles],
      [containerStyles],
    );
    const inputStyles = React.useMemo(() => [styles.maskInput, style], [style]);
    const labelStyles = React.useMemo(() => (!label ? undefined : styles.label), [label]);

    return (
      <View>
        {label && <AppText style={labelStyles}>{label}</AppText>}
        <View style={memoizedContainerStyles}>
          <Row spaceBetween alignedCenter>
            {LeftIcon && <LeftIcon style={styles.leftIcon} />}
            <RNMaskInput style={inputStyles} value={value} {...props} ref={ref} />
          </Row>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: hp(56),
    paddingHorizontal: wp(16),
    paddingVertical: isIOS ? hp(8) : 0,
    backgroundColor: Colors.grey,
    borderRadius: ms(15),
    justifyContent: 'center',
  },
  maskInput: {
    flex: 1,
    fontSize: ms(14),
    // lineHeight: hp(21),
    fontFamily: 'Inter-Medium',
    color: Colors.black,
  },
  label: {
    fontSize: ms(14),
    lineHeight: hp(21),
    color: Colors.weak,
    marginBottom: hp(8),
    fontFamily: 'Inter-SemiBold',
  },
  leftIcon: {
    marginRight: wp(12),
  },
});

export default MaskInput;

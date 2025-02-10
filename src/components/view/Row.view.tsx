import React, { useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { isIOS } from '~constants/platform.constants';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

export interface IRowProps extends ViewProps {
  alignedCenter?: boolean;
  alignedEnd?: boolean;
  spaceBetween?: boolean;
  screenHorizontalPaddings?: boolean;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  alignedCenter: {
    alignItems: 'center',
  },
  alignedEnd: {
    alignItems: 'flex-end',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  screenHorizontalPaddings: {
    paddingHorizontal: isIOS ? SCREEN_PADDINGS.horizontal : 0,
  },
});

const RowView: React.FC<IRowProps> = ({
  alignedCenter,
  spaceBetween,
  screenHorizontalPaddings,
  style,
  alignedEnd,
  ...props
}) => {
  const rowStyles = useMemo(
    () =>
      StyleSheet.flatten([
        styles.row,
        alignedCenter && styles.alignedCenter,
        alignedEnd && styles.alignedEnd,
        spaceBetween && styles.spaceBetween,
        screenHorizontalPaddings && styles.screenHorizontalPaddings,
        style,
      ]),
    [alignedCenter, alignedEnd, screenHorizontalPaddings, spaceBetween, style],
  );

  return <View style={rowStyles} {...props} />;
};

export default RowView;

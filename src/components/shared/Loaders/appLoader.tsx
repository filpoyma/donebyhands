import { ActivityIndicator } from 'react-native';
import { Colors } from '~constants/colors.constants';
import React from 'react';

const renderLoading = (
  isLoading: boolean,
  color = Colors.red,
  size: number | 'small' | 'large' = 'large',
) =>
  isLoading ? (
    <ActivityIndicator
      size={size}
      color={color}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }}
    />
  ) : null;

export default renderLoading;

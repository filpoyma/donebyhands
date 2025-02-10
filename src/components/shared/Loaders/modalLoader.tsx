import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Colors } from '~constants/colors.constants';
import React from 'react';

const renderModalLoading = (isLoading: boolean) =>
  isLoading ? (
    <TouchableOpacity
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: '55%',
      }}>
      <ActivityIndicator size="large" color={Colors.red} />
    </TouchableOpacity>
  ) : null;

export default renderModalLoading;

import React from 'react';
import { View } from 'react-native';
import { Colors } from '~constants/colors.constants';

const GapH = ({ value = 24 }: { value: number }) => <View style={{ width: value }} />;
const GapH24 = () => <GapH value={24} />;
const GapH48 = () => <GapH value={48} />;
const GapH16 = () => <GapH value={16} />;
const GapH7 = () => <GapH value={7} />;
const GapV = ({ value = 24 }: { value: number }) => <View style={{ height: value }} />;
const GapV24 = () => <GapV value={24} />;
const GapV16 = () => <GapV value={16} />;
const GapV10 = () => <GapV value={10} />;
const HorizontalSeparator = () => (
  <View style={{ height: 1, backgroundColor: Colors.grey, marginHorizontal: 24 }} />
);

export { GapH24, GapH16, GapH7, GapH48, HorizontalSeparator, GapV16, GapV24, GapV10 };

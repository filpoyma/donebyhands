import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TSvgComponent } from '~typedefs/common';
import { Colors } from '~constants/colors.constants';
import ImagIcon from '~components/shared/ImagIcon';

const TextWithIcon = ({
  Icon,
  text,
  onPress,
  textStyle = {},
}: {
  Icon: TSvgComponent;
  text: string;
  onPress?: () => void;
  textStyle?: object;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <ImagIcon Icon={Icon} />
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
  },
  text: {
    color: Colors.black,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    paddingVertical: 10,
  },
});

export default TextWithIcon;

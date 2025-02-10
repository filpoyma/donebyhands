import React from 'react';
import { Row } from '~components/view';
import { StyleSheet } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { AppText } from '~components/shared/text';
import { TSvgComponent } from '~typedefs/common';
import { hp, ms, wp } from '~utils/dimensions.utils';

const WideBadgeSm = ({
  Icon,
  text,
  bigger = false,
  twoRows = false,
}: {
  Icon: TSvgComponent;
  text?: string | number;
  bigger?: boolean;
  twoRows?: boolean;
}) => {
  return (
    <Row style={bigger ? stylesB.container : styles.container}>
      <Icon />
      <AppText style={bigger ? stylesB.text : twoRows ? styles.textTiny : styles.text}>
        {text}
      </AppText>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hp(5),
    paddingVertical: wp(3),
    backgroundColor: Colors.red,
    borderRadius: ms(8),
    gap: wp(3),
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: ms(12),
    fontFamily: 'Inter-Medium',
    lineHeight: hp(17),
  },
  textTiny: {
    color: Colors.white,
    fontSize: ms(12),
    fontFamily: 'Inter-Medium',
    lineHeight: hp(17),
  },
});

const stylesB = StyleSheet.create({
  container: {
    paddingHorizontal: hp(6),
    paddingVertical: wp(4),
    backgroundColor: Colors.red,
    borderRadius: ms(8),
    gap: wp(4),
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: ms(13),
    fontFamily: 'Inter-Medium',
    lineHeight: hp(20),
  },
});

export default WideBadgeSm;

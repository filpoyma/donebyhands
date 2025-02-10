import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { AppText } from '~components/shared/text';
import { Row } from '~components/view';
import { hp, ms, wp } from '~utils/dimensions.utils';
import GemIcon from '~assets/icons/gem2.svg';
import WideBadgeSm from '~components/widgets/WideBadgeSm';

const InfoCardBalance = ({
  points = '0',
  onPress,
}: {
  points?: string | number;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <Row style={styles.container}>
        <Row style={styles.title}>
          <AppText style={styles.text}>Ваш баланс</AppText>
          <WideBadgeSm bigger Icon={GemIcon} text={points + ' баллов'} />
        </Row>
        {/*<ClockIcon />*/}
      </Row>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    height: hp(64),
    paddingVertical: hp(16),
    paddingHorizontal: wp(16),
    borderRadius: ms(16),
    borderWidth: 1,
    borderColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    alignItems: 'center',
    gap: wp(8),
  },
  text: {
    fontSize: ms(15),
    lineHeight: hp(22),
    fontFamily: 'Inter-Medium',
  },
});
export default React.memo(InfoCardBalance);

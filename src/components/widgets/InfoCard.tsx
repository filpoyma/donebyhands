import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { HeaderText } from '~components/shared/text';
import { Row } from '~components/view';
import ChevronIcon from '~assets/icons/chevronRight.svg';
import { hp, ms, wp } from '~utils/dimensions.utils';
import HourglassIcon from '~assets/icons/hourglass.svg';
import WideBadgeSm from '~components/widgets/WideBadgeSm';

const InfoCard = ({
  title,
  onPress,
  withBage = false,
  badgeText = '',
}: {
  title: string;
  onPress: () => void;
  withBage?: boolean;
  badgeText?: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <Row style={styles.container}>
        <Row style={styles.text}>
          <HeaderText centered={false} size="h4">
            {title}
          </HeaderText>
          {withBage && <WideBadgeSm Icon={HourglassIcon} text={badgeText} />}
        </Row>
        <ChevronIcon />
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
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    gap: hp(8),
    alignItems: 'center',
  },
});
export default React.memo(InfoCard);

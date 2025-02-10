import React from 'react';
import { Row } from '~components/view';

import { Colors } from '~constants/colors.constants';
import { StyleSheet, View } from 'react-native';
import { TSvgComponent } from '~typedefs/common';
import { hp, ms, wp } from '~utils/dimensions.utils';
import { AppText } from '~components/shared/text';

const SysPrefInfo = ({
  Icon,
  title,
  subtitle,
  linkText,
  onPress,
}: {
  Icon: TSvgComponent;
  title: string;
  subtitle?: string;
  linkText: string;
  onPress?: () => void;
}) => {
  return (
    <Row spaceBetween>
      <Row style={styles.container}>
        <View style={styles.icon}>
          <Icon width={24} height={24} fill={Colors.weak} />
        </View>
        <View style={styles.titleStyle}>
          <AppText style={styles.title}>{title}</AppText>
          {!!subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}
          <AppText style={styles.link} onPress={onPress}>
            {linkText}
          </AppText>
        </View>
      </Row>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  icon: {
    height: 48,
    width: 48,
    borderRadius: 12,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingLeft: wp(10),
    gap: 2,
    width: '80%',
  },
  title: {
    fontFamily: 'NotoSans-Bold',
    fontSize: ms(12),
    lineHeight: hp(18),
  },
  link: {
    color: Colors.red,
    fontSize: ms(11),
    fontFamily: 'NotoSans-Bold',
    lineHeight: hp(15),
  },
  subtitle: {
    color: Colors.weak,
    fontSize: ms(11),
    fontFamily: 'NotoSans-Regular',
    lineHeight: hp(13),
  },
});

export default React.memo(SysPrefInfo);

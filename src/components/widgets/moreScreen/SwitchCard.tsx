import React from 'react';
import { Row } from '~components/view';

import { Colors } from '~constants/colors.constants';
import { StyleSheet, View } from 'react-native';
import ToggleSwitch from '~components/shared/ToggleSwitch';
import { TSvgComponent } from '~typedefs/common';
import { hp, ms, wp } from '~utils/dimensions.utils';
import { AppText } from '~components/shared/text';

const SwitchCard = ({
  isEnabled,
  setIsEnabled,
  Icon,
  title,
  subtitle,
  disabled = false,
  onTogleSwitch,
}: {
  isEnabled: boolean | null;
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean | null>>;
  Icon: TSvgComponent;
  title: string;
  subtitle: string;
  disabled?: boolean;
  onTogleSwitch?: (toggleState: boolean) => void;
}) => {
  return (
    <Row spaceBetween>
      <Row style={styles.container}>
        <View style={styles.icon}>
          <Icon width={24} height={24} fill={Colors.weak} />
        </View>
        <View style={styles.titleStyle}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subtitle}>{subtitle}</AppText>
        </View>
      </Row>
      <ToggleSwitch
        isEnabled={isEnabled}
        setIsEnabled={setIsEnabled}
        onClickDisabled={disabled}
        onTogleSwitch={onTogleSwitch}
      />
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
    justifyContent: 'center',
    paddingLeft: wp(10),
    gap: 4,
  },
  title: {
    fontFamily: 'NotoSans-Bold',
    fontSize: ms(12),
    lineHeight: hp(18),
  },
  subtitle: {
    color: Colors.weak,
    fontSize: ms(11),
    fontFamily: 'NotoSans-Regular',
    lineHeight: hp(15),
  },
});

export default React.memo(SwitchCard);

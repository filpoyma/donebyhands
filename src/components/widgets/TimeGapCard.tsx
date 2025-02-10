import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { AppText, HeaderText } from '~components/shared/text';
import RowView from '~components/view/Row.view';
import ClockIcon from '~assets/icons/clockFillGray.svg';
import InfoIcon from '~assets/icons/infoCircleGrey.svg';

const TimeGapCard = ({
  title,
  id,
  startTimestamp = '',
  endTimestamp = '',
  selected = false,
  onPress,
  status,
}: {
  title: string;
  id: string;
  startTimestamp?: string;
  endTimestamp?: string;
  status?: string;
  selected?: boolean;
  onPress: (id: string) => void;
}) => {
  const subtitle = status ? status : `c ${startTimestamp} до ${endTimestamp}`;
  const Icon = status ? InfoIcon : ClockIcon;
  return (
    <Pressable onPress={() => onPress(id)}>
      <View
        style={[
          styles.container,
          styles.shadow,
          selected && { borderWidth: 1, borderColor: Colors.red, padding: 11 },
        ]}>
        <HeaderText size="h4">{title}</HeaderText>
        <RowView style={styles.subtitle}>
          <Icon />
          <AppText style={styles.subtitleText}>{subtitle}</AppText>
        </RowView>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    width: 138,
    height: 65,
    marginTop: 10,
    marginBottom: 18,
    gap: 4,
  },
  text: { flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' },
  subtitle: {
    gap: 4,
    alignItems: 'center',
  },
  subtitleText: {
    color: Colors.weak,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    lineHeight: 15,
    verticalAlign: 'middle',
  },
  shadow: {
    shadowColor: Colors.weak,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});

export default React.memo(TimeGapCard);

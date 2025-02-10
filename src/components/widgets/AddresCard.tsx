import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, HeaderText } from '~components/shared/text';
import RowView from '~components/view/Row.view';
import MapPinIcon from '~assets/icons/mapPin.svg';
import { Colors } from '~constants/colors.constants';

const AddresCard = ({
  title = '',
  subtitle = '',
}: {
  title: string | undefined;
  subtitle: string | undefined;
}) => {
  return (
    <View>
      <HeaderText size="h4">{title}</HeaderText>
      <RowView style={styles.subtitleContainer}>
        <MapPinIcon />
        <AppText style={styles.subtitle}>{subtitle}</AppText>
      </RowView>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   marginTop: 18,
  //   paddingTop: 10,
  // },
  subtitleContainer: {
    gap: 4,
    alignItems: 'center',
  },
  subtitle: {
    color: Colors.weak,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter-Medium',
  },
});

export default AddresCard;

import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { AppText } from '~components/shared/text';
import RowView from '~components/view/Row.view';

import HourglassIcon from '~assets/icons/hourglass.svg';
import WideBadgeSm from '~components/widgets/WideBadgeSm';
import { hp, ms, wp } from '~utils/dimensions.utils';
import { TSvgComponent } from '~typedefs/common';
import { placeholderUri } from '~constants/api.constants';

const ItemToolCardWide = ({
  imageUri = placeholderUri,
  title,
  badgeText,
  BadgeIcon = HourglassIcon,
  onPress,
  is2RowsInBadge = false,
}: {
  imageUri: string | undefined;
  title: string;
  badgeText?: string;
  BadgeIcon?: TSvgComponent;
  onPress?: () => void;
  is2RowsInBadge?: boolean;
}) => {
  return (
    <Pressable onPress={onPress}>
      <RowView style={[styles.container, styles.shadow]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: imageUri,
              cache: 'force-cache',
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.title}>
          <AppText style={styles.text} ellipsizeMode="tail" numberOfLines={3}>
            {title}
          </AppText>
          <WideBadgeSm twoRows={is2RowsInBadge} Icon={BadgeIcon} text={badgeText} />
        </View>
      </RowView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 327,
    backgroundColor: Colors.white,
    borderRadius: ms(16),
    paddingVertical: hp(12),
    paddingHorizontal: wp(12),
    gap: hp(11),
    marginTop: hp(26),
    marginBottom: wp(30),
  },
  shadow: {
    shadowColor: Colors.weak,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  imageContainer: {
    // width: 171,
    // height: 140,
    borderRadius: ms(12),
    backgroundColor: Colors.grey2,
    overflow: 'hidden',
  },
  image: {
    width: 88,
    height: 96,
    resizeMode: 'cover',
  },
  title: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: wp(203),
    gap: hp(4),
    overflow: 'hidden',
  },
  text: {
    fontSize: ms(14),
    fontFamily: 'Inter-Bold',
    lineHeight: hp(20),
    // height: hp(65),
  },
});

export default ItemToolCardWide;

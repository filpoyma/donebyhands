import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Colors, Shadow } from '~constants/colors.constants';
import { AppText } from '~components/shared/text';
import RowView from '~components/view/Row.view';

import HourglassIcon from '~assets/icons/hourglass.svg';
import WideBadgeSm from '~components/widgets/WideBadgeSm';
import { hp, ms, wp } from '~utils/dimensions.utils';
import { SCREEN_MARGINS } from '~constants/screen.constants';
import { TSvgComponent } from '~typedefs/common';
import { placeholderUri } from '~constants/api.constants';

const ItemToolCardWideCurrentRent = ({
  imageUri = placeholderUri,
  title = '',
  badgeText,
  BadgeIcon = HourglassIcon,
  onPress,
  disabled = false,
}: {
  imageUri: string | undefined;
  title: string | undefined;
  badgeText?: string;
  BadgeIcon?: TSvgComponent;
  onPress?: () => void;
  disabled?: boolean;
}) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
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
          <WideBadgeSm Icon={BadgeIcon} text={badgeText || ''} />
        </View>
      </RowView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: hp(120),
    // width: wp(296),
    backgroundColor: Colors.white,
    borderRadius: ms(16),
    paddingVertical: hp(12),
    paddingHorizontal: wp(12),
    gap: hp(11),
    // marginBottom: hp(18),
    // marginTop: hp(15),
    marginHorizontal: SCREEN_MARGINS.horizontal,
  },
  text: {
    fontSize: ms(14),
    fontFamily: 'Inter-Bold',
    lineHeight: hp(21),
    height: hp(70),
  },
  title: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: wp(203),
    gap: 6,
  },
  shadow: Shadow,
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
});

export default ItemToolCardWideCurrentRent;

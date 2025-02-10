import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { AppText } from '~components/shared/text';
import PriceBadge from '~components/widgets/PriceBadge';
import { hp, ms, wp } from '~utils/dimensions.utils';
import { placeholderUri } from '~constants/api.constants';
import Animated from 'react-native-reanimated';

const ItemToolCard = ({
  imageUri = placeholderUri,
  title,
  price,
  onPress,
}: {
  imageUri: string;
  title: string;
  price: string;
  onPress: () => void;
}) => {
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, styles.shadow]}>
        <View style={styles.imageContainer}>
          <AnimatedImage
            style={styles.image}
            source={{
              uri: imageUri,
              cache: 'force-cache',
            }}
            resizeMode="contain"
          />
        </View>
        <AppText style={styles.title} numberOfLines={3} ellipsizeMode="tail">
          {title}
        </AppText>
        <PriceBadge price={price} />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    // height: hp(288),
    width: 188,
    backgroundColor: Colors.white,
    borderRadius: ms(16),
    paddingVertical: hp(8),
    paddingHorizontal: wp(8),
    gap: hp(6),
    marginTop: hp(16),
    marginBottom: hp(26),
  },
  title: {
    fontSize: ms(14),
    fontFamily: 'Inter-Bold',
    lineHeight: hp(20),
    height: hp(60),
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
    width: 172,
    height: 168,
    resizeMode: 'cover',
  },
});

export default ItemToolCard;

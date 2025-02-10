import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { AppText } from '~components/shared/text';
import PriceBadge from '~components/widgets/PriceBadge';
import { hp, ms, wp } from '~utils/dimensions.utils';
import { placeholderUri } from '~constants/api.constants';

const ItemToolCardCatalog = ({
  imageUri = placeholderUri,
  title,
  price,
  onPress,
  containerStyles,
  itemId,
}: {
  imageUri: string;
  itemId: string;
  title: string;
  price: string;
  onPress: (id: string) => void;
  containerStyles?: any;
}) => {
  return (
    <Pressable onPress={() => onPress(itemId)}>
      <View style={[styles.container, containerStyles, styles.shadow]}>
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
        <AppText style={styles.title} ellipsizeMode="tail" numberOfLines={3}>
          {title}
        </AppText>
        <PriceBadge sm price={price} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(156),
    backgroundColor: Colors.white,
    borderRadius: ms(16),
    paddingVertical: hp(7),
    paddingHorizontal: wp(7),
    gap: hp(6),
    marginVertical: hp(6),
  },
  title: {
    fontSize: ms(12),
    fontFamily: 'Inter-Bold',
    lineHeight: hp(16),
    height: hp(49),
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
    height: 140,
    borderRadius: ms(12),
    backgroundColor: Colors.grey2,
    overflow: 'hidden',
  },
  image: {
    width: wp(140),
    height: 140,
    resizeMode: 'cover',
  },
});

export default React.memo(ItemToolCardCatalog);

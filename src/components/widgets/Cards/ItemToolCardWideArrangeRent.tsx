import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { HeaderText } from '~components/shared/text';
import RowView from '~components/view/Row.view';
import { hp, ms, wp } from '~utils/dimensions.utils';
import { placeholderUri } from '~constants/api.constants';

const ItemToolCardWideArrangeRent = ({
  imageUri = placeholderUri,
  title,
}: {
  imageUri: string;
  title: string | undefined;
}) => {
  return (
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
      <View style={styles.text}>
        <HeaderText size="h4" centered={false} ellipsizeMode="tail" numberOfLines={3}>
          {title}
        </HeaderText>
      </View>
    </RowView>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 120,
    // width: 296,
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    paddingVertical: hp(7),
    paddingHorizontal: wp(7),
    gap: wp(8),
    marginTop: hp(10),
    // marginBottom: 30,
    // borderWidth: 1,
  },
  text: { flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' },
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
  imageContainer: {
    borderRadius: 10,
    backgroundColor: Colors.grey2,
    overflow: 'hidden',
  },
  image: {
    width: wp(60),
    height: hp(66),
    resizeMode: 'cover',
  },
});

export default React.memo(ItemToolCardWideArrangeRent);

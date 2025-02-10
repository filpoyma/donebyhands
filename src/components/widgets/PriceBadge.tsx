import React from 'react';
import { Row } from '~components/view';
import { StyleSheet, View } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { AppText } from '~components/shared/text';
import { hp, ms, wp } from '~utils/dimensions.utils';

const PriceBadge = ({ price, sm = false }: { price: string; sm?: boolean }) => {
  return (
    <View style={{ alignItems: 'flex-start' }}>
      <Row style={styles(sm).container}>
        {price ? (
          <AppText style={styles(sm).text}>
            от <AppText style={styles(sm).marked}>{price}</AppText> руб
          </AppText>
        ) : null}
      </Row>
    </View>
  );
};

const styles = (isSmall: boolean) =>
  StyleSheet.create({
    container: {
      paddingVertical: hp(isSmall ? 6 : 8),
      paddingHorizontal: wp(isSmall ? 6 : 8),
      backgroundColor: Colors.red,
      borderRadius: ms(isSmall ? 6 : 8),
      verticalAlign: 'middle',
      alignItems: 'center',
      textAlignVertical: 'center',
    },
    text: {
      color: Colors.grey3,
      fontSize: ms(isSmall ? 9 : 11),
      fontFamily: isSmall ? 'Inter-Bold' : 'Inter-Regular',
      // lineHeight: hp(21),
    },
    marked: {
      color: Colors.white,
      fontSize: ms(isSmall ? 12 : 16),
      fontFamily: 'Inter-Bold',
      // lineHeight: hp(21),
    },
  });

export default React.memo(PriceBadge);

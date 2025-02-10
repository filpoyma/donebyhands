import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { AppText, HeaderText } from '~components/shared/text';
import RowView from '~components/view/Row.view';
import MapPinIcon from '~assets/icons/mapPin.svg';
import { hp, ms, wp } from '~utils/dimensions.utils';

const PostomatAddressCard = ({
  id = '',
  title = '',
  subtitle = '',
  distance = 0,
  onPress,
  margins = false,
  selected = false,
  isOnMap = false,
}: {
  id?: string | undefined;
  title: string | undefined;
  subtitle: string | undefined;
  distance: number | undefined;
  onPress?: (id: string) => void;
  margins?: boolean;
  selected?: boolean;
  isOnMap?: boolean;
}) => {
  return (
    <Pressable onPress={onPress ? () => onPress(id) : undefined}>
      <View
        style={[
          styles.container,
          styles.shadow,
          isOnMap && { width: wp(260) },
          margins && { marginVertical: hp(26) },
          selected && { borderWidth: 0.5, borderColor: Colors.grey3 },
        ]}>
        <RowView style={isOnMap && { width: wp(175) }}>
          <View style={styles.blackBadge}>
            <HeaderText size="h5" color={Colors.white}>
              {distance}
            </HeaderText>
            <AppText style={styles.blBadgeText}>км</AppText>
          </View>
          <View style={{ justifyContent: 'space-around' }}>
            <HeaderText size="h4" centered={false} ellipsizeMode="tail" numberOfLines={1}>
              {title}
            </HeaderText>
            <RowView style={[styles.subtitle, isOnMap && { width: wp(155) }]}>
              <MapPinIcon />
              <AppText style={styles.subtitleText} ellipsizeMode="tail" numberOfLines={1}>
                {subtitle}
              </AppText>
            </RowView>
          </View>
        </RowView>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    paddingVertical: hp(12),
    paddingHorizontal: wp(12),
    overflow: 'hidden',
  },
  inputContainer: {
    height: hp(56),
    paddingVertical: hp(20),
    paddingHorizontal: wp(20),
    borderRadius: ms(16),
    backgroundColor: Colors.grey,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: Colors.weak,
    fontSize: ms(14),
    fontFamily: 'Inter-Medium',
    lineHeight: hp(18),
    height: hp(56),
  },
  blackBadge: {
    backgroundColor: Colors.black,
    paddingHorizontal: wp(10),
    paddingVertical: hp(10),
    borderRadius: ms(12),
    marginRight: wp(12),
    shadowColor: '#080808',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  blBadgeText: {
    color: Colors.weak,
    fontSize: ms(8),
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  text: { flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' },
  subtitle: {
    gap: hp(4),
    alignItems: 'center',
  },
  subtitleText: {
    color: Colors.weak,
    fontSize: ms(12),
    fontFamily: 'Inter-Medium',
    lineHeight: hp(18),
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

export default React.memo(PostomatAddressCard);

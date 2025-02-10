import { StyleSheet } from 'react-native';
import { hp, wp } from '~utils/dimensions.utils';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  title: {
    marginTop: hp(115),
    gap: hp(8),
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    color: Colors.weak,
  },
  photos: {
    marginTop: hp(51),
    gap: wp(8),
  },
  button: {
    marginTop: hp(16),
  },
  secButton: {
    marginBottom: hp(8),
    gap: hp(8),
  },
});

export default styles;

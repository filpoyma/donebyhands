import { StyleSheet } from 'react-native';
import { hp } from '~utils/dimensions.utils';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  title: {
    marginTop: hp(200),
    gap: hp(8),
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    color: Colors.weak,
  },
  secButton: {
    marginTop: hp(10),
    gap: hp(8),
  },
});

export default styles;

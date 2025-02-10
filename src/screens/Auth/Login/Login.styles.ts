import { StyleSheet } from 'react-native';
import { hp, ms } from '~utils/dimensions.utils';
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
  form: {
    marginTop: hp(115),
    gap: hp(16),
  },
  info: {
    gap: hp(12),
    marginTop: hp(20),
  },
  infoSubtitle: {
    fontFamily: 'Inter-Medium',
    color: Colors.red,
    fontSize: ms(14),
    lineHeight: hp(21),
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
  },
  footerText: {
    fontSize: ms(11),
    fontFamily: 'Inter-Regular',
    lineHeight: hp(16),
    color: Colors.weak,
    textAlign: 'center',
  },
  marked: { color: Colors.red },
});

export default styles;

import { StyleSheet } from 'react-native';
import { hp, ms } from '~utils/dimensions.utils';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'space-between',
  },
  backgroundImg: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  photos: {
    marginBottom: hp(22),
    gap: 8,
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    marginVertical: hp(22),
    paddingBottom: hp(10),
  },
  messageText: {
    textAlign: 'center',
    color: Colors.red,
    fontFamily: 'Inter-Medium',
    fontSize: ms(16),
    lineHeight: hp(24),
  },
});

export default styles;

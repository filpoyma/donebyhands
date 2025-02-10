import { StyleSheet } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { hp, ms } from '~utils/dimensions.utils';

const styles = StyleSheet.create({
  wrapper: {},
  swiper: { height: 420, marginTop: 100 },
  slide: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: 280,
    height: 280,
  },
  text: {
    marginTop: 'auto',
    height: 80,
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: '#FFDBDB',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 55,
  },
  activeDot: {
    backgroundColor: '#E21414',
    width: 27,
    height: 8,
    borderRadius: 4,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 4,
    marginBottom: 55,
  },
  button: {
    gap: 8,
  },
  infoSubtitle: {
    fontFamily: 'Inter-Medium',
    color: Colors.red,
    fontSize: ms(16),
    lineHeight: hp(24),
    textAlign: 'center',
  },
});

export default styles;

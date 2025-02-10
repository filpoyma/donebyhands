import { StyleSheet } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey,
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    paddingVertical: 10,
  },
  icon: {
    width: 48,
    height: 48,
    backgroundColor: Colors.red,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    paddingLeft: 16,
    gap: 4,
    justifyContent: 'center',
  },
  title: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'NatoSans-Bold',
    lineHeight: 18,
  },
  subtitle: {
    color: Colors.weak,
    fontSize: 10,
    fontFamily: 'NatoSans-Regular',
    lineHeight: 12,
  },
});

export default styles;

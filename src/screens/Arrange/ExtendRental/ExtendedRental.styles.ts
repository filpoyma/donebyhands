import { StyleSheet } from 'react-native';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
  },
  label: {
    color: Colors.weak,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Inter-SemiBold',
    marginTop: 18,
  },
  button: {
    marginVertical: 18,
  },
  pointsInfo: {
    marginLeft: 4,
    color: Colors.weak,
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  loader: {
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
  },
});

export default styles;

import { StyleSheet } from 'react-native';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
  },
  columnWrapper: {
    justifyContent: 'center',
    paddingHorizontal: SCREEN_PADDINGS.horizontal - 2,
    gap: 12,
  },
});

export default styles;

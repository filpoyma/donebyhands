import { StyleSheet } from 'react-native';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
  },
  columnWrapper: {
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    gap: 12,
    justifyContent: 'center',
  },
});

export default styles;

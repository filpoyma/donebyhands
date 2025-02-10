import { StyleSheet } from 'react-native';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

const styles = StyleSheet.create({
  input: {
    paddingBottom: 16,
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
  },
  cards: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
  },
  columnWrapper: {
    justifyContent: 'center',
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    gap: 12,
  },
});

export default styles;

import { StyleSheet } from 'react-native';
import { SCREEN_MARGINS } from '~constants/screen.constants';

const styles = StyleSheet.create({
  titleImage: {
    flexGrow: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttons: {
    marginVertical: SCREEN_MARGINS.vertical,
    marginHorizontal: SCREEN_MARGINS.horizontal,
  },
});

export default styles;

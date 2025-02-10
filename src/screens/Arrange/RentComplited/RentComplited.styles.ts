import { StyleSheet } from 'react-native';
import { SCREEN_MARGINS } from '~constants/screen.constants';

const styles = StyleSheet.create({
  titleImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    gap: 8,
  },
  itemCard: {
    marginTop: 48,
    width: '100%',
  },
  buttons: {
    marginVertical: SCREEN_MARGINS.vertical,
    marginHorizontal: SCREEN_MARGINS.horizontal,
  },
});

export default styles;

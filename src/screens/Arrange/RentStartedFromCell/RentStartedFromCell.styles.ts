import { StyleSheet } from 'react-native';
import { SCREEN_MARGINS } from '~constants/screen.constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
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

import { StyleSheet } from 'react-native';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  title: { paddingHorizontal: SCREEN_PADDINGS.horizontal, alignItems: 'baseline' },
  search: { marginTop: 18, marginBottom: 25, paddingHorizontal: SCREEN_PADDINGS.horizontal },
  allTools: { fontFamily: 'Inter-Regular', color: Colors.weak },
  currentRent: {
    paddingHorizontal: SCREEN_PADDINGS.horizontal,
    position: 'absolute',
    backgroundColor: Colors.transparent,
    top: -5,
  },
});

export default styles;

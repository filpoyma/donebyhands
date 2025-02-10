import { StyleSheet } from 'react-native';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.grey },
  map: { width: '99.7%', height: '99.7%' },
  backButton: { position: 'absolute', top: 40, left: 24, zIndex: 10 },
  absoluteBottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default styles;

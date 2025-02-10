import { StyleSheet } from 'react-native';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  title: {
    marginTop: 115,
    gap: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    color: Colors.weak,
  },
  inputs: {
    marginTop: 51,
    gap: 8,
  },
  button: {
    marginTop: 16,
  },
});

export default styles;

import { StyleSheet } from 'react-native';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  title: {
    marginTop: 59,
    gap: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    color: Colors.weak,
  },
  otp: {
    marginTop: 67,
  },
  marked: { color: Colors.black, fontFamily: 'Inter-Medium' },

  codeFiledRoot: {
    justifyContent: 'center',
    gap: 8,
  },
  cell: {
    width: 56,
    height: 56,
    borderRadius: 12,
    paddingVertical: 10,
    lineHeight: 36,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.black,
    backgroundColor: Colors.grey,
    textAlign: 'center',
    overflow: 'hidden',
  },
  numCorrect: {
    color: Colors.green,
  },
  numInCorrect: {
    color: Colors.red,
  },
  focusCell: {
    borderColor: Colors.red,
    borderWidth: 1,
  },
});

export default styles;

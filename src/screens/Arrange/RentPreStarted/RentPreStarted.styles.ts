import { StyleSheet } from 'react-native';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addressCard: {
    marginTop: 48,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginVertical: 10,
    gap: 8,
  },
  otp: {
    marginTop: 42,
    gap: 16,
  },
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
});

export default styles;

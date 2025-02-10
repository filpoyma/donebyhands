import { StyleSheet } from 'react-native';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  images: {
    marginTop: 12,
  },
  leaseButton: {
    paddingTop: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  text: {
    alignItems: 'baseline',
    paddingRight: 54,
  },
  map: {
    height: 234,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.weak,
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  mapFrame: {
    flexGrow: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.grey2,
  },
  headerText: { paddingTop: 12, paddingBottom: 8 },
});

export default styles;

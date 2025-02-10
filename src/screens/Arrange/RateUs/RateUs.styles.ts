import { StyleSheet } from 'react-native';
import { Colors } from '~constants/colors.constants';

const styles = StyleSheet.create({
  titleImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    gap: 12,
  },
  itemCard: {
    marginTop: 48,
    width: '100%',
  },
  buttons: {
    gap: 10,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Inter-Regular',
    color: Colors.black,
    textAlign: 'center',
    paddingTop: 35,
    paddingBottom: 8,
    width: 230,
  },
  subTitleContainer: {
    alignItems: 'center',
  },
});

export default styles;

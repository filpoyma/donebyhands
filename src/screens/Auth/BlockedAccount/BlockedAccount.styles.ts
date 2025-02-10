import { Colors } from '~constants/colors.constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 30,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    color: Colors.weak,
  },
  footer: {
    marginTop: 'auto',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default styles;

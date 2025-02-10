import { StyleSheet } from 'react-native';

const columnStyles = (length: number, index: number, marginBottom: number) => {
  if (length - 1 === index && length % 2)
    return StyleSheet.create({
      wrapper: { marginBottom, width: '97%' },
    });
  if (length - 1 === index)
    return StyleSheet.create({
      wrapper: { marginBottom },
    });
  return { wrapper: {} };
};

export default columnStyles;

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';

const NothingFound = ({ title = 'Ничего не найдено', subtitle = 'Попробуйте изменить запрос' }) => (
  <View style={styles.container}>
    <HeaderText size="h1">{title}</HeaderText>
    <PlHolderText>{subtitle}</PlHolderText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 186,
    gap: 8,
  },
});

export default NothingFound;

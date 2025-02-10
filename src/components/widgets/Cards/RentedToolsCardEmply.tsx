import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Colors } from '~constants/colors.constants';

import PlHolderText from '~components/shared/text/PlHolder.text';
import { SCREEN_PADDINGS } from '~constants/screen.constants';

const RentedToolsCardEmply = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={[styles.card, { width: width - SCREEN_PADDINGS.horizontal * 2 }]}>
        <PlHolderText style={{ width: 268 }}>Список инструментов пуст</PlHolderText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  card: {
    height: 120,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 22,
    paddingHorizontal: 26,
    marginTop: 24,
    marginBottom: 100,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: Colors.weak,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});

export default RentedToolsCardEmply;

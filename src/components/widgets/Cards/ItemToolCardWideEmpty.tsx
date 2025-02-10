import React from 'react';
import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Colors } from '~constants/colors.constants';

import PlHolderText from '~components/shared/text/PlHolder.text';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import { Screens, TabNavigatorParamList } from '~constants/navigators.constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

type MainPageHeaderStack = NativeStackNavigationProp<TabNavigatorParamList, Screens.catalog>;

const ItemToolCardWideEmpty = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<MainPageHeaderStack>();
  return (
    <View style={styles.container}>
      <View style={[styles.card, { width: width - SCREEN_PADDINGS.horizontal * 2 }]}>
        <PlHolderText style={{ width: 268 }}>
          У вас нет арендованных инструментов в настоящий момент
        </PlHolderText>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Screens.catalog);
          }}
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}>
          <PlHolderText color={Colors.red}>Арендовать инструмент</PlHolderText>
        </TouchableOpacity>
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

export default ItemToolCardWideEmpty;

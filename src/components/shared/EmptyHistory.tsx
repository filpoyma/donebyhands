import React from 'react';
import { View, StyleSheet } from 'react-native';

import { HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';
import SecButton from '~components/shared/buttons/Sec.button';
import {
  MainStackParamList,
  Screens,
  TabNavigatorParamList,
} from '~constants/navigators.constants';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { SCREEN_MARGINS } from '~constants/screen.constants';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

type EmptyHistoryScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabNavigatorParamList, Screens.catalog>,
  StackNavigationProp<MainStackParamList>
>;

const EmptyHistory = () => {
  const navigation = useNavigation<EmptyHistoryScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <HeaderText>Нет истории</HeaderText>
        <PlHolderText style={{ width: 180 }}>Вы не арендовали ни одного инструмента</PlHolderText>
      </View>
      <View style={styles.buttons}>
        <SecButton
          text={'Арендовать инструмент'}
          onPress={() => {
            navigation.navigate(Screens.tabNavigator, { screen: Screens.catalog });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttons: {
    marginHorizontal: SCREEN_MARGINS.horizontal,
  },
});

export default EmptyHistory;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screens, tabScreensOptions } from '~constants/navigators.constants';
import {
  CatalogIconTab,
  CurrentRentIconTab,
  GeoIconTab,
  HouseIconTab,
  MoreIconTab,
} from '~components/shared/bottomTab/TabIcons';
import CatalogScreen from '~screens/BottomTab/Catalog/Catalog.screen';
import MainPageScreen from '~screens/BottomTab/MainPage';
import MoreScreen from '~screens/BottomTab/More';
import CurrentRentScreen from '~screens/BottomTab/CurrentRent';
import MapScreen from '~screens/BottomTab/Map/Map.screen';

const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={tabScreensOptions} backBehavior={'history'}>
      <BottomTab.Screen
        name={Screens.mainPage}
        component={MainPageScreen}
        options={{
          title: 'Главная',
          tabBarIcon: HouseIconTab,
        }}
      />
      <BottomTab.Screen
        name={Screens.map}
        component={MapScreen}
        options={{
          title: 'Карта',
          tabBarIcon: GeoIconTab,
        }}
      />
      <BottomTab.Screen
        name={Screens.catalog}
        component={CatalogScreen}
        options={{
          title: 'Каталог',
          tabBarIcon: CatalogIconTab,
        }}
      />
      <BottomTab.Screen
        name={Screens.currentRent}
        component={CurrentRentScreen}
        options={{
          title: 'В аренде',
          tabBarIcon: CurrentRentIconTab,
        }}
      />
      <BottomTab.Screen
        name={Screens.more}
        component={MoreScreen}
        options={{
          title: 'Еще',
          tabBarIcon: MoreIconTab,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TabNavigator;

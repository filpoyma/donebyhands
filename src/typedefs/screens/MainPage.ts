import {
  StackScreenProps,
  MainStackParamList,
  Screens,
  CompositeScreenProps,
  BottomTabScreenProps,
  TabNavigatorParamList,
} from './index';

export type MainPageScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>,
  StackScreenProps<MainStackParamList>
>;

export type TModalNames = 'currentRent' | 'returnToolsAlert' | 'rentHistory';

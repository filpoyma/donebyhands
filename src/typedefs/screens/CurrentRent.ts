import {
  StackScreenProps,
  MainStackParamList,
  Screens,
  CompositeScreenProps,
  BottomTabScreenProps,
  TabNavigatorParamList,
} from './index';

export type CurrentRentScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabNavigatorParamList, Screens.currentRent>,
  StackScreenProps<MainStackParamList>
>;

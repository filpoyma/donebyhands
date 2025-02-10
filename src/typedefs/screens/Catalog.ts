import {
  StackScreenProps,
  MainStackParamList,
  Screens,
  CompositeScreenProps,
  BottomTabScreenProps,
  TabNavigatorParamList,
} from './index';

export type CatalogScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabNavigatorParamList, Screens.catalog>,
  StackScreenProps<MainStackParamList>
>;

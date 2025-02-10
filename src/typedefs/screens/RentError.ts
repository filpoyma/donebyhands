import { StackScreenProps, MainStackParamList, Screens, TabNavigatorParamList } from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type RentErrorScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.rentError>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>
>;

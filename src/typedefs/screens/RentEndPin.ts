import { MainStackParamList, StackScreenProps, Screens, TabNavigatorParamList } from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type RentStartedScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.rentEndPin>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>
>;

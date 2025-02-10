import { MainStackParamList, StackScreenProps, Screens, TabNavigatorParamList } from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type RentPreStartedScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.rentPreStarted>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>
>;

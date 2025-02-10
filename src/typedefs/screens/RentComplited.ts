import { StackScreenProps, MainStackParamList, Screens, TabNavigatorParamList } from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type RentComplitedScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.rentCompleted>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>
>;

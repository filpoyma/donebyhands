import { MainStackParamList, StackScreenProps, Screens, TabNavigatorParamList } from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type RentRenewalScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.rentRenewal>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>
>;

import { StackScreenProps, MainStackParamList, Screens, TabNavigatorParamList } from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type RentStartedFromCellScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.rentStartedFromCell>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>
>;

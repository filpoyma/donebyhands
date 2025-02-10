import { MainStackParamList, StackScreenProps, Screens, TabNavigatorParamList } from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type RentEndWarningScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.rentEndWarning>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>
>;

import { MainStackParamList, StackScreenProps, Screens, TabNavigatorParamList } from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type EmailAtRentBeginScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.emailAtRentBegin>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>
>;

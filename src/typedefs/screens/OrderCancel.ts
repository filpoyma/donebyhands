import { StackScreenProps, MainStackParamList, Screens, TabNavigatorParamList } from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type OrderCancelScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.orderCancel>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>
>;

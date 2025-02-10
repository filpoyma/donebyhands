import { StackScreenProps, MainStackParamList, Screens, TabNavigatorParamList } from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type PayForToolScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.payForTool>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.mainPage>
>;

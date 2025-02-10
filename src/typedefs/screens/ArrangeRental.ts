import {
  StackScreenProps,
  MainStackParamList,
  Screens,
  TabNavigatorParamList,
  RootStackParamList,
} from './index';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens/index';

export type ArrangeRentalScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.arrangeRental>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.map>
>;

export type ArrangeRentalPreviewScreenProps = CompositeScreenProps<
  StackScreenProps<RootStackParamList, Screens.arrangeRentalPreview>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.map>
>;

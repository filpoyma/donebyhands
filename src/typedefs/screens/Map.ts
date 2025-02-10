import { IParcelLockerWithDistance } from '~typedefs/models/ParcelLocker.model';
import {
  BottomTabScreenProps,
  CompositeScreenProps,
  MainStackParamList,
  Screens,
  StackScreenProps,
  TabNavigatorParamList,
} from '~typedefs/screens/index';

export interface ParcelLockersScrollCardsProps {
  postomatsWithDistance: IParcelLockerWithDistance[];
  onPressParcelLocker: (id: string) => void;
  ref?: any;
  postomatId: string;
}

export interface ParcelLockersMarkersProps {
  postomatsWithDistance: any;
  onPressParcelLocker: (id: string) => void;
  postomatId: string;
  isLoading: boolean;
  ref?: any;
}

export type MapScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabNavigatorParamList, Screens.map>,
  StackScreenProps<MainStackParamList>
>;

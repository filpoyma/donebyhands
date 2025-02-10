import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList, Screens } from '~constants/navigators.constants';

export type SearchInCurrentRentScreenProps = StackScreenProps<
  MainStackParamList,
  Screens.searchInCurrentRent
>;

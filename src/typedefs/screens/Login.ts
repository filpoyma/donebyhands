import { StackScreenProps, RootStackParamList, Screens } from './index';

export type LoginScreenProps = StackScreenProps<
  RootStackParamList,
  Screens.signIn | Screens.signUp
>;

import { StackScreenProps, RootStackParamList, Screens } from './index';

export type PersonalDataPhotoProps = StackScreenProps<
  RootStackParamList,
  Screens.personalDataPhotoPassport | Screens.personalDataPhotoSelfie
>;

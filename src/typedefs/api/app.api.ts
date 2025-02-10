import { IOnboardingImage } from '~typedefs/models/Onboarding.model';

export interface IFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ISettingsResponseData {
  logo: string | null;
  privacy_policy: string;
  terms_of_service: string;
  rent_rules: string;
  write_to_chat: string;
  call_phone: string;
  support_icon: string;
  onboarding_slides: IOnboardingImage[];
  faq_blocks: IFAQ[];
  app_version: string;
}

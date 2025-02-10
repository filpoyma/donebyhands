import firstImage from '~assets/images/onboarding/1.png';
import secondImage from '~assets/images/onboarding/2.png';
import thirdImage from '~assets/images/onboarding/3.png';
import fourthImage from '~assets/images/onboarding/4.png';
import fifththImage from '~assets/images/onboarding/5.png';
import firstBgImage from '~assets/images/onboarding/bg1.png';
import secondBgImage from '~assets/images/onboarding/bg2.png';
import thirdBgImage from '~assets/images/onboarding/bg3.png';
import fourthBgImage from '~assets/images/onboarding/bg4.png';
import fifththBgImage from '~assets/images/onboarding/bg5.png';
import { ImageSourcePropType } from 'react-native';

const onboardingElements: {
  id: string;
  photo: ImageSourcePropType | { uri: string };
  background: ImageSourcePropType | { uri: string };
  title: string;
  weight?: number;
}[] = [
  {
    id: '1',
    photo: firstImage,
    //photo: { uri: 'https://cdn.pixabay.com/photo/2012/06/25/15/34/berlin-wall-50727_1280.jpg' },
    background: firstBgImage,
    title: 'Аренда без залога!',
  },
  {
    id: '2',
    photo: secondImage,
    background: secondBgImage,
    title: 'Тарифы от 3-х часов!',
  },
  {
    id: '3',
    photo: thirdImage,
    background: thirdBgImage,
    title: 'Профессиональный инструмент!',
  },
  {
    id: '4',
    photo: fourthImage,
    background: fourthBgImage,
    title: 'Проще арендовать, чем покупать!',
  },
  {
    id: '5',
    photo: fifththImage,
    background: fifththBgImage,
    title: 'Бери в аренду и Твори!',
  },
];

export default onboardingElements;

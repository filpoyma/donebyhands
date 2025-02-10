import { Colors } from '~constants/colors.constants';
import { isIOS } from '~constants/platform.constants';
// import { Easing } from 'react-native-reanimated';

export enum Screens {
  signIn = 'signIn',
  signUp = 'signUp',
  regInfo = 'regInfo',
  checkFailed = 'checkFailed',
  otpConfirmation = 'otpConfirmation',
  onboarding = 'onboarding',
  mainNavigator = 'mainNavigator',
  tabNavigator = 'tabNavigator',
  blockedAccount = 'blockedAccount',
  personalData = 'personalData',
  personalDataPhotoPassport = 'personalDataPhotoPassport',
  personalDataPhotoSelfie = 'personalDataPhotoSelfie',
  mainPage = 'mainPage',
  map = 'map',
  mapFullScreen = 'mapFullScreen',
  catalog = 'catalog',
  catalogUnAuth = 'catalogUnauth',
  toolsPreview = 'toolsPreview',
  arrangeRentalPreview = 'arrangeRentalPreview',
  currentRent = 'currentRent',
  more = 'more',
  notification = 'notification',
  searchInCatalog = 'searchInCatalog',
  searchInCurrentRent = 'searchInCurrentRent',
  toolsPage = 'toolsPage',
  arrangeRental = 'arrangeRental',
  extendRental = 'extendRental',
  rentStarted = 'rentStarted',
  rentPreStarted = 'rentPreStarted',
  rentCompleted = 'rentCompleted',
  rentRenewal = 'rentRenewal',
  rentStartedFromCell = 'rentStartedFromCell',
  rentEndPin = 'rentEndPin',
  rentError = 'rentError',
  cellNotClosed = 'cellNotClosed',
  profile = 'profile',
  takingToolsPictures = 'takingToolsPictures',
  rentHistory = 'rentHistory',
  contactsInfo = 'contactsInfo',
  paymentsInfo = 'paymentsInfo',
  addPayments = 'addPayments',
  pointsHistory = 'pointsHistory',
  documents = 'documents',
  documentsEdit = 'documentsEdit',
  payForTool = 'payForTool',
  orderCancel = 'orderCancel',
  pdfViewer = 'pdfViewer',
  faq = 'faq',
  emailAtRentBegin = 'emailAtRentBegin',
  rateUs = 'rateUs',
  rentEndWarning = 'rentEndWarning',
}

// const forFade = ({ current }: any) => ({
//   cardStyle: {
//     opacity: current.progress,
//   },
// });
//
// const forSlide = ({ current, next, inverted, layouts: { screen } }: any) => {
//   const translateX = current.progress.interpolate({
//     inputRange: [0, 1],
//     outputRange: [screen.width, 0],
//   });
//
//   const translateNextX = next
//     ? next.progress.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, -screen.width],
//       })
//     : 0;
//
//   return {
//     cardStyle: {
//       transform: [{ translateX }, { translateX: translateNextX }],
//     },
//   };
// };

export const defaultScreenOptions = {
  headerShown: false,
  // gestureEnabled: true,
  // gestureDirection: 'horizontal',
  // transitionSpec: {
  //   open: {
  //     animation: 'timing',
  //     config: {
  //       duration: 500,
  //       easing: Easing.inOut(Easing.ease),
  //     },
  //   },
  //   close: {
  //     animation: 'timing',
  //     config: {
  //       duration: 500,
  //       easing: Easing.inOut(Easing.ease),
  //     },
  //   },
  // },
  // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  // // cardStyleInterpolator: forFade,
  // //cardStyleInterpolator: forSlide,
};

export const tabScreensOptions = {
  headerShown: false,
  tabBarActiveTintColor: Colors.red,
  tabBarInactiveTintColor: Colors.weak,
  tabBarHideOnKeyboard: true,
  animation: isIOS ? 'fade' : 'fade',
  animationEnabled: false,
  tabBarLabelStyle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    // paddingTop: 0,
  },
  tabBarStyle: {
    // marginTop: 10,
    // marginBottom: 0,
    // borderTopWidth: 0.5,
    // elevation: 0,
    // position: 'absolute',
    // backgroundColor: 'transparent',
    // backgroundColor: 'rgba(500,500,500,0.4)',
    paddingTop: 3,
    paddingBottom: 50,
  },
  tabBarItemStyle: {
    height: 53,
    // paddingTop: 10,
    //paddingBottom: 5,
  },
};

export type RootStackParamList = {
  [Screens.mainNavigator]: undefined;
  [Screens.onboarding]: undefined;
  [Screens.signIn]: undefined;
  [Screens.signUp]: undefined;
  [Screens.regInfo]: undefined;
  [Screens.otpConfirmation]: { phone: string; isSignIn: boolean };
  [Screens.personalData]: { userId: number };
  [Screens.personalDataPhotoPassport]: { userId: number };
  [Screens.personalDataPhotoSelfie]: undefined;
  [Screens.catalogUnAuth]: undefined;
  [Screens.toolsPreview]: { toolId: string };
  [Screens.pdfViewer]: { pdfUri: string };
  [Screens.arrangeRentalPreview]: undefined;
};

export type MainStackParamList = {
  [Screens.blockedAccount]: undefined;
  [Screens.profile]: undefined;
  [Screens.tabNavigator]: { screen: Screens } | undefined;
  [Screens.notification]: undefined;
  [Screens.searchInCatalog]: { search: string };
  [Screens.searchInCurrentRent]: undefined;
  [Screens.toolsPage]: { itemId: string; forwardScreen?: Screens };
  [Screens.arrangeRental]: undefined;
  [Screens.extendRental]: { orderId: string; postomatId: string };
  [Screens.rentStarted]: { pin?: string; ended: string; orderId: string; postomatId: string };
  [Screens.rentPreStarted]: { pin?: string; ended: string; orderId: string; postomatId: string };
  [Screens.rentRenewal]: { ended: string; postomatId: string };
  [Screens.rentCompleted]: { points: number; orderId: string };
  [Screens.rentStartedFromCell]: { orderId: string };
  [Screens.rentError]: { title: string; subtitle: string };
  [Screens.takingToolsPictures]: {
    orderId: string;
    photoType: 'start' | 'return';
    postomatId: string;
  };
  [Screens.rentHistory]: undefined;
  [Screens.contactsInfo]: undefined;
  [Screens.paymentsInfo]: undefined;
  [Screens.addPayments]: undefined;
  [Screens.pointsHistory]: undefined;
  [Screens.documents]: undefined;
  [Screens.documentsEdit]: undefined;
  [Screens.checkFailed]: undefined;
  [Screens.cellNotClosed]: { orderId: string; forwardScreen: Screens };
  [Screens.payForTool]: {
    orderId: string;
    postomatId: string;
    paymentUrl: string;
    contentId: number;
  };
  [Screens.orderCancel]: {
    orderId: string;
    postomatId: string;
  };
  [Screens.rentEndPin]: {
    orderId: string;
    postomatId?: string;
    photoType: 'start' | 'return';
    pin: string;
  };
  [Screens.pdfViewer]: {
    pdfUri: string;
  };
  [Screens.faq]: undefined;
  [Screens.mapFullScreen]: { toolId: string | undefined };
  [Screens.emailAtRentBegin]: { points: number; promocode: string };
  [Screens.rateUs]: { points: number; orderId: string };
  [Screens.rentEndWarning]: { orderId: string; postomatId: string };
};

export type TabNavigatorParamList = {
  [Screens.mainPage]: undefined;
  [Screens.map]: { isBackButton: boolean; toolId?: string };
  [Screens.catalog]: undefined;
  [Screens.currentRent]: { itemId: string };
  [Screens.more]: undefined;
};

export const ScreensParams = {
  [Screens.signIn]: {
    title: 'Вход',
    subtitle: 'Добро пожаловать',
    buttonText: 'Войти',
    infoTitle: 'Нет аккаунта?',
    infoSubtitle: 'Зарегистрироваться',
    isSignIn: true,
  },
  [Screens.signUp]: {
    title: 'Регистрация',
    subtitle: 'Добро пожаловать',
    buttonText: 'Далее',
    infoTitle: 'Есть аккаунт?',
    infoSubtitle: 'Войти',
    isSignIn: false,
  },
  [Screens.regInfo]: {
    title: 'Благодарим Вас за регистрацию!',
    subtitle:
      'Мы проверяем ваши данные и уже в течение 10 минут Вы сможете воспользоваться нашим сервисом аренды',
  },
  [Screens.checkFailed]: {
    title: 'Проверка не пройдена',
    subtitle:
      'К сожалению, вы не прошли проверку службой безопасности. Вы можете продолжить пользоваться сервисом, заплатив залог за инструмент',
  },
  paymentError: { title: 'Ошибка', subtitle: 'Не удалось списать оплату с карты' },
  paymentAddError: { title: 'Карта не привязана', subtitle: 'Что то пошло не так' },
  [Screens.personalDataPhotoPassport]: {
    title: 'Персональные данные',
    subtitle: 'Фотографии паспорта: главная страница и прописка',
  },
  [Screens.personalDataPhotoSelfie]: {
    title: 'Персональные данные',
    subtitle: 'Селфи с паспортом',
  },
};

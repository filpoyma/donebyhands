import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { defaultScreenOptions, Screens } from '~constants/navigators.constants';
import { selectUser } from '~redux/selectors';
import store from '~redux/store';
import TabNavigator from '~navigation/Tab.navigator';
import NotificationsScreen from '~screens/BottomTab/Notifications';
import SearchInCatalogScreen from '~screens/BottomTab/SearchInCatalog';
import ToolsPageScreen from '~screens/Arrange/Tools';
import ArrangeRentalScreen from '~screens/Arrange/ArrangeRental';
import RentStartedScreen from '~screens/Arrange/RentStarted';
import RentErrorScreen from '~screens/Arrange/RentError';
import ProfileScreen from '~screens/Profile/Profile';
import ExtendRentalScreen from '~screens/Arrange/ExtendRental';
import SearchInCurrentRentScreen from '~screens/BottomTab/SearchInCurrentRent';
import TakingToolsPicturesScreen from '~screens/Arrange/TakingToolsPictures';
import RentStartedFromCellScreen from '~screens/Arrange/RentStartedFromCell';
import RentHistoryScreen from '~screens/Profile/RentHistory/RentHistory.screen';
import ContactsInfoScreen from '~screens/Profile/ContactsInfo';
import PaymentsInfoScreen from '~screens/Profile/PaymentsInfo';
import AddPaymentsScreen from '~screens/Profile/AddPayments';
import PointsHistoryScreen from '~screens/Profile/PointsHistory';
import RentComplitedScreen from '~screens/Arrange/RentComplited';
import DocumentsScreen from '~screens/Profile/Documents';
import DocumentsEditScreen from '~screens/Profile/DocumentsEdit';
import BlockedAccount from '~screens/Auth/BlockedAccount';
import CheckFailedScreen from '~screens/Auth/CheckedFail';
import CellNotClosedScreen from '~screens/Arrange/CellNotClosed';
import RentPreStartedScreen from '~screens/Arrange/RentPreStarted';
import PayForToolScreen from '~screens/Arrange/PayForTools';
import RentEndPinScreen from '~screens/Arrange/RentEndPin';
import RentRenewalScreen from '~screens/Arrange/RentRenewal';
import ToolsPdfScreen from '~screens/Arrange/ToolsPdf';
import FAQScreen from '~screens/BottomTab/Faq/FAQ.screen';
import OrderCancel from '~screens/Arrange/OrderCancel';
import MapFullScreen from '~screens/BottomTab/Map/MapFullScreen.screen';
import EmailAtRentBeginScreen from '~screens/Arrange/EmailAtRentBagin';
import RateUsScreen from '~screens/Arrange/RateUs';
import RentEndWarningScreen from '~screens/Arrange/RentEndWarning';

const MainStack = createStackNavigator();

const MainNavigator = () => {
  const user = useSelector(selectUser);
  const isToolsPhotosLoadedAtRentalBegin = store.getState().app.isToolsPhotosLoadedAtRentalBegin;

  const initialRouteName = () => {
    if (!isToolsPhotosLoadedAtRentalBegin) return Screens.takingToolsPictures;
    if (user?.docs_status === 'not_checked' || user?.docs_status === 'rejected')
      return Screens.checkFailed;
    else return Screens.tabNavigator;
  };

  if (user?.is_blocked) {
    return (
      <MainStack.Navigator screenOptions={defaultScreenOptions}>
        <MainStack.Screen name={Screens.blockedAccount} component={BlockedAccount} />
      </MainStack.Navigator>
    );
  }

  return (
    <MainStack.Navigator screenOptions={defaultScreenOptions} initialRouteName={initialRouteName()}>
      <MainStack.Screen
        name={Screens.tabNavigator}
        component={TabNavigator}
        options={{ gestureEnabled: false }}
      />
      <MainStack.Screen name={Screens.notification} component={NotificationsScreen} />
      <MainStack.Screen name={Screens.searchInCatalog} component={SearchInCatalogScreen} />
      <MainStack.Screen name={Screens.searchInCurrentRent} component={SearchInCurrentRentScreen} />
      <MainStack.Screen name={Screens.toolsPage} component={ToolsPageScreen} />
      <MainStack.Screen name={Screens.arrangeRental} component={ArrangeRentalScreen} />
      <MainStack.Screen name={Screens.extendRental} component={ExtendRentalScreen} />
      <MainStack.Screen name={Screens.rentError} component={RentErrorScreen} />
      <MainStack.Screen name={Screens.rentStarted} component={RentStartedScreen} />
      <MainStack.Screen name={Screens.rentPreStarted} component={RentPreStartedScreen} />
      <MainStack.Screen name={Screens.rentCompleted} component={RentComplitedScreen} />
      <MainStack.Screen name={Screens.rentStartedFromCell} component={RentStartedFromCellScreen} />
      <MainStack.Screen name={Screens.rentRenewal} component={RentRenewalScreen} />
      <MainStack.Screen name={Screens.profile} component={ProfileScreen} />
      <MainStack.Screen name={Screens.takingToolsPictures} component={TakingToolsPicturesScreen} />
      <MainStack.Screen name={Screens.rentHistory} component={RentHistoryScreen} />
      <MainStack.Screen name={Screens.contactsInfo} component={ContactsInfoScreen} />
      <MainStack.Screen name={Screens.paymentsInfo} component={PaymentsInfoScreen} />
      <MainStack.Screen name={Screens.addPayments} component={AddPaymentsScreen} />
      <MainStack.Screen name={Screens.pointsHistory} component={PointsHistoryScreen} />
      <MainStack.Screen name={Screens.documents} component={DocumentsScreen} />
      <MainStack.Screen name={Screens.documentsEdit} component={DocumentsEditScreen} />
      <MainStack.Screen name={Screens.checkFailed} component={CheckFailedScreen} />
      <MainStack.Screen name={Screens.cellNotClosed} component={CellNotClosedScreen} />
      <MainStack.Screen name={Screens.payForTool} component={PayForToolScreen} />
      <MainStack.Screen name={Screens.orderCancel} component={OrderCancel} />
      <MainStack.Screen name={Screens.rentEndPin} component={RentEndPinScreen} />
      <MainStack.Screen name={Screens.pdfViewer} component={ToolsPdfScreen} />
      <MainStack.Screen name={Screens.faq} component={FAQScreen} />
      <MainStack.Screen name={Screens.mapFullScreen} component={MapFullScreen} />
      <MainStack.Screen name={Screens.emailAtRentBegin} component={EmailAtRentBeginScreen} />
      <MainStack.Screen name={Screens.rateUs} component={RateUsScreen} />
      <MainStack.Screen name={Screens.rentEndWarning} component={RentEndWarningScreen} />
    </MainStack.Navigator>
  );
};

export default MainNavigator;

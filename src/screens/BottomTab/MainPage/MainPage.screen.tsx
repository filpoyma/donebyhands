import React from 'react';
import { FlatList, KeyboardAvoidingView, ScrollView, View } from 'react-native';

import { Row, ScreenView } from '~components/view';
import SearchIcon from '~assets/icons/search.svg';
import MainPageHeader from '~components/widgets/headers/MainPage.header';
import TextInputLabeled from '~components/shared/input/TextInputLabeled.component';
import { HeaderText } from '~components/shared/text';
import ItemToolCard from '~components/widgets/Cards/ItemToolCard';
import ItemToolCardWide from '~components/widgets/Cards/ItemToolCardWide';
import ItemToolCardWideEmpty from '~components/widgets/Cards/ItemToolCardWideEmpty';
import { GapH16, GapH24 } from '~components/shared/GapH';
import { isIOS } from '~constants/platform.constants';
import { Screens } from '~constants/navigators.constants';
import CurrentRentBadgeComplex from '~components/modal/CurrentRentBadgeComplex';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import styles from '~screens/BottomTab/MainPage/MainPage.styles';
import { MainPageScreenProps, TModalNames } from '~typedefs/screens/MainPage';
import { useSelector } from 'react-redux';
import { selectCurrentRentedTools, selectTools } from '~redux/selectors';
import RentService from '~services/Rent.service';
import { useFocusEffect } from '@react-navigation/native';
import { IRentedTools } from '~typedefs/models/Tools.model';
import RentedToolsCardEmply from '~components/widgets/Cards/RentedToolsCardEmply';
import { badgeText } from '~utils/dateFormatters.utils';
import UserService from '~services/User.service';
import NotificationService from '~services/Notification.service';
import MapService from '~services/Map.service';
import SentryService from '~services/Sentry.service';

const MainPageScreen: React.FC<MainPageScreenProps> = ({ navigation }) => {
  const toolsCards = useSelector(selectTools);
  const currentRentedTools = useSelector(selectCurrentRentedTools);
  const [values, setValues] = React.useState({ search: '' });
  const [currentItem, setCurrentItem] = React.useState(currentRentedTools[0]);

  const modalName = React.useRef<TModalNames>('currentRent');
  const { isModalOpen, showModal, hideModal, hideModalAndOverlayLock } = useModalWithFade();
  const popularTools = React.useMemo(() => toolsCards.slice(0, 10).reverse(), [toolsCards]);

  useFocusEffect(
    React.useCallback(() => {
      RentService.getCurrentRentedTools().catch(e => {
        console.error('Error to get CurrentRentedTools', e?.message);
      });
      UserService.getUser().catch(e => {
        console.error('Error while initializing UserService', e?.message);
      });
      NotificationService.getNotifications().catch(e => {
        console.error('Error while getNotifications NotificationService', e?.message);
      });
      MapService.onLocationHandler().catch(err => {
        console.error('Request Permissions Error:', err?.message);
        SentryService.logError('onLocationHandler Error (MainPage)', err);
      });
    }, []),
  );

  // disable back gesture on ios and back action on android
  React.useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, []);

  const onChangeHandler = React.useCallback((name: string, value: string) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  const onSubmit = React.useCallback(() => {
    navigation.navigate(Screens.searchInCatalog, { search: values.search });
  }, [values, navigation]);

  const onPressCurrentRented = (item: IRentedTools) => {
    //заказ оформлен (оплачен)
    if (item.status_type === 3) {
      return navigation.navigate(Screens.rentPreStarted, {
        pin: item.pin,
        ended: item?.ended,
        orderId: item.id,
        postomatId: `${item?.parce_locker}`,
      });
    }

    //не оплачено
    if (item.status_type === 2)
      return navigation.navigate(Screens.payForTool, {
        orderId: item.id,
        contentId: item.content_type,
        postomatId: `${item?.parce_locker}`,
        paymentUrl: item.payment_url,
      });
    MapService.onLocationHandler().catch(e => {
      console.error('onLocationHandler err', e?.message);
      SentryService.logError('onLocationHandler Error (MainPage2)', e);
    });
    setCurrentItem(item);
    modalName.current = 'currentRent';
    showModal();
  };

  return (
    <ScreenView screenPaddings={false}>
      <MainPageHeader paddings />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'}>
            <View style={styles.search}>
              <TextInputLabeled
                name={'search'}
                value={values.search}
                onChangeTextNamed={onChangeHandler}
                LeftIcon={SearchIcon}
                placeholder="Поиск инструмента"
                labelError={values.search}
                hideBottomLabel={true}
                onSubmitEditing={onSubmit}
                keyboardType="web-search"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <View>
          <Row spaceBetween style={styles.title}>
            <HeaderText size="h3">Популярные инструменты</HeaderText>
            <HeaderText
              size="h4"
              style={styles.allTools}
              suppressHighlighting={true}
              onPress={() => {
                navigation.navigate(Screens.catalog);
              }}>
              Смотреть все
            </HeaderText>
          </Row>
          <View>
            <FlatList
              data={popularTools}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={GapH24}
              ListFooterComponent={GapH24}
              ItemSeparatorComponent={GapH16}
              ListEmptyComponent={RentedToolsCardEmply}
              renderItem={({ item }) => (
                <ItemToolCard
                  key={item.id}
                  imageUri={item.images[0]?.image}
                  title={item.name}
                  price={`${item.price}`}
                  onPress={() => navigation.navigate(Screens.toolsPage, { itemId: item.id })}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
          <Row>
            <HeaderText size="h4" style={styles.currentRent}>
              Текущая аренда
            </HeaderText>
          </Row>
          <View>
            <FlatList
              data={currentRentedTools}
              horizontal={true}
              scrollEnabled={currentRentedTools.length !== 0}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={GapH24}
              ListFooterComponent={GapH24}
              ItemSeparatorComponent={GapH16}
              ListEmptyComponent={ItemToolCardWideEmpty}
              renderItem={({ item }) => (
                <ItemToolCardWide
                  key={item.id}
                  imageUri={item.tool?.images[0].image}
                  title={item.tool?.name || ''}
                  badgeText={badgeText(item)}
                  is2RowsInBadge={item.status_type === 3}
                  onPress={() => onPressCurrentRented(item)}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        <CurrentRentBadgeComplex
          modalName={modalName}
          hideModal={hideModal}
          hideModalAndOverlayLock={hideModalAndOverlayLock}
          currentItem={currentItem}
          showModal={showModal}
        />
      </ModalWithFade>
    </ScreenView>
  );
};

export default MainPageScreen;

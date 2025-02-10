import React from 'react';

import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import RentedToolsListCards from '~components/widgets/Cards/RentedToolsListCards';
import { StackScreenProps } from '@react-navigation/stack';
import {
  MainStackParamList,
  Screens,
  TabNavigatorParamList,
} from '~constants/navigators.constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectRentedToolsModel } from '~redux/selectors';
import RentService from '~services/Rent.service';
import { rentActions } from '~redux/reducers/rent';
import { BottomTabScreenProps, CompositeScreenProps } from '~typedefs/screens';

type RentHistoryScreenProps = CompositeScreenProps<
  StackScreenProps<MainStackParamList, Screens.rentHistory>,
  BottomTabScreenProps<TabNavigatorParamList, Screens.catalog>
>;

const RentHistoryScreen: React.FC<RentHistoryScreenProps> = ({ navigation }) => {
  const historyRentCardsModel = useSelector(selectRentedToolsModel);
  const page = React.useMemo(() => historyRentCardsModel.page, [historyRentCardsModel.page]);
  const cards = historyRentCardsModel.list;
  const dispatch = useDispatch();

  async function getTopHeadline(page: number) {
    try {
      const res = await RentService.getRentedTools(page);
      if (res.next) {
        dispatch(
          rentActions.updateRentedToolsModel({
            ...historyRentCardsModel,
            list: [...cards, ...res.results],
            page: page,
            loading: false,
            moreLoading: false,
          }),
        );
      } else {
        dispatch(
          rentActions.updateRentedToolsModel({
            ...historyRentCardsModel,
            loading: false,
            moreLoading: false,
            isListEnd: true,
          }),
        );
      }
    } catch (err: any) {
      console.error('Err getTopHeadline', err?.message);
    }
  }

  const fetchMoreData = () => {
    if (!historyRentCardsModel.isListEnd && !historyRentCardsModel.moreLoading) {
      getTopHeadline(page + 1);
    }
  };
  //todo spinner
  return (
    <ScreenView screenPaddings={false}>
      <BackButtonHeader paddings title="История аренды" onBackButtonPress={navigation.goBack} />
      <RentedToolsListCards
        cards={cards}
        isHistory={true}
        fetchMoreData={fetchMoreData}
        navigation={navigation}
      />
    </ScreenView>
  );

  // return (
  //   <ScreenView screenPaddings={false}>
  //     <BackButtonHeader paddings title="История аренды" onBackButtonPress={navigation.goBack} />
  //     <View style={styles.container}>
  //       <HeaderText>Нет истории</HeaderText>
  //       <PlHolderText style={{ width: 180 }}>Вы не арендовали ни одного инструмента</PlHolderText>
  //     </View>
  //     <View style={styles.buttons}>
  //       <SecButton
  //         text={'Арендовать инструмент'}
  //         onPress={() => {
  //           navigation.navigate(Screens.catalog);
  //         }}
  //       />
  //     </View>
  //   </ScreenView>
  // );
};

export default RentHistoryScreen;

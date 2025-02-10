import React from 'react';
import Animated from 'react-native-reanimated';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import SearchIcon from '~assets/icons/searchB.svg';
import { Screens } from '~constants/navigators.constants';
import ItemToolCardCatalog from '~components/widgets/Cards/ItemToolCardCatalog';
import { CatalogScreenProps } from '~typedefs/screens/Catalog';
import { selectTools } from '~redux/selectors';
import { useFocusEffect } from '@react-navigation/native';
import RentService from '~services/Rent.service';
import { throttle } from '~utils/helpers.utils';
import styles from './Catalog.styles';
import { orderActions } from '~redux/reducers/order';
import columnStyles from '~utils/common.styles';
import OrderService from '~services/Order.service';

const getToolsThrottle = throttle(RentService.getTools, 2 * 60 * 1000);

const CatalogScreen: React.FC<CatalogScreenProps> = ({ navigation }) => {
  const toolsCards = useSelector(selectTools);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      getToolsThrottle();
    }, []),
  );

  return (
    <ScreenView screenPaddings={false}>
      <BackButtonHeader
        paddings
        title="Каталог инструментов"
        RightIcon={SearchIcon}
        onBackButtonPress={navigation.goBack}
        onRightButtonPress={() => navigation.navigate(Screens.searchInCatalog, { search: '' })}
      />
      <View>
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          data={toolsCards}
          numColumns={2}
          keyExtractor={item => `${item.id}`}
          columnWrapperStyle={styles.columnWrapper}
          // ListEmptyComponent={RentedToolsCardEmply}
          renderItem={({ item, index }) => (
            <View style={columnStyles(toolsCards.length, index, 64).wrapper}>
              <ItemToolCardCatalog
                key={item.id}
                itemId={item.id}
                imageUri={item.images[0].image}
                title={item.name}
                price={`${item.price}`}
                onPress={() => {
                  dispatch(orderActions.clearCurrentOrder(OrderService.getNearestParcelLockerId()));
                  navigation.navigate(Screens.toolsPage, { itemId: `${item.id}` });
                }}
              />
            </View>
          )}
        />
      </View>
    </ScreenView>
  );
};

export default CatalogScreen;

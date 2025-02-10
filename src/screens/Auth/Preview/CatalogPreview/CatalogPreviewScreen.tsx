import React from 'react';
import { FlatList, View } from 'react-native';

import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import { RootStackParamList, Screens } from '~constants/navigators.constants';
import ItemToolCardCatalog from '~components/widgets/Cards/ItemToolCardCatalog';
import styles from './CatalogPreview.styles';
import { useSelector } from 'react-redux';
import { selectTools } from '~redux/selectors';
import RentService from '~services/Rent.service';
import { StackScreenProps } from '@react-navigation/stack';
import columnStyles from '~utils/common.styles';
import ParcelLockerService from '~services/ParcelLocker.service';
import MapService from '~services/Map.service';

export type CatalogPreviewScreenProps = StackScreenProps<RootStackParamList, Screens.catalogUnAuth>;

const CatalogPreviewScreen: React.FC<CatalogPreviewScreenProps> = ({ navigation }) => {
  const toolsCards = useSelector(selectTools);

  React.useEffect(() => {
    if (toolsCards.length === 0) {
      RentService.getTools().catch(err => console.error('getTools error', err?.message));
      ParcelLockerService.getParcelLockerList().catch(err =>
        console.error('getParcelLockerList error', err?.message),
      );
      MapService.onLocationHandler().catch(console.error);
    }
  }, []);

  return (
    <ScreenView screenPaddings={false}>
      <BackButtonHeader
        paddings
        title="Каталог инструментов"
        onBackButtonPress={navigation.goBack}
      />
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={toolsCards}
          numColumns={2}
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
                onPress={() => navigation.navigate(Screens.toolsPreview, { toolId: item.id })}
              />
            </View>
          )}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </ScreenView>
  );
};

export default CatalogPreviewScreen;

import React from 'react';

import { FlatList, View } from 'react-native';
import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import TextInputLabeled from '~components/shared/input/TextInputLabeled.component';
import ItemToolCardCatalog from '~components/widgets/Cards/ItemToolCardCatalog';
import { Screens } from '~constants/navigators.constants';
import NothingFound from '~components/shared/NothingFound';
import useSearchDebounce from '~hooks/useSearchDebounce.hook';
import styles from './SearchInCatalog.styles';
import { SearchInCatalogScreenProps } from '~typedefs/screens/SearchInCatalog';
import { useSelector } from 'react-redux';
import { selectTools } from '~redux/selectors';

const SearchInCatalogScreen: React.FC<SearchInCatalogScreenProps> = ({ navigation, route }) => {
  const search = route.params?.search || '';
  const { values, setValues, debouncedValue } = useSearchDebounce(search);
  const toolsCards = useSelector(selectTools);

  const searchedTools = React.useMemo(
    () => toolsCards.filter(tool => new RegExp(debouncedValue, 'i').test(tool.name)),
    [debouncedValue, toolsCards],
  );

  const onChangeHandler = React.useCallback((name: string, value: string) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  return (
    <ScreenView screenPaddings={false}>
      <BackButtonHeader paddings title="Поиск по каталогу" onBackButtonPress={navigation.goBack} />
      <View style={styles.input}>
        <TextInputLabeled
          name="search"
          value={values.search}
          placeholder="Поиск инструмента"
          onChangeTextNamed={onChangeHandler}
          labelError={values.search}
          hideBottomLabel={true}
        />
      </View>
      <View style={styles.cards}>
        <FlatList
          data={searchedTools}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          ListEmptyComponent={NothingFound}
          renderItem={({ item, index }) => (
            <View style={toolsCards.length - 1 === index ? { marginBottom: 32, width: '96%' } : {}}>
              <ItemToolCardCatalog
                key={item.id}
                itemId={item.id}
                imageUri={item.images[0].image}
                title={item.name}
                price={item.price.toString()}
                onPress={() => navigation.navigate(Screens.toolsPage, { itemId: item.id })}
              />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </ScreenView>
  );
};

export default SearchInCatalogScreen;

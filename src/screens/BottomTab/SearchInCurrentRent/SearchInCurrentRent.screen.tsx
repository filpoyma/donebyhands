import React from 'react';
import { useSelector } from 'react-redux';

import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import TextInputLabeled from '~components/shared/input/TextInputLabeled.component';
import { StyleSheet, View } from 'react-native';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import RentedToolsListCards from '~components/widgets/Cards/RentedToolsListCards';
import useSearchDebounce from '~hooks/useSearchDebounce.hook';
import { SearchInCurrentRentScreenProps } from '~typedefs/screens/SearchInCurrentRent';
import { selectCurrentRentedTools } from '~redux/selectors';

const SearchInCurrentRentScreen: React.FC<SearchInCurrentRentScreenProps> = ({ navigation }) => {
  const { values, setValues, debouncedValue } = useSearchDebounce();

  const currentRentTools = useSelector(selectCurrentRentedTools);
  const regex = React.useMemo(() => new RegExp(debouncedValue, 'i'), [debouncedValue]);
  const searchedTools = React.useMemo(
    () => currentRentTools.filter(item => regex.test(item.tool.name)),
    [regex, currentRentTools],
  );
  const onChangeHandler = React.useCallback((name: string, value: string) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  return (
    <ScreenView screenPaddings={false}>
      <BackButtonHeader
        paddings
        title="Поиск в текущей аренде"
        onBackButtonPress={navigation.goBack}
      />
      <View style={styles.input}>
        <TextInputLabeled
          name="search"
          value={values.search}
          placeholder="Поиск..."
          onChangeTextNamed={onChangeHandler}
          labelError={values.search}
          hideBottomLabel={true}
        />
      </View>
      <RentedToolsListCards isSearch={true} cards={searchedTools} navigation={navigation} />
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  input: { marginBottom: 5, paddingHorizontal: SCREEN_PADDINGS.horizontal },
});

export default SearchInCurrentRentScreen;

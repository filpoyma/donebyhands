import React from 'react';

import { ScreenView } from '~components/view';
import { BackButtonHeader } from '~components/widgets/headers';
import SearchIcon from '~assets/icons/searchB.svg';
import { Screens } from '~constants/navigators.constants';
import RentedToolsListCards from '~components/widgets/Cards/RentedToolsListCards';
import { CurrentRentScreenProps } from '~typedefs/screens/CurrentRent';
import { useSelector } from 'react-redux';
import { selectCurrentRentedTools } from '~redux/selectors';

const CurrentRentScreen: React.FC<CurrentRentScreenProps> = ({ navigation }) => {
  const currentRentedTools = useSelector(selectCurrentRentedTools);
  return (
    <ScreenView screenPaddings={false}>
      <BackButtonHeader
        paddings
        title="Текущая аренда"
        RightIcon={SearchIcon}
        onBackButtonPress={navigation.goBack}
        onRightButtonPress={() => navigation.navigate(Screens.searchInCurrentRent)}
      />
      <RentedToolsListCards cards={currentRentedTools} navigation={navigation} />
    </ScreenView>
  );
};

export default CurrentRentScreen;

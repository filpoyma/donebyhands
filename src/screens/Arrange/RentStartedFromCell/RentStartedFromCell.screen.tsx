import React from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';

import { ScreenView } from '~components/view';
import { HeaderText } from '~components/shared/text';
import PlHolderText from '~components/shared/text/PlHolder.text';
import SecButton from '~components/shared/buttons/Sec.button';
import {
  MainStackParamList,
  Screens,
  TabNavigatorParamList,
} from '~constants/navigators.constants';
import ItemToolCardWideCurrentRent from '~components/widgets/Cards/ItemToolCardWideCurrentRent';
import styles from './RentStartedFromCell.styles';
import { RentStartedFromCellScreenProps } from '~typedefs/screens/RentStartedFromCell';
import { useSelector } from 'react-redux';
import { selectCurrentRentedTools } from '~redux/selectors';
import CheckBoxIcon from '~assets/icons/checkBox.svg';
import { RouteProp, useNavigation, useRoute, NavigationProp } from '@react-navigation/native';

type navProps = NavigationProp<MainStackParamList & TabNavigatorParamList>;
type routeProps = RouteProp<MainStackParamList, Screens.rentStartedFromCell>;

const RentStartedFromCellScreen: React.FC<RentStartedFromCellScreenProps> = () => {
  const navigation = useNavigation<navProps>();
  const route = useRoute<routeProps>();
  const { orderId } = route.params;
  const rentedTools = useSelector(selectCurrentRentedTools);
  const rentedTool = rentedTools.find(tool => tool.id === orderId);
  return (
    <ScreenView fullArea screenPaddings={false}>
      <View style={styles.container}>
        <HeaderText>Аренда начата</HeaderText>
        <PlHolderText>Пожалуйста, закройте ячейку за собой</PlHolderText>
        {rentedTool ? (
          <View style={styles.itemCard}>
            <ItemToolCardWideCurrentRent
              imageUri={rentedTool?.tool?.images[0].image}
              title={rentedTool?.tool?.name}
              badgeText={dayjs(rentedTool?.ended).format('[до] D MMMM[,] HH:mm')}
              BadgeIcon={CheckBoxIcon}
            />
          </View>
        ) : null}
      </View>
      <View style={styles.buttons}>
        <SecButton
          text={'На главную'}
          onPress={() => navigation.navigate(Screens.tabNavigator, { screen: Screens.mainPage })}
        />
      </View>
    </ScreenView>
  );
};

export default RentStartedFromCellScreen;

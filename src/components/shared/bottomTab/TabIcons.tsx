import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import GeoIconFill from '~assets/icons/geo2Fill.svg';
import GeoIcon from '~assets/icons/geo2.svg';
import HouseIcon from '~assets/icons/house.svg';
import HouseIconFill from '~assets/icons/houseRed.svg';
import CatalogIcon from '~assets/icons/tools.svg';
import CatalogIconFill from '~assets/icons/toolsFill.svg';
import CurrentRentIcon from '~assets/icons/clock.svg';
import CurrentRentIconFill from '~assets/icons/clockFill.svg';
import MoreIcon from '~assets/icons/threeDotsV.svg';
import MoreIconFill from '~assets/icons/threeDotsVFill.svg';
import { TSvgProps } from '~typedefs/common';
import { AppText } from '~components/shared/text';
import { Colors } from '~constants/colors.constants';
import { selectCurRentedToolsLength } from '~redux/selectors';

interface IIcons {
  [index: string]: React.FC<TSvgProps>;
}

const Icons: IIcons = {
  HouseIcon,
  HouseIconFill,
  GeoIcon,
  GeoIconFill,
  CatalogIcon,
  CatalogIconFill,
  MoreIcon,
  MoreIconFill,
  CurrentRentIcon,
  CurrentRentIconFill,
};

const TabIcons = ({
  name,
  size,
  focused,
  toolsAmount,
}: {
  name: string;
  size: number;
  focused: boolean;
  toolsAmount?: number;
}) => {
  const TabIcon = focused ? Icons[name + 'Fill'] : Icons[name];
  return (
    <View>
      <TabIcon width={size} height={size} />
      {name === 'CurrentRentIcon' && !!toolsAmount && (
        <View style={styles.badge}>
          <AppText style={styles.badgeText}>{toolsAmount}</AppText>
        </View>
      )}
    </View>
  );
};

export const HouseIconTab = (props: { size: number; focused: boolean }) => (
  <TabIcons name={'HouseIcon'} {...props} />
);
export const GeoIconTab = (props: { size: number; focused: boolean }) => (
  <TabIcons name={'GeoIcon'} {...props} />
);
export const CatalogIconTab = (props: { size: number; focused: boolean }) => (
  <TabIcons name={'CatalogIcon'} {...props} />
);
export const CurrentRentIconTab = (props: { size: number; focused: boolean }) => {
  const currentRentedToolsAmount = useSelector(selectCurRentedToolsLength);
  return <TabIcons name={'CurrentRentIcon'} toolsAmount={currentRentedToolsAmount} {...props} />;
};
export const MoreIconTab = (props: { size: number; focused: boolean }) => (
  <TabIcons name={'MoreIcon'} {...props} />
);

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 14,
    height: 14,
    backgroundColor: Colors.red,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 9,
    fontFamily: 'Inter-SemiBold',
  },
});

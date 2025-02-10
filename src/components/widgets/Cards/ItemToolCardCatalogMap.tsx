import React from 'react';
import { View } from 'react-native';

import ItemToolCardCatalog from '~components/widgets/Cards/ItemToolCardCatalog';
import { ITool } from '~typedefs/models/Tools.model';
import columnStyles from '~utils/common.styles';

const ItemToolCardCatalogMap = ({
  size,
  item,
  index,
  onPress,
}: {
  size: number;
  item: ITool;
  index: number;
  onPress: (id?: string) => void;
}) => {
  return (
    <View key={item.id} style={columnStyles(size, index, 32).wrapper}>
      <ItemToolCardCatalog
        imageUri={item.images[0].image}
        itemId={item.id}
        title={item.name}
        price={`${item.price}`}
        onPress={onPress}
      />
    </View>
  );
};

export default ItemToolCardCatalogMap;

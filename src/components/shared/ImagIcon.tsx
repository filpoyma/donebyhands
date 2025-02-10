import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '~constants/colors.constants';
import { TSvgComponent } from '~typedefs/common';
import RowView from '~components/view/Row.view';

const ImageIcon = ({
  uri,
  Icon,
  selected = false,
  style,
  onPress,
  text,
}: {
  uri?: string;
  Icon?: TSvgComponent;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  text?: string;
}) => {
  return (
    <View
      style={[
        styles.container,
        selected && { borderWidth: 1, borderColor: Colors.red, marginRight: 11 },
        style,
      ]}>
      <Pressable onPress={onPress}>
        <RowView>
          {Icon ? (
            <View style={styles.icon}>
              <Icon />
            </View>
          ) : (
            <View style={{ zIndex: 5 }}>
              <Image
                source={{ uri, cache: 'force-cache' }}
                resizeMode="contain"
                height={48}
                width={48}
                borderRadius={12}
              />
            </View>
          )}
          {!!text && <Text style={styles.text}>{text}</Text>}
        </RowView>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  icon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.black,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    paddingVertical: 10,
    paddingRight: 10,
    marginLeft: -5,
  },
});

export default ImageIcon;

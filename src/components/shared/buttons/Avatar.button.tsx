import React from 'react';

import PersonIcon from '~assets/icons/person.svg';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '~constants/colors.constants';
import PencilIcon from '~assets/icons/pencilSquare.svg';

const AvatarButton = ({
  imageUri,
  onPress,
  big = false,
}: {
  imageUri?: string | null;
  onPress: () => void;
  big?: boolean;
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
    <View style={big ? styles.photoAvatar : styles.photo}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri, cache: 'force-cache' }}
          resizeMode="cover"
          style={big ? styles.imageStyleAvatar : styles.imageStyle}
        />
      ) : (
        <PersonIcon width={big ? 32 : 24} height={big ? 32 : 24} />
      )}
    </View>
    {big && (
      <View style={styles.editIcon}>
        <PencilIcon height={16} width={16} fill={Colors.white} />
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  photo: {
    width: 50,
    height: 50,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden',
  },
  photoAvatar: {
    width: 80,
    height: 80,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    overflow: 'hidden',
  },
  editIcon: {
    position: 'absolute',
    left: 57,
    bottom: 0,
    backgroundColor: Colors.red,
    borderRadius: 12,
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
  imageStyleAvatar: {
    width: 80,
    height: 80,
  },
});

export default AvatarButton;

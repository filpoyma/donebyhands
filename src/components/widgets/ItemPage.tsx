import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';

import { Colors } from '~constants/colors.constants';
import { Row } from '~components/view';
import ImagIcon from '~components/shared/ImagIcon';
import InfoIcon from '~assets/icons/info2CircleFill.svg';
import YearMarkIcon from '~assets/icons/yearMark.svg';
import { placeholderUri } from '~constants/api.constants';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import { hp, wp } from '~utils/dimensions.utils';
import InfoBageScroll from '~components/modal/InfoBageScroll';
import Animated, { FadeIn, FadeOut, Easing } from 'react-native-reanimated';

const ItemPage = ({
  item,
}: {
  item: {
    images: { id: string; uri: string }[];
    description: string;
    onPressInstruction: () => void;
    id: string | undefined;
  };
}) => {
  const [imageId, setImageId] = React.useState(item.images[0]?.id);
  const { isModalOpen, showModal, hideModal } = useModalWithFade();
  const currentImage = item.images.find(image => image.id === imageId) || {
    id: '1',
    uri: placeholderUri,
  };
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  React.useEffect(() => {
    Promise.all(item.images.map(image => Image.prefetch(image.uri)))
      .then(() => console.log('images cached'))
      .catch(err => {
        console.log('imgages cached err err:', err);
      });
  }, []);

  return (
    <Row style={styles.container}>
      <AnimatedImage
        entering={FadeIn}
        exiting={FadeOut.easing(Easing.quad)}
        source={{ uri: currentImage.uri, cache: 'force-cache' }}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.infoIcon}>
        <ImagIcon Icon={InfoIcon} onPress={showModal} />
        <ImagIcon Icon={YearMarkIcon} onPress={item.onPressInstruction} text={'Инструкция'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.thumbsImages}>
          {item.images.map(image => {
            return (
              <ImagIcon
                key={image.id}
                uri={image.uri || placeholderUri}
                selected={imageId === image.id}
                onPress={() => setImageId(image.id)}
              />
            );
          })}
        </View>
      </ScrollView>
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        <InfoBageScroll
          titleText="Описание"
          contentText={item.description}
          buttonText="Закрыть"
          hideModal={hideModal}
        />
      </ModalWithFade>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(260),
    width: '100%',
    backgroundColor: Colors.grey2,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 1,
  },
  thumbsImages: { flex: 1, alignItems: 'flex-end', gap: 12, marginVertical: 12 },
  image: {
    height: hp(260),
    width: wp(260),
    backgroundColor: Colors.grey2,
  },
  infoIcon: {
    marginTop: 'auto',
    margin: 14,
    alignItems: 'flex-start',
    zIndex: 5,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
});

export default ItemPage;

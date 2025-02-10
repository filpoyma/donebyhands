import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import InfoBage from './InfoBage';
import { useSwipeVert } from '~hooks/useSwipeVert';

const InfoBageScroll = ({
  hideModal,
  titleText,
  contentText,
  buttonText,
  secButtonText,
  secButtonOnPress = () => {},
  noSwipe = false,
}: {
  hideModal: () => void;
  titleText: string;
  contentText: string;
  buttonText: string;
  secButtonText?: string;
  secButtonOnPress?: () => void;
  noSwipe?: boolean;
}) => {
  const { height } = useWindowDimensions();
  const { onTouchStart, onScrollEndDrag, onTouchEnd } = useSwipeVert(onSwipe, 5);
  function onSwipe(action: string) {
    if (noSwipe) return;
    if (action === 'down') hideModal();
  }
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingTop: height / 4,
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onScrollEndDrag={onScrollEndDrag}>
      <InfoBage
        hideModal={hideModal}
        titleText={titleText}
        contentText={contentText}
        buttonText={buttonText}
        secButtonText={secButtonText}
        secButtonOnPress={secButtonOnPress}
      />
    </ScrollView>
  );
};

export default InfoBageScroll;

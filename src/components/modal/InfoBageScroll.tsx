import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import InfoBage from './InfoBage';
import { useSwipeVert } from '~hooks/useSwipeVert';
import { TSvgProps } from '~typedefs/common';

const InfoBageScroll = ({
  hideModal,
  titleText,
  contentText,
  buttonText,
  buttonOnPress = () => {},
  secButtonText,
  secButtonOnPress = () => {},
  noSwipe = false,
  textAlign,
  TitleIcon,
}: {
  hideModal: () => void;
  titleText: string;
  contentText: string;
  buttonText: string;
  secButtonText?: string;
  buttonOnPress?: () => void;
  secButtonOnPress?: () => void;
  noSwipe?: boolean;
  TitleIcon?: React.FC<TSvgProps>;
  textAlign?: 'left' | 'center';
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
      keyboardShouldPersistTaps="handled"
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
        buttonOnPress={buttonOnPress}
        secButtonText={secButtonText}
        secButtonOnPress={secButtonOnPress}
        textAlign={textAlign}
        TitleIcon={TitleIcon}
      />
    </ScrollView>
  );
};

export default InfoBageScroll;

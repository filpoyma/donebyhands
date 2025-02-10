import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Row } from '~components/view';
import { HeaderText } from '~components/shared/text';
import { SCREEN_PADDINGS } from '~constants/screen.constants';
import BackIcon from '~assets/icons/arrowLeftShort.svg';
import IconButton from '../../shared/buttons/Icon.button';
import { TSvgComponent } from '~typedefs/common';

interface IProps {
  onBackButtonPress: () => void;
  title?: string;
  paddings?: boolean;
  RightIcon?: TSvgComponent;
  onRightButtonPress?: () => void;
  canGoBack?: boolean;
}

const BackButtonHeader: React.FC<IProps> = ({
  onBackButtonPress,
  title,
  paddings,
  RightIcon,
  onRightButtonPress,
  canGoBack = true,
}) => {
  return (
    <Row style={[styles.container, paddings && { paddingHorizontal: SCREEN_PADDINGS.horizontal }]}>
      {canGoBack && <IconButton Icon={BackIcon} size={32} onPress={onBackButtonPress} />}
      <View style={[styles.headerText, !RightIcon && { marginRight: 32 }]}>
        {title && <HeaderText size="h3">{title}</HeaderText>}
      </View>
      {RightIcon && <IconButton Icon={RightIcon} size={32} onPress={onRightButtonPress} />}
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
});

export default React.memo(BackButtonHeader);

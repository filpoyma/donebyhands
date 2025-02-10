import React from 'react';

import { ScreenView } from '~components/view';
import { HeaderText } from '~components/shared/text';

const DollScreen = () => {
  return (
    <ScreenView screenPaddings={false}>
      <HeaderText>DollScreen</HeaderText>
    </ScreenView>
  );
};

export default DollScreen;

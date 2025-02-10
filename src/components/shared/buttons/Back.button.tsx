import React from 'react';

import IconButton from './Icon.button';

import BackIcon from '~assets/icons/arrowLeftShort.svg';
import { IIconButtonProps } from '~components/shared/buttons/interfaces';

const BackButton: React.FC<Omit<IIconButtonProps, 'Icon'>> = props => (
  <IconButton {...props} Icon={BackIcon} size={32} />
);

export default BackButton;

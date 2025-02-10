import React from 'react';

export const useOverlay = () => {
  const [isOverlayShown, setShown] = React.useState<boolean>(false);
  const closeOverlay = React.useCallback(() => {
    setShown(false);
  }, []);

  const openOverlay = React.useCallback(() => {
    setShown(true);
  }, []);

  return {
    closeOverlay,
    openOverlay,
    isOverlayShown,
  };
};

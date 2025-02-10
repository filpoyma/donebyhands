import React, { useCallback, useRef } from 'react';
import FlashMessage, { MessageType } from 'react-native-flash-message';

import InAppMessageService from '~services/InAppMessage.service';

const useFlashMessage = () => {
  const flashMessageRef = useRef<FlashMessage>(null);

  const renderFlashMessage = useCallback(
    () => <FlashMessage position="top" ref={flashMessageRef} />,
    [],
  );

  const showFlashMessage = useCallback((message: string, type: MessageType) => {
    const options = InAppMessageService.getOptions(type);
    flashMessageRef.current?.showMessage({ ...options, message });
  }, []);

  return { renderFlashMessage, showFlashMessage };
};

export default useFlashMessage;

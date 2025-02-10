import React from 'react';
import { Keyboard } from 'react-native';

export const useKeyboardView = () => {
  const [isOnScreen, setIsOnScreen] = React.useState(true);
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsOnScreen(false); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsOnScreen(true); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return { isOnScreen };
};

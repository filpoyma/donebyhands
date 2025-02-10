import * as React from 'react';
import { Modal, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { IModalBageProps } from './interfaces';
import { appActions } from '~redux/reducers/app';

const ModalWithFade: React.FC<IModalBageProps> = ({ isModalOpen, hideModal, children }) => {
  return (
    <Modal visible={isModalOpen} transparent={true} animationType={'slide'}>
      <TouchableWithoutFeedback onPress={hideModal}>
        <View style={styles.modalContainerStyle}>{children}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ModalWithFade;

export const useModalWithFade = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const dispatch = useDispatch();
  const showModal = React.useCallback(
    (overlayShown = true) => {
      overlayShown && dispatch(appActions.setOverlayShown(true));
      setIsModalOpen(true);
    },
    [dispatch],
  );
  const hideModal = React.useCallback(() => {
    dispatch(appActions.setOverlayShown(false));
    setIsModalOpen(false);
  }, [dispatch]);

  const hideModalAndOverlayLock = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    showModal,
    hideModal,
    hideModalAndOverlayLock,
  };
};

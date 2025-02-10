import React from 'react';
import SupportBage from '~components/modal/SupportBage';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { selectSupportLink, selectSupportPhNumber } from '~redux/selectors';
import { isIOS } from '~constants/platform.constants';

const SupportBageWrap = ({ hideModal }: { hideModal: () => void }) => {
  const supportLink = useSelector(selectSupportLink);
  const supportPhNumber = useSelector(selectSupportPhNumber);
  return (
    <SupportBage
      hideModal={hideModal}
      titleText="Техническая поддержка"
      buttonText="Написать в чат"
      secButtonText="Позвонить"
      buttonOnPress={() => {
        Linking.openURL(supportLink).catch(err => {
          console.warn('Error from support ', err);
        });
      }}
      secButtonOnPress={() => {
        Linking.openURL(isIOS ? `tel://${supportPhNumber}` : `tel:${supportPhNumber}`).catch(
          err => {
            console.warn('Error from call to us ', err);
          },
        );
      }}
    />
  );
};

export default SupportBageWrap;

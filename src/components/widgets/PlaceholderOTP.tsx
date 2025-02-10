import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PlHolderText from '~components/shared/text/PlHolder.text';
import { Colors } from '~constants/colors.constants';
import ModalWithFade, { useModalWithFade } from '~components/modal/ModalWithFade';
import InfoBageScroll from '~components/modal/InfoBageScroll';

const PlHolderButtons = ({
  timer,
  onPressSupport,
  onPressResend,
}: {
  timer: number;
  onPressSupport: () => void;
  onPressResend: () => void;
}) => (
  <TouchableOpacity onPress={timer > 0 ? onPressSupport : onPressResend}>
    <PlHolderText style={styles.dangerText}>
      {timer > 0 ? 'Не пришел код?' : 'Отправить код заново'}
    </PlHolderText>
  </TouchableOpacity>
);

const PlaceholderOtp = ({
  value,
  correctOTP,
  timer,
  onPressResend,
}: {
  value: string;
  correctOTP: null | boolean;
  timer: number;
  onPressResend: () => void;
}) => {
  const { isModalOpen, showModal, hideModal } = useModalWithFade();
  return (
    <View>
      {value.length <= 4 && correctOTP === null ? (
        <>
          <View style={styles.placeholder}>
            <PlHolderText>Код действует {timer}-секунд</PlHolderText>
          </View>
          <PlHolderButtons timer={timer} onPressSupport={showModal} onPressResend={onPressResend} />
        </>
      ) : correctOTP ? (
        <View style={styles.placeholder}>
          <PlHolderText style={styles.okText}>Введен верный код</PlHolderText>
        </View>
      ) : (
        <>
          <View style={styles.placeholder}>
            <PlHolderText style={styles.dangerText}>Введен неверный код</PlHolderText>
            <PlHolderText>Попробуйте ввести заново.</PlHolderText>
          </View>
          <PlHolderButtons timer={timer} onPressSupport={showModal} onPressResend={onPressResend} />
        </>
      )}
      <ModalWithFade isModalOpen={isModalOpen} hideModal={hideModal}>
        <InfoBageScroll
          titleText="Не приходит код"
          contentText={`Проверьте, что:
                        <p>— Вы ввели правильный номер</p>
                        <p>— Ваш телефон находится в зоне действия сети</p>
                        <p>Иногда СМС приходит не сразу. Если СМС не приходит больше пяти минут, попробуйте получить код ещё раз.</p>
                        <p>Если это не помогло, свяжитесь с поддержкой.</p>`}
          buttonText="Закрыть"
          hideModal={hideModal}
        />
      </ModalWithFade>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    marginTop: 21,
    height: 42,
    marginBottom: 35,
  },
  dangerText: {
    color: Colors.red,
  },
  okText: {
    color: Colors.green,
  },
});

export default PlaceholderOtp;

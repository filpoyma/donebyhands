import React, { useState } from 'react';
import { Image, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { ScreenView } from '~components/view';
import { AppText, HeaderText } from '~components/shared/text';
import SecButton from '~components/shared/buttons/Sec.button';
import { Screens } from '~constants/navigators.constants';
import styles from './RateUs.styles';
import { RateUsScreenProps } from '~typedefs/screens/RateUs';
import RateUsStars from '~components/widgets/RateUsStars';
import { BaseButton } from '~components/shared/buttons';
import TextInputLabeled from '~components/shared/input/TextInputLabeled.component';
import { GapV24 } from '~components/shared/GapH';
import RentService from '~services/Rent.service';
import { useKeyboardView } from '~hooks/useKeyboardView.hook';
import { errorHandler } from '~utils/errorHandlers.utils';
import { isDev } from '~constants/platform.constants';
import InAppMessageService from '~services/InAppMessage.service';

const RateUsScreen: React.FC<RateUsScreenProps> = ({ navigation, route }) => {
  const { points, orderId } = route.params || {};

  const [values, setValues] = React.useState({ review: '' });
  const [rating, setRating] = useState(0);
  const { isOnScreen } = useKeyboardView();

  const onChangeHandler = React.useCallback((name: string, value: string) => {
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  const navigateToRentCompleted = () => {
    navigation.navigate(Screens.rentCompleted, { orderId, points });
  };

  const submitReview = () => {
    RentService.setValuation(orderId, rating, values.review)
      .then(() => {
        navigateToRentCompleted();
      })
      .catch(err => {
        isDev
          ? errorHandler('submitReview Err: ', err)
          : InAppMessageService.danger('Ошибка при отправке отзыва.');
      });
  };

  return (
    <ScreenView bottomOnly screenPaddings={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.titleImage}>
            <Image
              source={require('~assets/images/starTitleRates.png')}
              style={{ width: 122, height: 122 }}
            />
          </View>
          <View style={styles.container}>
            <HeaderText size="h2">Оставьте отзыв</HeaderText>
            <RateUsStars rating={rating} setRating={setRating} />
            <View style={styles.subTitleContainer}>
              <AppText style={styles.subtitle}>
                Вы можете поделиться впечатлениями от аренды
              </AppText>
            </View>
            <TextInputLabeled
              name="review"
              value={values.review}
              onChangeTextNamed={onChangeHandler}
              placeholder="Напишите ваш отзыв"
              autoCapitalize="sentences"
              onSubmitEditing={submitReview}
            />
          </View>
          <GapV24 />
          {isOnScreen && (
            <View style={styles.buttons}>
              <BaseButton text="Отправить отзыв" onPress={submitReview} disabled={!rating} />
              <SecButton text={'Пропустить оценку'} onPress={navigateToRentCompleted} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScreenView>
  );
};

export default RateUsScreen;

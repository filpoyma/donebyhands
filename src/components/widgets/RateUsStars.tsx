import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import StarIconOut from '../../assets/icons/starRateOutline.svg';
import StarIcon from '../../assets/icons/starRate.svg';

const RateUsStars: React.FC<{
  numStars?: number;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}> = ({ numStars = 5, rating, setRating }) => {
  const animation = useSharedValue(1);

  const rate = (star: number) => {
    setRating(star);
  };

  const animateRating = () => {
    animation.value = withTiming(2, { duration: 300 }, () => {
      animation.value = 1;
    });
  };

  const animationStyle = useAnimatedStyle(() => {
    const scale = interpolate(animation.value, [1, 1.5, 2], [1, 1.2, 1]);
    const rotate = interpolate(animation.value, [1, 1.25, 1.75, 2], [0, -4, 4, 0]) + 'deg';
    const opacity = interpolate(animation.value, [1, 1.25, 2], [1, 0.7, 1]);

    return {
      transform: [{ scale }, { rotate }],
      opacity,
    };
  });

  const stars = [];
  for (let x = 1; x <= numStars; x++) {
    stars.push(
      <TouchableWithoutFeedback
        key={x}
        onPress={() => {
          rate(x);
          animateRating();
        }}>
        <Animated.View style={x <= rating ? animationStyle : undefined}>
          <View style={styles.star}>{x <= rating ? <StarIcon /> : <StarIconOut />}</View>
        </Animated.View>
      </TouchableWithoutFeedback>,
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>{stars}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: { marginHorizontal: 4 },
});

export default RateUsStars;

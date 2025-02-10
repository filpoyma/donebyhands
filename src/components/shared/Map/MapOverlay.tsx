import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const MapOverlay = () => {
  const animationDuration = 600;
  const animationDelay = 400;
  const unmountDelay = animationDelay + animationDuration + 100;

  const [isMount, setIsMount] = React.useState(true);

  const backgroundColor = useSharedValue('rgba(240, 240, 240, 1)');
  const animatedStyles = useAnimatedStyle(() => ({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: backgroundColor.value,
  }));
  const startAnimation = () => {
    backgroundColor.value = withDelay(
      animationDelay,
      withTiming('rgba(240, 240, 240, 0)', { duration: animationDuration }),
    );
  };
  React.useEffect(() => {
    startAnimation();
    setTimeout(() => {
      setIsMount(false); //todo
    }, unmountDelay);
  }, []);

  return isMount ? <Animated.View style={animatedStyles} /> : null;
};

export default MapOverlay;

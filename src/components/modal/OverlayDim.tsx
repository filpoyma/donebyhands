import React from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '~redux/reducers/app';
import { selectOverlayState } from '~redux/selectors';

const OverlayDim: React.FC = () => {
  const isOverlayShown = useSelector(selectOverlayState);
  const [isMounted, setIsMounted] = React.useState(false);
  const dispatch = useDispatch();
  //const windowDimensions = useWindowDimensions();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    if (isOverlayShown) {
      Animated.timing(fadeAnim, {
        toValue: 0.6,
        duration: 250,
        useNativeDriver: true,
      }).start();
      setIsMounted(true);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setIsMounted(false);
      }, 250);
    }
  }, [isOverlayShown]);

  return (
    <>
      {isMounted ? (
        <Animated.View
          style={[styles.overlay, { height: '100%', width: '100%' }, { opacity: fadeAnim }]}>
          <Pressable onPress={() => dispatch(appActions.setOverlayShown(false))} />
        </Animated.View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default OverlayDim;

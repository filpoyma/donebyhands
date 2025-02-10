import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export function useSwipeHor(onSwipe: any, rangeOffset = 4) {
  let firstTouch = 0;

  function onTouchStart(e: any) {
    firstTouch = e.nativeEvent.pageX;
  }

  function onTouchEnd(e: any) {
    const positionX = e.nativeEvent.pageX;
    const range = windowWidth / rangeOffset;

    if (positionX - firstTouch > range) {
      onSwipe && onSwipe('right');
    } else if (firstTouch - positionX > range) {
      onSwipe && onSwipe('left');
    }
  }

  return { onTouchStart, onTouchEnd };
}

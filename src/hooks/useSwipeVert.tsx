import {
  Dimensions,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
const windowHeight = Dimensions.get('window').height;

export function useSwipeVert(onSwipe: any, rangeOffset = 4) {
  let firstTouch: number = 0;
  let endDragpositionY: null | number = null;

  function onTouchStart(e: GestureResponderEvent) {
    firstTouch = e.nativeEvent.pageY;
  }
  function onScrollEndDrag(e: NativeSyntheticEvent<NativeScrollEvent>) {
    endDragpositionY = e.nativeEvent.contentOffset.y;
    console.log('file-useSwipeVert.tsx onScrollEndDrag:');
    if (endDragpositionY === 0) {
      onSwipe && onSwipe('down');
    }
  }

  function onTouchEnd(e: GestureResponderEvent) {
    console.log('file-useSwipeVert.tsx onTouchEnd:');
    let positionY = e.nativeEvent.pageY;
    const range = windowHeight / rangeOffset;
    if (positionY - firstTouch > range) {
      onSwipe && (endDragpositionY === 0 || endDragpositionY === null) && onSwipe('down');
    } else if (firstTouch - positionY > range) {
      onSwipe && onSwipe('up');
    }
  }

  return { onTouchStart, onTouchEnd, onScrollEndDrag };
}

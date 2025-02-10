import React, { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { HeaderText } from '~components/shared/text';
import { Colors } from '~constants/colors.constants';

const ThumbComponent = () => <View style={styles.thumb} />;

const TrackMarkComponent = () => (
  <View style={styles.trackContainer}>
    <View style={styles.trackBrPoints} />
  </View>
);

const HorizontalSlider = ({
  name,
  onSlidingComplete,
  initialPoints = 0,
  maxPoints = 0,
}: {
  name: string;
  onSlidingComplete: (name: string, value: number) => void;
  initialPoints?: number;
  maxPoints: number;
}) => {
  const [sliderValue, setSliderValue] = useState(initialPoints);

  const trackMarks = [
    (maxPoints * 25) / 100,
    (maxPoints * 50) / 100,
    (maxPoints * 75) / 100,
    maxPoints,
  ];
  //2500 баддов - 17 20 баллов - 7
  const step = Math.floor(maxPoints / 17);
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };
  const { width } = useWindowDimensions();
  const onSlidingCompleteHandler = (value: number[]) => {
    trackMarks.forEach(trackMark => {
      if (value[0] > trackMark - step && value[0] < trackMark + step) {
        setSliderValue(trackMark);
      }
    });
    onSlidingComplete(name, Math.round(value[0]));
  };
  return (
    <View style={styles.container}>
      <Slider
        trackStyle={{ height: 11, borderRadius: 6, width: width - 95 }}
        // step={1}
        renderThumbComponent={ThumbComponent}
        renderTrackMarkComponent={TrackMarkComponent}
        trackMarks={trackMarks}
        minimumValue={0}
        maximumValue={maxPoints}
        value={sliderValue}
        onValueChange={handleSliderChange}
        onSlidingComplete={onSlidingCompleteHandler}
        minimumTrackTintColor={Colors.red}
        maximumTrackTintColor={Colors.grey}
      />
      <HeaderText size="h2" style={styles.text}>
        {Math.round(sliderValue)}
      </HeaderText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: Colors.red,
  },
  trackContainer: {
    width: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  trackBrPoints: {
    width: 6,
    height: 6,
    backgroundColor: Colors.red,
    borderRadius: 3,
  },
  text: { marginLeft: 10, width: 60 },
});

export default HorizontalSlider;

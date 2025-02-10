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
  maximumValue = 10,
  onSlidingComplete,
}: {
  name: string;
  onSlidingComplete: (name: string, value: number) => void;
  maximumValue?: number;
}) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };
  const { width } = useWindowDimensions();
  React.useEffect(() => {
    setSliderValue(0);
  }, [maximumValue]);

  return (
    <View style={styles.container}>
      <Slider
        trackStyle={{ height: 11, borderRadius: 6, width: width - 95 }}
        renderThumbComponent={ThumbComponent}
        renderTrackMarkComponent={TrackMarkComponent}
        minimumValue={0}
        maximumValue={maximumValue}
        value={sliderValue}
        onValueChange={handleSliderChange}
        onSlidingComplete={() => onSlidingComplete(name, Math.round(sliderValue))}
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
    backgroundColor: 'white',
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

export default React.memo(HorizontalSlider);

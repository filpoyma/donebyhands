import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '~constants/colors.constants';

const ToggleSwitch = ({
  isEnabled,
  setIsEnabled,
  onClickDisabled = false,
  onTogleSwitch,
}: {
  isEnabled: boolean | null;
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean | null>>;
  onClickDisabled?: boolean;
  onTogleSwitch?: (toggleState: boolean) => void;
}) => {
  const positionButton = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isEnabled) {
      Animated.timing(positionButton, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(positionButton, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isEnabled]);

  const positionInterPol = positionButton.interpolate({ inputRange: [0, 1], outputRange: [0, 20] });
  const backgroundColorAnim = positionButton.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.weak, Colors.primary],
  });

  const onPress = () => {
    setIsEnabled(prevState => {
      onTogleSwitch && onTogleSwitch(!prevState);
      return !prevState;
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={{ height: 24, width: 44 }} onPress={onClickDisabled ? undefined : onPress}>
        <Animated.View
          style={[
            styles.mainStyes,
            {
              backgroundColor: backgroundColorAnim,
            },
          ]}>
          <Animated.View
            style={[
              styles.basicStyle,
              {
                transform: [
                  {
                    translateX: positionInterPol,
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  basicStyle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    backgroundColor: '#FFF',
    marginTop: 2,
    marginLeft: 2,
  },

  mainStyes: {
    borderRadius: 30,
    backgroundColor: '#81b0ff',
    height: 24,
    width: 44,
  },
});

export default ToggleSwitch;

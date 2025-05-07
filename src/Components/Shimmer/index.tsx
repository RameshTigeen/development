import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

import Animated, {withRepeat, withTiming, useSharedValue, useAnimatedStyle} from 'react-native-reanimated';

import useTheme from '../../Hook/Utility/useTheme';

export type ShimmerWrapperProps = {
  shimmerStyle?: ViewStyle;
  color?: string;
};

export default function ShimmerWrapper({shimmerStyle, color}: ShimmerWrapperProps) {
  const translateX = useSharedValue(-1);

  React.useEffect(() => {
    translateX.value = withRepeat(withTiming(1, {duration: 1200}), -1, false);

    return () => {
      translateX.value = -1;
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: `${translateX.value * 100}%`,
        },
      ],
    };
  });

  const Theme = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: Theme.colors.infoBackground,
        },
        styles.shimmerContainer,
        shimmerStyle,
      ]}>
      <Animated.View
        style={[
          styles.shimmerOverlay,
          {
            backgroundColor: color,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shimmerContainer: {
    overflow: 'hidden',
    position: 'relative',
  },
  shimmerOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '200%',
    transform: [{rotate: '45deg'}],
    opacity: 0.1,
  },
});

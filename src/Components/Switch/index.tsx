import React from 'react';
import {Pressable} from 'react-native';

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import useTheme from '../../Hook/Utility/useTheme';

import {ModerateScale} from '../../Config/Theme';

export interface SwitchRef {
  /**
   * Switch Forward Ref Methods
   *
   * focus Function to trigger the event to focus the switch to be toggle
   */
  focus: () => void;
}

export interface SwitchProp {
  /**
   * #required callback function trigger when the value to be change
   *
   * @type {void}
   */
  onChange: (value: boolean) => void;
  /**
   * #Optional color value defines to changes default switch's Active color to be customizable #Default: tomato
   *
   * @type {string}
   */
  activeColor?: string;
  /**
   * #Optional color value defines to changes default switch's Inactive color to be customizable #Default: tomato
   *
   * @type {string}
   */
  inactiveColor?: string;
  /**
   * #Optional color value defines to changes default track ball's color to be customizable #Default: white
   *
   * @type {string}
   */
  trackBallColor?: string;
  /**
   * #Optional Duration that increase the number to get the better animation smooth's value
   *
   * @type {string}
   */
  duration?: number;
  /**
   * #Optional The size of switch's height to be measurable to be custom size
   *
   * @type {number}
   */
  switchSize?: number;
}

const Switch = React.forwardRef<SwitchRef, SwitchProp>(
  ({duration = 500, onChange, activeColor, inactiveColor, trackBallColor, switchSize = ModerateScale(40)}, ref) => {
    const Theme = useTheme();

    // Track Background Color
    const defaultInActiveColor = inactiveColor ?? Theme.colors.infoBackground;
    const defaultTrackBallColor = trackBallColor ?? Theme.colors.light;
    const defaultActiveColor = activeColor ?? Theme.colors.highlight;

    const switchHeight = switchSize;
    const isOn = useSharedValue(false);
    const switchWidth = Number(switchSize) * 2.5;

    const handlePress = () => {
      isOn.value = !isOn.value;
      onChange(Boolean(isOn.value));
    };

    // Track ( Background ) Animated Styles Declare Here

    const trackAnimatedStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(Number(isOn.value), [0, 1], [defaultActiveColor, defaultInActiveColor]),
      borderRadius: switchHeight / 2,
    }));

    // Track Ball Animated Styles Declare Here

    const thumbAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: withTiming(interpolate(Number(isOn.value), [0, 1], [0, switchWidth - switchHeight]), {duration}),
        },
      ],

      borderRadius: switchHeight / 2,
    }));

    // React Hooks

    React.useImperativeHandle(
      ref,
      () => {
        return {
          focus: handlePress,
        };
      },
      [],
    );

    return (
      <Pressable onPress={handlePress}>
        <Animated.View
          style={[
            {
              width: switchWidth,
              height: switchHeight,
              alignItems: 'flex-start',
              padding: ModerateScale(5),
              borderRadius: ModerateScale(15),
              overflow: 'hidden',
            },
            trackAnimatedStyle,
          ]}>
          <Animated.View
            style={[
              {
                height: '100%',
                aspectRatio: 1,
                backgroundColor: defaultTrackBallColor,
              },
              thumbAnimatedStyle,
            ]}
          />
        </Animated.View>
      </Pressable>
    );
  },
);

export default Switch;

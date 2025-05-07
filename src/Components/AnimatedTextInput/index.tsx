import React from 'react';
import {View, TextInput, Platform} from 'react-native';

import Animated, {
  Easing,
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import useTheme from '../../Hook/Utility/useTheme';

import StringUtils from '../../Helper/StringUtil';
import {Fonts, ModerateScale} from '../../Config/Theme';

import type {TextFieldProps} from './type';
import type {ForwardRefProps} from '../../types/Common';

// SHAKEANGLE Animation Config

const TIME = 60; // timing of creating shake animation
const SHAKE = 5; // How many times shake will repeat
const SHAKEANGLE = 1; // how distance the shake will do
const AnimatedConfig = Easing.elastic(5); // which method type animated, give the smooth animation

/**
 * @author Ramesh
 * ---------------------------------
 *
 * Label Animation to the top of the text input (floating label textinput container ) and contains the error handling inbuild this shake animation preview every error change
 */

const AnimatedTextInput = React.forwardRef<ForwardRefProps, TextFieldProps>(
  (
    {
      style,
      label,
      value,
      error,
      activeColor,
      inActiveColor,
      labelStyle,
      containerStyle,
      contentContainerStyle,
      iconContainerStyle,
      leftFrom = ModerateScale(15),
      format,
      showError = true,
      onChangeText,
      ...props
    },
    ref,
  ) => {
    // State Declarations

    const initalDimension = {
      height: ModerateScale(40),
      width: ModerateScale(300),
    };

    const Theme = useTheme(); // Custom Theme Hook use Every Where stop using Theme Constants
    const errorRef = React.useRef<string>(''); // Error Handling Ref
    const inputRef = React.useRef<TextInput>(null); // Forward Ref
    const labelAnim = useSharedValue(0); // Label Animation's Animated Value
    const shakeAnim = useSharedValue<number>(0); // Error Text Animation's Animated Value
    const [isFocused, setIsFocused] = React.useState(false);

    const [dimension, setDimension] = React.useState(initalDimension);

    // Text Input Animated Config

    const outputStartRange = Math.ceil(dimension.height / 2.15) - Math.ceil(ModerateScale(8)); // Intial Position Label that Centered the Text in the Text Field

    const outputEndRange = Math.ceil(dimension.height / 2); // Move to Top Position of Text Field , Calculate the Height of text Field as per adjust the height

    const selectedOutputRange = {
      start: outputStartRange,
      end: -outputEndRange,
    };

    const animatedLabelStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateY:
            labelAnim.value * (selectedOutputRange.end - selectedOutputRange.start) + selectedOutputRange.start,
        },
      ],
    }));

    // Text Input Animated Config

    const animatedErrorStyle = useAnimatedStyle(() => ({
      transform: [{translateX: shakeAnim.value}],
    }));

    // Hook Declarations

    /// Forward Ref Config

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          inputRef.current?.focus();
        },
        blur: () => {
          inputRef.current?.blur();
        },
      }),
      [],
    );

    React.useEffect(() => {
      labelAnim.value = withTiming(isFocused || value ? 1 : 0, {
        duration: 200,
      });
    }, [isFocused, value]);

    React.useEffect(() => {
      errorRef.current = (error ?? '') + String(Math.random());
      /**
       * Only animation work if the error changes otherwise it not working
       *  & prevent inital animation calling
       *
       *  Need to Find the anyother to shake when the error click the funciton from the outside user need to
       * indicate the that validaiton is here not
       */

      if (!error && error !== errorRef.current) return;
      shakeAnim.value = withSequence(
        withTiming(-SHAKEANGLE, {duration: TIME / 2, easing: AnimatedConfig}),
        withRepeat(
          withTiming(SHAKEANGLE, {
            duration: TIME,
            easing: AnimatedConfig,
          }),
          SHAKE,
          true,
        ),
        withTiming(0, {duration: TIME / 2, easing: AnimatedConfig}),
      );
    }, [error]);

    React.useEffect(() => {
      return () => {
        setIsFocused(false);
      };
    }, []);

    console.log(format);

    return (
      <View style={[containerStyle]}>
        <Animated.Text
          onPress={() => {
            if (value) return;
            if (isFocused) return;

            setIsFocused(true);
            inputRef.current?.focus();
          }}
          style={[
            labelStyle,
            {
              position: 'absolute',
              zIndex: 1098,
              color: isFocused || value ? activeColor ?? Theme.colors.light : inActiveColor ?? Theme.colors.muted,
              left: leftFrom,
              fontWeight: 'black',
              fontSize: ModerateScale(14),
              pointerEvents: 'none',
              fontFamily: isFocused || value ? Fonts.medium.primary : Fonts.regular.primary,
            },
            animatedLabelStyle,
          ]}>
          {label}
        </Animated.Text>
        <TextInput
          onLayout={event => {
            setDimension({
              height: event.nativeEvent.layout.height,
              width: event.nativeEvent.layout.width,
            });
          }}
          {...props}
          placeholder={isFocused || value ? props.placeholder : ''}
          style={[
            {
              paddingHorizontal: leftFrom,
              fontFamily: Fonts.regular.primary,
              fontWeight: '400',
            },
            style,
          ]}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          ref={inputRef}
          onChangeText={(text: string) => {
            console.log('Format Options', text, format);
            const value = StringUtils.stringToConvertFormat(text, format);
            onChangeText?.(value);
          }}
          keyboardType="default"
          value={value}
        />
        {showError && (
          <Animated.Text
            style={[
              {
                textAlign: 'right',
                fontSize: ModerateScale(10),
                height: ModerateScale(20),
                fontFamily: Fonts.medium.primary,
                letterSpacing: 0,
                color: Theme.colors.danger,
              },
              animatedErrorStyle,
            ]}>
            {error ? error : ''}
          </Animated.Text>
        )}
      </View>
    );
  },
);

export default AnimatedTextInput;

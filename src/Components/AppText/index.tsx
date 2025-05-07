import React from 'react';
import {Text, StyleSheet} from 'react-native';

import ClampText from './ClampText';

import useTheme from '../../Hook/Utility/useTheme';

import {Fonts, ModerateScale} from '../../Config/Theme';

import type {AppTextProps} from './type';
import type {StyleProp, TextStyle} from 'react-native';

/**
 * A text component that supports various styles and modes.
 * extends with React Native Text Component so you can use Text props also for this
 * refrences https://reactnative.dev/docs/text
 *
 * @param style - Custom styles to apply to the text.
 * @param variant - The variant of the text, determining predefined styles.
 * @param children - The content to be displayed within the text component.
 * @param weight - The font weight of the text (e.g., 'bold', 'normal').
 * @param color - The color of the text.
 * @param mode - The mode of the text, which may alter its appearance.
 * @param size - The font size of the text.
 * @param ref - Ref forwarded to the underlying text component.
 *
 * @example
 * // Basic usage of AppText
 * <AppText variant="displayLarge" mode="bold" color="blue">
 *   Hello, World!
 * </AppText>
 */

function AppText({style, variant, children, weight, color, mode, size, ref, ...props}: AppTextProps) {
  const Theme = useTheme();

  const regularType: StyleProp<TextStyle> = {
    fontFamily: Fonts.regular.primary,
  };

  const mediumType: StyleProp<TextStyle> = {
    fontFamily: Fonts.medium.primary,
  };

  const boldType: StyleProp<TextStyle> = {
    fontFamily: Fonts.bold.primary,
  };

  const variantFontStyle = React.useMemo(() => {
    switch (variant) {
      case 'title':
        return {
          color: Theme.colors.secondary,
          fontSize: ModerateScale(25),
          fontFamily: Fonts.medium.primary,
        };

      case 'subtitle':
        return {
          fontSize: ModerateScale(13),
          fontFamily: Fonts.regular.primary,
        };

      // variant Paper

      case 'displayLarge':
        return {
          ...mediumType,
          fontSize: ModerateScale(57),
        };
      case 'displayMedium':
        return {
          ...mediumType,
          fontSize: ModerateScale(45),
        };
      case 'displaySmall':
        return {
          ...mediumType,
          fontSize: ModerateScale(35),
        };

      case 'headlineLarge':
        return {
          ...mediumType,
          fontSize: ModerateScale(32),
        };
      case 'headlineMedium':
        return {
          ...mediumType,
          fontSize: ModerateScale(28),
        };
      case 'headlineSmall':
        return {
          ...mediumType,
          fontSize: ModerateScale(25),
        };

      case 'titleLarge':
        return {
          ...mediumType,
          fontSize: ModerateScale(22),
        };
      case 'titleMedium':
        return {
          ...mediumType,
          fontSize: ModerateScale(18),
        };
      case 'titleSmall':
        return {
          ...mediumType,
          letterSpacing: 0.05,
          fontSize: ModerateScale(16),
        };

      case 'labelLarge':
        return {
          ...regularType,
          letterSpacing: 0.05,
          fontSize: ModerateScale(16),
        };
      case 'labelMedium':
        return {
          ...regularType,
          fontSize: ModerateScale(13),
        };
      case 'labelSmall':
        return {
          ...regularType,
          fontSize: ModerateScale(10),
        };

      case 'bodyLarge':
        return {
          ...regularType,
          fontSize: ModerateScale(16),
        };
      case 'bodyMedium':
        return {
          ...regularType,
          fontSize: ModerateScale(14),
        };
      case 'bodySmall':
        return {
          ...regularType,
          fontWeight: '400',
          fontSize: ModerateScale(12),
        };

      // Theme
      case 'primary':
        return {
          ...regularType,
          color: Theme.colors.primary,
        };
      case 'light':
        return {
          ...regularType,
          color: Theme.colors.light,
        };
      case 'dark':
        return {
          ...regularType,
          color: Theme.colors.dark,
        };
      case 'error':
        return {
          ...regularType,
          color: Theme.colors.danger,
        };

      default:
        return regularType;
    }
  }, [variant]);

  const FontFamilyStyle = React.useMemo(() => {
    switch (mode) {
      case 'black':
        return boldType;
      case 'bold':
        return mediumType;
      default:
        return regularType;
    }
  }, [mode]);

  return (
    <Text
      ref={ref as React.Ref<Text> | null}
      style={StyleSheet.flatten([
        {
          color: color || Theme.colors.secondary,
        },
        variantFontStyle as StyleProp<TextStyle>,
        !!size && {
          fontSize: size,
        },
        !!weight && {
          fontWeight: weight,
        },
        !!mode && FontFamilyStyle,
        style,
      ])}
      suppressHighlighting
      {...props}>
      {children}
    </Text>
  );
}

AppText.Clamp = ClampText;

export default AppText;

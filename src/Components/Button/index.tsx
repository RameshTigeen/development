import React from 'react';
import {ActivityIndicator, Pressable as NativePressable, StyleSheet} from 'react-native';

import {RectButton, Pressable as GesturePressable} from 'react-native-gesture-handler';

import AppText from '../AppText';
import AppIcon from '../AppIcon';

import useTheme from '../../Hook/Utility/useTheme';
import {ModerateScale} from '../../Config/Theme';

import type {ButtonProps} from './type';
import type {ForwardRefProps} from '../../types/Common';

/**
 * Custom Button Component with default styles, variant based styles, button mode with styles
 * - type Gesture => create the button with gesture handler package
 * - type Ripple => create the ripple button effect with gesture handler package pressable
 *
 * Inspried by the Reanimated package
 *
 * ------------------------------
 * @author Ramesh
 *
 * @extends react-native-gesture-handler
 *
 *  * @example
 * // Basic usage of Button
 * <Button variant="primary" mode="outlined" color="blue">
 *   Hello, World!
 * </Button>
 */

const Button = React.forwardRef<ForwardRefProps, ButtonProps>(
  (
    {
      mode,
      fontSize = ModerateScale(14),
      color,
      style,
      variant,
      children,
      loading = false,
      text = '',
      textStyle,
      onPress,
      disabled = false,
      textColor,
      borderWidth = 1.25,
      showLeftIcon,
      showRightIcon,
      iconName,
      type,
      iconColor,
      iconSize = ModerateScale(15),
    },
    ref,
  ) => {
    const Theme = useTheme();

    const buttonBackgroundColor = React.useMemo(() => {
      switch (variant) {
        case 'primary':
          return Theme.colors.primary;
        case 'secondary':
          return Theme.colors.lightGray;
        case 'dark':
          return Theme.colors.dark;
        case 'light':
          return Theme.colors.light;
        case 'success':
          return Theme.colors.success;
        case 'danger':
          return Theme.colors.danger;
        case 'warning':
          return Theme.colors.warning;
        case 'highlight':
          return Theme.colors.highlight;
        case 'info':
          return Theme.colors.infoBackground;
        case 'light-primary':
          return Theme.colors.navbarBackground;
        default:
          return 'transparent';
      }
    }, [variant]);

    const buttonTextColor = React.useMemo(() => {
      switch (variant) {
        case 'dark':
        case 'danger':
        case 'primary':
        case 'success':
        case 'light-primary':
          return Theme.colors.light;
        case 'secondary':
          return Theme.colors.secondary;
        case 'highlight':
          return Theme.colors.secondary;
        case 'info':
          return Theme.colors.secondary;
        case 'light':
        case 'warning':
        default:
          return Theme.colors.dark;
      }
    }, [variant]);

    const ButtonStyle = React.useMemo(() => {
      switch (mode) {
        case 'outlined':
          return {
            borderColor: color || buttonBackgroundColor,
            borderWidth: borderWidth,
          };
        case 'text':
        case 'elevated':
        case 'contained-tonal':
          return {};
        default:
          return {
            backgroundColor: color || buttonBackgroundColor,
          };
      }
    }, [buttonBackgroundColor, buttonTextColor, color, variant, mode]);

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          onPress?.();
        },
        blur: () => {},
      }),
      [],
    );

    const RenderComponent = React.useCallback(() => {
      if (!!loading) {
        return (
          <ActivityIndicator
            color={textColor || iconColor || (mode == 'outlined' ? buttonBackgroundColor : buttonTextColor)}
          />
        );
      }

      return (
        <>
          {!!showLeftIcon && !!iconName && (
            <AppIcon
              size={iconSize}
              name={iconName}
              color={
                (iconColor || (mode == 'outlined' ? buttonBackgroundColor : buttonTextColor)) ?? Theme.colors.lightGray
              }
            />
          )}
          <ChildrenComponent />
          {!!showRightIcon && !!iconName && (
            <AppIcon
              size={iconSize}
              name={iconName}
              color={
                (iconColor || (mode == 'outlined' ? buttonBackgroundColor : buttonTextColor)) ?? Theme.colors.lightGray
              }
            />
          )}
        </>
      );
    }, [
      children,
      loading,
      textStyle,
      mode,
      text,
      textColor,
      showLeftIcon,
      iconName,
      iconColor,
      iconSize,
      showRightIcon,
      variant,
    ]);

    const ChildrenComponent = React.useCallback(() => {
      if (!!children && typeof children != 'string' && typeof children != 'number' && typeof children != 'boolean') {
        return <>{children}</>;
      }

      if (!Boolean(typeof children == 'string' ? children : text)) return;

      return (
        <AppText
          color={textColor || (mode == 'outlined' ? buttonBackgroundColor : buttonTextColor)}
          variant="headlineSmall"
          size={fontSize}
          style={textStyle}>
          {typeof children == 'string' ? children : text}
        </AppText>
      );
    }, [children, loading, text, textStyle, mode, textColor, variant, fontSize]);

    if (type == 'gesture') {
      return (
        <GesturePressable
          disabled={disabled}
          onPress={() => onPress?.()}
          style={[variant != 'transparent' && styles.DefaultButtonStyle, ButtonStyle, style]}>
          <RenderComponent />
        </GesturePressable>
      );
    }

    if (type == 'ripple') {
      <RectButton
        enabled={disabled}
        onPress={() => onPress?.()}
        style={[variant != 'transparent' && styles.DefaultButtonStyle, ButtonStyle, style]}>
        <RenderComponent />
      </RectButton>;
    }

    return (
      <NativePressable
        disabled={disabled}
        onPress={() => onPress?.()}
        style={[variant != 'transparent' && styles.DefaultButtonStyle, ButtonStyle, style]}>
        <RenderComponent />
      </NativePressable>
    );
  },
);

const styles = StyleSheet.create({
  DefaultButtonStyle: {
    fontSize: ModerateScale(16),
    borderRadius: ModerateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    height: ModerateScale(40),
    gap: ModerateScale(8),
    minWidth: ModerateScale(20),
    paddingHorizontal: ModerateScale(10),
  },
});

export default Button;

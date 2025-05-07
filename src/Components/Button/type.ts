import type {PressableProps, StyleProp, TextStyle, ViewStyle} from 'react-native';
import type {AppIconName} from '../AppIcon/type';

export interface ButtonProps extends PressableProps {
  /**
   * @param {string} text user wants to renter the text component we simiplifies as text string
   */
  text?: string;
  /**
   * @param {string} color user wants to renter the text's color we simiplifies as color string
   */
  color?: string;
  /**
   * #Optional styles for the inner text component
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * #Optional childeren renter different component use this
   */
  children?: React.ReactNode | string;
  /**
   * Indicate to loading activity indicator when user been clicking the button helps to identify the user actions
   */
  loading?: boolean;
  /**
   * Style for the button component
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @enum `'primary' | 'secondary' | 'dark' | 'light' | 'warning' | 'success' | 'transparent' | 'danger' | 'AuthButton'` variant of styles
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'dark'
    | 'light'
    | 'warning'
    | 'success'
    | 'transparent'
    | 'danger'
    | 'light-primary'
    | 'highlight'
    | 'info';
  /**
   * @enum `'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'` mode of styles to fill background color
   */
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  /**
   * @enum `'ripple' | 'gesture' | 'default'` mode of styles to fill background color
   *
   * (default) React native - Pressable => Component to make work if want to no more fancy ripple effect accept all the component to working without add the animation use this (recommanded)
   *
   * (ripple) React Native Gesture Handler - Rect Button => to make the button as ripple effect on the background use this
   *
   * (gesture) React Native Gesture Handler - Pressable => to make the pressable in the bottom sheet or if there already used any other gesture handler as parent or children
   *
   */
  type?: 'ripple' | 'gesture';

  textColor?: string;
  /**
   * #Optional Control props to decide the elevation of view
   */
  showShadow?: boolean;
  /**
   * #Optional functionality use this control the button enabled or disabled
   */
  disabled?: boolean;
  /**
   * #Optional size of the border
   */
  borderWidth?: number;
  /**
   * callback trigger when button been pressed
   */
  onPress?: () => void;
  /**
   * #optional show the left-icon
   */
  showLeftIcon?: boolean;
  /**
   * #optional show right-icon
   */
  showRightIcon?: boolean;
  /**
   * Which iconName to be render in the component
   */
  iconName?: AppIconName | null;
  /**
   * define where to placed the iconName either 'right' nor 'left'
   */
  iconDirection?: 'right' | 'left';

  iconColor?: string;

  iconSize?: number;
  fontSize?: number;
}

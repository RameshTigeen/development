import type {FormatOptions} from '../../Helper/StringUtil';
import type {StyleProp, TextStyle, ViewStyle, TextInputProps} from 'react-native';

/**
 * The type of animation for the TextField component.
 *
 * @enum {string}
 */
export type AnimationType = 'moveToTop' | 'moveToTopAndReduceSize';

/**
 * Props for the TextField component.
 *
 * @interface TextFieldProps
 * @extends TextInputProps
 */
export interface TextFieldProps extends TextInputProps {
  /**
   * The label text displayed above the TextField.
   *
   * @type {string}
   */
  label: string;
  showError?: boolean;
  /**
   * Error message to be displayed beneath the TextField, if any.
   *
   * @type {string | null | undefined}
   */
  error?: string | null;

  /**
   * The type of animation for the TextField when focused or interacted with.
   *
   * @type {AnimationType}
   * @default 'none'
   */
  animationType?: AnimationType;

  /**
   * The color of the TextField when it is active (focused).
   *
   * @type {string | undefined}
   */
  activeColor?: string;

  /**
   * The color of the TextField when it is inactive (unfocused).
   *
   * @type {string | undefined}
   */
  inActiveColor?: string;

  /**
   * Custom style for the label text.
   *
   * @type {StyleProp<TextStyle> | undefined}
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Custom style for the container of the TextField.
   *
   * @type {StyleProp<ViewStyle> | undefined}
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for the container that holds any icon related to the TextField.
   *
   * @type {StyleProp<ViewStyle> | undefined}
   */
  iconContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for the content area of the TextField (i.e., the area inside the input box).
   *
   * @type {StyleProp<ViewStyle> | undefined}
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom style for the content area of the TextField (i.e., the area inside the input box).
   *
   * @type {number}
   */
  leftFrom?: number;

  /**
   * value for the textinput
   *
   * @type {string}
   */
  value?: string;

  /**
   * callback trigger when text values changes
   *
   * @type {void}
   */
  onChangeText?: (text: string) => void;

  /**
   * as per the format
   *
   * @type {FormatOptions}
   */
  format?: FormatOptions;
}

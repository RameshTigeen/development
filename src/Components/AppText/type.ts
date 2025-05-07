import type {TextProps} from 'react-native';

export type variantType =
  | 'error'
  | 'primary'
  | 'light'
  | 'dark'
  | 'title'
  | 'subtitle'
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall';

export type FontFamilyType = 'normal' | 'bold' | 'black';

export type WeightType = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type BaseTextProps = {
  /**
   * @enum `error` | `primary` | `light` | `dark` | `title` | `subtitle` | `displayLarge` | `displayMedium` | `displaySmall` | `headlineLarge` | `headlineMedium` | `headlineSmall` | `titleLarge` | `titleMedium` | `titleSmall` | `labelLarge` | `labelMedium` | `labelSmall` | `bodyLarge` | `bodyMedium` | `bodySmall`  text component have a mulitple variant of styles based on variant name
   */
  variant?: variantType;
  /**
   * @param {number} size this determine the text's size
   */
  size?: number;
  /**
   * @enum `normal` | `bold` | `100` | `200` | `300` | `400` | `500` | `600` | `700` | `800` | `900` default react native`s style font weight
   */
  weight?: WeightType;
  /**
   * @enum `normal` | `bold` | `black` determine by the font weight
   */
  mode?: FontFamilyType;
  /**
   * @param {string} color this determine the text's color
   */
  color?: string;
} & TextProps;

export interface AppTextProps extends BaseTextProps {
  /**
   * Text component render textstring as children of componenent either if want render anthor component as children
   */
  children: React.ReactNode;
  /**
   * Forward ref to the app text input to the handle the ref based height calculation summarys
   */
  ref?: React.Ref<Text>;
}

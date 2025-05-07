import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;
const isPortrait = height > width;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

export function ModerateScale(size: number, factor = 0.3) {
  return Math.round(size + ((isPortrait ? horizontalScale(size) : verticalScale(size)) - size) * factor);
}

/**
 * If you update this theme please make sure update useTheme.ts as well as
 *
 * Hook for the dynamic color change controller
 *
 * these variables used for the static colors
 */

export const Fonts = {
  regular: {
    primary: 'Pretendard-Regular',
  },
  medium: {
    primary: 'Pretendard-SemiBold',
  },
  bold: {
    primary: 'Pretendard-Bold',
    secondary: 'EBGaramond-Bold',
  },
};

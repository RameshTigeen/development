import {useColorScheme} from 'react-native';

export default function useTheme() {
  const colorScheme = useColorScheme();

  const toast = {
    success: 'rgb(47, 174, 127)',
    warning: 'rgb(242, 201, 76)',
    danger: 'rgb(235, 87, 87)',
    info: 'rgb(32, 149, 242)',
  };

  const colors = {
    lightColors: {
      background: 'rgb(255,255,255)',
      danger: 'rgb(232,0,0)',
      lightPrimary: 'rgb(118, 137, 176)',
      navbarFontColor: 'rgb(63, 87, 142)',
      primary: 'rgb(51, 76, 136)',
      warning: 'rgb(255, 201, 47)',
      success: 'rgb(0, 191, 100)',
      secondary: 'rgb(74, 80, 90)',
      muted: 'rgb(192, 194, 197)',
      infoBackground: 'rgb(241, 241, 241)',
      highlight: 'rgb(182, 198, 233)',
      warningDark: 'rgb(186, 87, 33)',
      dark: 'rgb(0,0,0)',
      light: 'rgb(255,255,255)',
      primaryButton: 'rgb(43, 64, 122)',
      transparent: 'rgba(255,255,255,0.8)',
      darkTransparent: 'rgba(0,0,0,0.5)',
      gray: 'rgb(59, 63, 71)',
      lightGray: 'rgb(211, 211, 211)',
      warningLight: 'rgba(255, 201, 47,0.3)',
    },
  };

  const Theme = {
    colors: colors.lightColors,
    toast,
  };

  return Theme;
}

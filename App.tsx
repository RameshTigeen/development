import React from 'react';
import {Platform} from 'react-native';

import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
  Theme,
  createNavigationContainerRef,
} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Routes from './src/Routes';

import {AppContextWrapper} from './src/Contexts/AppContext';

import type {RootStackScreens} from './src/Routes/types';

export const navigationRef = createNavigationContainerRef<RootStackScreens>();

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['clubado://'],
};

const appFontTheme: Theme = {
  ...DefaultTheme,
  fonts: Platform.select({
    ...DefaultTheme.fonts,
    default: {
      regular: {
        fontFamily: 'Pretendard-Regular',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Pretendard-SemiBold',
        fontWeight: 'normal',
      },
      bold: {
        fontFamily: 'Pretendard-SemiBold',
        fontWeight: '600',
      },
      heavy: {
        fontFamily: 'Pretendard-Bold',
        fontWeight: '700',
      },
    },
  }),
};

function App() {
  React.useEffect(() => {
    const IniitalBooter = async () => {
      await BootSplash.hide({fade: true});
    };
    IniitalBooter();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef} linking={linking} theme={appFontTheme}>
          <AppContextWrapper>
            <Routes />
          </AppContextWrapper>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

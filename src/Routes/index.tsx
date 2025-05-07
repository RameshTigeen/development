import React from 'react';
import {Platform} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Routes
import AppInitializer from '../Modules/Auth/Appinitializer';
import Login from '../Modules/Auth/Login';

import RootTab from './RootTab';

import useTheme from '../Hook/Utility/useTheme';

import type {RootStackScreens} from './types';

const Stack = createNativeStackNavigator<RootStackScreens>();

export default function Routes() {
  const {colors} = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="RootTab"
      screenOptions={{
        animation: 'flip',
        headerShown: false,
        keyboardHandlingEnabled: true,
        navigationBarColor: colors.light,
        headerBackButtonMenuEnabled: false,
        gestureEnabled: Platform.OS != 'ios',
      }}>
      <Stack.Screen name="AppInitializer" component={AppInitializer} />

      <Stack.Screen name="Login" component={Login} options={{animation: 'fade', statusBarStyle: 'light'}} />

      <Stack.Screen name="RootTab" component={RootTab} />
    </Stack.Navigator>
  );
}

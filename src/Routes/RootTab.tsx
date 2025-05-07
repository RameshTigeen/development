import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import UnderDevelpment from '../Components/UnderDevelopment';
import RootBottomTabBar from '../Views/Routes/RootBottomTabBar';

import type {RootStackScreenProps, UserStackScreens} from './types';

const Tab = createBottomTabNavigator<UserStackScreens>();

export default function RootTab({navigation}: RootStackScreenProps<'RootTab'>) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
      }}
      tabBar={props => <RootBottomTabBar {...props} />}>
      <Tab.Screen name="Jobs" component={UnderDevelpment} />
      <Tab.Screen name="Profile" component={UnderDevelpment} />
      <Tab.Screen name="Timecard" component={UnderDevelpment} />
      <Tab.Screen name="Settings" component={UnderDevelpment} />
    </Tab.Navigator>
  );
}

import React from 'react';
import {View, Pressable, StyleSheet, FlatList} from 'react-native';

import Button from '../../Components/Button';
import AppText from '../../Components/AppText';

import {Fonts, ModerateScale} from '../../Config/Theme';

import useTheme from '../../Hook/Utility/useTheme';

import type {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

export interface BottomTabData {
  routeName: string;
  name: string;
}

export default function HostMatrialTopTabBar({state, navigation}: MaterialTopTabBarProps) {
  const Theme = useTheme();

  // Local Variables

  const defaultTabIcons: BottomTabData[] = [
    {routeName: 'HostListings', name: 'Listings'},
    {routeName: 'HostReservations', name: 'Reservations'},
  ];

  const focusedRouteName = state.routes[state.index].name;

  const RenderItem = React.useCallback(
    ({item, index}: {item: BottomTabData; index: number}) => {
      const currentRoute = state.routes.find(route => route.name == item.routeName);
      const isActive = focusedRouteName === item.routeName;
      const OnPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: currentRoute?.key,
          canPreventDefault: true,
        });

        if (!isActive && !event.defaultPrevented) {
          navigation.navigate(currentRoute?.name ?? '', currentRoute?.params);
        }
      };
      return (
        <Pressable
          onPress={OnPress}
          key={`${currentRoute?.key} ${item.name}`}
          style={[
            styles.tabItem,
            {
              backgroundColor: isActive ? Theme.colors.success : Theme.colors.infoBackground,
            },
          ]}>
          <AppText mode="black" size={ModerateScale(12)} color={isActive ? Theme.colors.light : Theme.colors.secondary}>
            {item.name}
          </AppText>
        </Pressable>
      );
    },
    [state, navigation],
  );

  return (
    <View
      style={{
        backgroundColor: Theme.colors.light,
        paddingBottom: ModerateScale(10),
        paddingHorizontal: ModerateScale(10),
        gap: ModerateScale(10),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: Theme.colors.light,
        }}>
        <AppText style={{flex: 4, fontFamily: Fonts.bold.secondary}} variant="headlineSmall">
          Golf Clubs
        </AppText>

        <Button
          variant="success"
          showLeftIcon
          onPress={() => {
            navigation.navigate('AddListing');
          }}
          style={{
            backgroundColor: Theme.colors.success,
            borderRadius: ModerateScale(50),
            height: ModerateScale(35),
            width: ModerateScale(35),
          }}
          iconName={'Plus'}
          iconSize={ModerateScale(20)}
          iconColor={Theme.colors.light}
        />
      </View>
      <FlatList
        data={defaultTabIcons}
        horizontal
        style={{backgroundColor: Theme.colors.light}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: ModerateScale(10),
        }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={RenderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    height: ModerateScale(40),
    justifyContent: 'center',
    padding: ModerateScale(10),
    borderRadius: ModerateScale(5),
    paddingRight: ModerateScale(25),
    maxWidth: ModerateScale(150),
  },
});

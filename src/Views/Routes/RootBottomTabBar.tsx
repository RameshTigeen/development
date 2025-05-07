import React from 'react';
import {View, Pressable, StyleSheet, Image, Animated, Platform, useWindowDimensions} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import AppText from '../../Components/AppText';
import AppIcon from '../../Components/AppIcon';

import {useAppContext} from '../../Contexts/AppContext';

import useTheme from '../../Hook/Utility/useTheme';

import {ModerateScale} from '../../Config/Theme';

import type {ImageSourcePropType, LayoutChangeEvent} from 'react-native';
import type {UserStackScreens} from '../../Routes/types';
import type {AppIconName} from '../../Components/AppIcon/type';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export interface BottomTabData {
  routeName: keyof UserStackScreens;
  name: string;
  iconName: AppIconName;
  image?: ImageSourcePropType;
}

export default function RootBottomTabBar({state, navigation}: BottomTabBarProps) {
  /* Host Declaration  */
  const {bottom} = useSafeAreaInsets();

  const Theme = useTheme();

  const {user} = useAppContext(); // handling the focus handling

  // Local Variables

  const defaultTabIcons: BottomTabData[] = [
    {routeName: 'Jobs', name: 'Jobs', iconName: 'ListView'},
    {routeName: 'Timecard', name: 'Timecard', iconName: 'Clock'},
    {
      routeName: 'Settings',
      name: 'Setting',
      iconName: 'Settings',
    },
    {
      routeName: 'Profile',
      name: user?.first_name ?? 'Profile',
      iconName: 'ToastInfo',
      image: {
        uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      },
    },
  ];
  const isAndroid = Platform.OS == 'android';
  const insets = useSafeAreaInsets();
  const {width: WindowWidth, height: WindowHeight} = useWindowDimensions();
  const focusedRouteName = state.routes[state.index].name;
  const [screenWidth, setScreenWidth] = React.useState(WindowWidth);
  const scaleAnimation = React.useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = React.useState(state.index);

  const widthOfATab = React.useMemo(
    () => (screenWidth - insets.left - insets.right) / defaultTabIcons.length,
    [defaultTabIcons, insets, screenWidth],
  );
  const hatSize = ModerateScale(60);

  const AnimateTabBar = React.useCallback(() => {
    Animated.spring(scaleAnimation, {
      toValue: widthOfATab * activeIndex,
      useNativeDriver: true,
      speed: 25,
      bounciness: 10,
    }).start();
  }, [activeIndex, scaleAnimation]);

  const OnPress = (index: number) => {
    if (index !== state.index) {
      setActiveIndex(index);
    }
  };

  const OnLayout = (event: LayoutChangeEvent) => {
    event.persist();
    const {height, width} = event.nativeEvent.layout;
    const isLandScape = height < width;

    setTimeout(() => {
      console.log('Is it Triggering', {height, width});
      console.log('Is LandScape:', isLandScape);
      const calculatedWidth = isLandScape ? WindowHeight : WindowWidth;
      setScreenWidth(isAndroid ? WindowWidth : calculatedWidth);
    }, 500);
  };

  React.useEffect(() => {
    AnimateTabBar();
  }, [activeIndex, AnimateTabBar]);

  const viewRef = React.useRef<View>(null);

  React.useLayoutEffect(() => {
    if (Platform.OS == 'ios' && viewRef.current) {
      viewRef.current.measure((x, y, width, height) => {
        const calculatedWidth = height < width ? WindowHeight : WindowWidth;
        setScreenWidth(isAndroid ? WindowWidth : calculatedWidth);
      });
    }
  }, [viewRef.current, WindowWidth, WindowHeight]);

  return (
    <View
      style={[
        styles.TabBarContainer,
        {
          paddingBottom: bottom,
          borderColor: Theme.colors.lightPrimary,
          backgroundColor: Theme.colors.light,
        },
      ]}>
      {defaultTabIcons.map((route, _) => {
        const currentRoute = state.routes.find(item => item.name == route.routeName);
        const isActive = focusedRouteName === route.routeName;
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

        const color = isActive ? Theme.colors.navbarFontColor : Theme.colors.lightPrimary;
        return (
          <Pressable onPress={OnPress} key={`${currentRoute?.key} ${route.name}`} style={styles.TabItemContainer}>
            <Animated.View
              style={[
                styles.ContainerHat,
                {
                  display: isActive ? 'flex' : 'none',
                  width: widthOfATab,
                  transform: [
                    {
                      translateX: scaleAnimation,
                    },
                  ],
                },
              ]}>
              <View
                style={[
                  styles.HatInnerContainer,
                  {
                    width: hatSize,
                    backgroundColor: color,
                  },
                ]}
              />
            </Animated.View>

            {route.image ? (
              <Image
                source={route?.image ?? ''}
                style={{
                  aspectRatio: 1,
                  width: ModerateScale(35),
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: Theme.colors.lightPrimary,
                  borderRadius: ModerateScale(50),
                }}
              />
            ) : (
              <AppIcon name={route.iconName} size={ModerateScale(34)} color={color} />
            )}
            <AppText
              style={{
                fontWeight: '600',
                fontSize: ModerateScale(11),
                color: color,
              }}>
              {route.name}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  TabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
  },
  TabItemContainer: {
    flex: 1,
    height: ModerateScale(60),
    width: '12%',
    gap: ModerateScale(5),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ContainerHat: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HatInnerContainer: {
    height: ModerateScale(5),
    borderRadius: ModerateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import {View} from 'react-native';

import Animated, {FadeOutUp, SlideInRight} from 'react-native-reanimated';

import Button from '../Button';
import AppText from '../AppText';
import SearchBar from '../SearchBar';

import {Fonts, ModerateScale} from '../../Config/Theme';

import useTheme from '../../Hook/Utility/useTheme';

import type {AppIconName} from '../AppIcon/type';
import type {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface HeaderProps {
  title: string;
  subTitle: string;
  SubTitleComponent?: React.ReactNode;
  searchText?: string;
  showSearch?: boolean;
  showCloseIcon?: boolean;
  disabled?: boolean;
  iconName?: AppIconName;
  CallBack?: () => void;
  HandleSearch?: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  titleStyles?: StyleProp<TextStyle>;
  subTitleStyles?: StyleProp<TextStyle>;
}

export default function Header({
  title,
  subTitle,
  SubTitleComponent,
  showSearch,
  searchText,
  disabled,
  showCloseIcon = true,
  CallBack,
  HandleSearch,
  style,
  titleStyles,
  subTitleStyles,
  iconName = 'CloseArrow',
}: HeaderProps) {
  const Theme = useTheme();
  const [showSearchBar, setShowSearchBar] = React.useState(false);

  return (
    <View>
      <View
        style={[
          {
            flexDirection: 'row',
            gap: ModerateScale(15),
            alignItems: 'flex-start',
          },
          style,
        ]}>
        {showCloseIcon && (
          <Button
            onPress={() => {
              !disabled && CallBack?.();
            }}
            iconName={iconName}
            disabled={disabled}
            showLeftIcon
            iconSize={ModerateScale(26)}
            iconColor={Theme.colors.navbarBackground}
            style={{
              width: 0,
              paddingBottom: ModerateScale(5),
              justifyContent: 'center',
              display: !!showCloseIcon ? 'flex' : 'none',
            }}
          />
        )}
        <View
          style={{
            flex: 4,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <AppText style={[{fontFamily: Fonts.bold.secondary}, titleStyles]} variant="headlineSmall">
            {title}
          </AppText>
          {SubTitleComponent ? (
            SubTitleComponent
          ) : subTitle ? (
            <AppText variant="labelSmall" style={subTitleStyles}>
              {subTitle}
            </AppText>
          ) : null}
        </View>
        <Button
          onPress={() => setShowSearchBar(!showSearchBar)}
          iconName={showSearchBar ? 'Close' : 'SearchBarIcon'}
          showLeftIcon
          iconSize={ModerateScale(26)}
          iconColor={Theme.colors.navbarBackground}
          style={{
            width: 0,
            justifyContent: 'center',
            alignSelf: 'flex-end',
            display: !!showSearch ? 'flex' : 'none',
          }}
        />
      </View>
      {!!showSearchBar && (
        <Animated.View entering={SlideInRight} exiting={FadeOutUp.duration(100)}>
          <SearchBar
            leftIcon="SearchBarIcon"
            showLeftIcon
            value={searchText ?? ''}
            placeholder="Search..."
            placeholderTextColor={Theme.colors.muted}
            style={{paddingLeft: ModerateScale(15)}}
            onChangeText={function (text: string): void {
              HandleSearch?.(text);
            }}
          />
        </Animated.View>
      )}
    </View>
  );
}

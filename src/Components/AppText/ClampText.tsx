import React from 'react';
import {Platform, Pressable, View} from 'react-native';

import AppText from '.';

import useTheme from '../../Hook/Utility/useTheme';

import {ModerateScale} from '../../Config/Theme';

import type {BaseTextProps} from './type';
import type {LayoutChangeEvent, StyleProp, Text, ViewStyle} from 'react-native';

export type props = {
  text: string;
  maxLines?: number;
  textConfig?: BaseTextProps;
  buttonTextConfig?: BaseTextProps;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

function ClampAndroidText({text, maxLines = 5, textConfig, buttonTextConfig, contentContainerStyle}: props) {
  const [state, setState] = React.useState({
    isOverlapping: false,
    removeNumOfLines: false,
  });
  const ref = React.useRef<Text>(null);

  const Theme = useTheme();

  return (
    <View style={contentContainerStyle}>
      <AppText
        {...(state.removeNumOfLines ? {} : {numberOfLines: maxLines})}
        onTextLayout={e => {
          setState(prev => ({...prev, isOverlapping: (e?.nativeEvent?.lines?.length ?? 0) > maxLines}));
        }}
        variant="bodySmall"
        ellipsizeMode="tail"
        ref={ref}
        {...textConfig}>
        {text}
      </AppText>
      <Pressable
        onPress={() => {
          setState(prev => ({
            ...prev,
            removeNumOfLines: !prev.removeNumOfLines,
          }));
        }}
        style={{
          width: ModerateScale(75),
        }}>
        <AppText
          size={ModerateScale(12)}
          style={{lineHeight: ModerateScale(10), display: state.isOverlapping ? 'flex' : 'none'}}
          color={Theme.colors.primary}
          mode="black"
          {...buttonTextConfig}>
          {!state.removeNumOfLines ? 'Show more' : 'Show less'}
        </AppText>
      </Pressable>
    </View>
  );
}

function ClampIOSText({text, maxLines = 5, textConfig, buttonTextConfig, contentContainerStyle}: props) {
  const textRef = React.useRef<Text>(null);
  const [state, setState] = React.useState({
    isOverlapping: false,
    removeNumOfLines: false,
  });

  const Theme = useTheme();
  const maxHeight = maxLines * ModerateScale(14);

  return (
    <View style={contentContainerStyle}>
      <AppText
        ref={textRef}
        style={{maxHeight: !state.removeNumOfLines ? maxHeight + ModerateScale(8) : undefined}}
        onLayout={(e: LayoutChangeEvent) => {
          e.persist();

          setTimeout(() => {
            if (e.nativeEvent?.layout?.height > maxHeight) {
              setState(prev => ({...prev, isOverlapping: true}));
            }
          }, 100);
        }}
        variant="bodySmall"
        ellipsizeMode="tail"
        {...(state.removeNumOfLines ? {} : {numberOfLines: maxLines})}
        {...textConfig}>
        {text}
      </AppText>
      {state.isOverlapping && (
        <Pressable
          style={{
            width: ModerateScale(75),
          }}
          onPress={() => {
            setState(prev => ({...prev, removeNumOfLines: !prev.removeNumOfLines}));
          }}>
          <AppText variant="bodySmall" color={Theme.colors.primary} mode="black" {...buttonTextConfig}>
            {!state.removeNumOfLines ? 'Show more' : 'Show less'}
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

function ClampText(props: props) {
  if (Platform.OS == 'ios') {
    return <ClampIOSText {...props} />;
  }
  return <ClampAndroidText {...props} />;
}

ClampText.displayName = 'AppText.Clamp';

export default ClampText as React.FC<props>;

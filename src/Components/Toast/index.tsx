import React from 'react';
import {View, StyleSheet, useWindowDimensions, Image} from 'react-native';

import Animated, {SlideInUp, SlideOutUp} from 'react-native-reanimated';

import Button from '../Button';
import AppText from '../AppText';

import AppView from '../AppView';
import useTheme from '../../Hook/Utility/useTheme';

import Images from '../../Config/Images';
import {ModerateScale} from '../../Config/Theme';

import type {AppIconName} from '../AppIcon/type';
import type {ToastStateTypes} from '../../types/Hook/useToast';
import AppIcon from '../AppIcon';
/// Types

export type ToastProps = {
  toast: ToastStateTypes[];
  textColor: string;
  backgroundColor: string;
};

export interface ToastvariantStyle {
  backgroundColor: string;
  iconName: AppIconName;
  iconColor: string;
  title: string;
}

/// Default Component

export default function Toast({toast}: ToastProps) {
  return (
    <AppView
      style={[
        StyleSheet.absoluteFillObject,
        {
          gap: ModerateScale(5),
        },
      ]}>
      {toast.map((item, _) => {
        return <ToastView key={item.id} toast={item} />;
      })}
    </AppView>
  );
}

/// Components

export function ToastView({toast}: {toast: ToastStateTypes}) {
  const Theme = useTheme();
  const {width, height} = useWindowDimensions();

  const variantStyle: ToastvariantStyle = React.useMemo(() => {
    switch (toast.variant) {
      case 'Success':
        return {
          backgroundColor: Theme.toast.success,
          iconName: 'ToastSuccess',
          iconColor: Theme.colors.light,
          title: 'Success',
        };

      case 'Warning':
        return {
          backgroundColor: Theme.toast.warning,
          iconName: 'ToastWarning',
          iconColor: Theme.colors.dark,
          title: 'Validation',
        };
      case 'Danger':
        return {
          backgroundColor: Theme.toast.danger,
          iconName: 'ToastDanger',
          iconColor: Theme.colors.light,
          title: 'Failed',
        };

      default:
        return {
          backgroundColor: Theme.toast.info,
          iconName: 'ToastInfo',
          iconColor: Theme.colors.light,
          title: 'Information',
        };
    }
  }, [toast.variant]);

  const fontColor = Theme.colors.light;
  const backgroundColor = '#000000CC';

  /**
   * Eariler we handle the toast size for the ipad view and large devices view now remove that
   * as per the request of group chat @lingusamy_sakthivel @abinaya (Apr 11 2025)
   */

  return (
    <Animated.View
      entering={SlideInUp}
      exiting={SlideOutUp}
      style={[
        Style.ToastContainer,
        {
          shadowColor: '#CCC',
          backgroundColor: backgroundColor,
          width: width * 0.9,
        },
        Style.Shadow,
      ]}>
      <View
        style={[
          Style.IconContainer,
          {
            backgroundColor: variantStyle.backgroundColor,
          },
        ]}>
        {variantStyle.iconName == 'ToastDanger' ? (
          <View style={{marginBottom: ModerateScale(4)}}>
            <AppIcon name={variantStyle.iconName} size={ModerateScale(22)} color={variantStyle.iconColor} />
          </View>
        ) : (
          <AppIcon name={variantStyle.iconName} size={ModerateScale(20)} color={variantStyle.iconColor} />
        )}
      </View>
      <View style={Style.TextContainer}>
        <AppText color={fontColor} mode="black" size={ModerateScale(15)}>
          {toast.title || variantStyle.title}
        </AppText>
        <AppText color={fontColor} size={ModerateScale(12)}>
          {toast.message}
        </AppText>
      </View>
      <Button
        showLeftIcon
        iconName="Close"
        type="gesture"
        iconSize={ModerateScale(20)}
        iconColor={Theme.colors.light}
        onPress={() => toast.onPress(toast.id)}
      />
    </Animated.View>
  );
}

/// Style

const Style = StyleSheet.create({
  Shadow: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 2,
  },

  ToastContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: ModerateScale(10),
    borderRadius: ModerateScale(5),
  },

  IconContainer: {
    flexDirection: 'row',
    width: ModerateScale(45),
    height: ModerateScale(45),
    borderRadius: ModerateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextContainer: {
    flex: 1,
    paddingHorizontal: 10,
    gap: ModerateScale(1),
  },
  paragraph: {
    fontSize: ModerateScale(12),
    fontWeight: 'bold',
  },
});

{
  /* {variantStyle.iconName == 'ToastDanger' ? (
          <View style={{marginBottom: ModerateScale(4)}}>
            <AppIcon name={variantStyle.iconName} size={ModerateScale(22)} color={variantStyle.iconColor} />
          </View>
        ) : (
          <AppIcon name={variantStyle.iconName} size={ModerateScale(20)} color={variantStyle.iconColor} />
        )} */
}
``;

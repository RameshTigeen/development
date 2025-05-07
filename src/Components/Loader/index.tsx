import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import useTheme from '../../Hook/Utility/useTheme';

import {ModerateScale} from '../../Config/Theme';

export default function Loader({color}: {color?: string}) {
  const Theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color={color || Theme.colors.secondary} size={ModerateScale(35)} />
    </View>
  );
}

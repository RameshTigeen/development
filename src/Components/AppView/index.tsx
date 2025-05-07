import {View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {ViewProps} from 'react-native';

export default function AppView({style, children, ...props}: ViewProps) {
  const {top, left, right, bottom} = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: top,
          paddingLeft: left,
          paddingRight: right,
          paddingBottom: bottom,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
}

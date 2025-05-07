import React from 'react';
import {View, ActivityIndicator, Image} from 'react-native';

import {useNetInfo} from '@react-native-community/netinfo';

import useTheme from '../../Hook/Utility/useTheme';
import useAppInitializer from '../../Hook/Utility/useAppInitializer';

import Images from '../../Config/Images';
import {ModerateScale} from '../../Config/Theme';

export default function AppInitializer() {
  const Theme = useTheme();
  const netInfo = useNetInfo();

  const {InitialCheck} = useAppInitializer();

  React.useEffect(() => {
    netInfo.isConnected && InitialCheck();
  }, [netInfo.isConnected]);

  return (
    <View
      style={{
        flex: 1,
        gap: ModerateScale(5),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <Image
        source={Images.ClubadoLogo}
        resizeMode={'contain'}
        style={{height: ModerateScale(150)}}
      /> */}
      <ActivityIndicator size={'large'} color={Theme.colors.dark} />
    </View>
  );
}

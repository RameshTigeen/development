import {View} from 'react-native';

import Button from '../../../Components/Button';
import AppText from '../../../Components/AppText';

import useTheme from '../../../Hook/Utility/useTheme';

import {ModerateScale, Fonts} from '../../../Config/Theme';

export interface HeaderProps {
  OnNavigate: () => void;
}

export default function Header({OnNavigate}: HeaderProps) {
  const Theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <AppText
        variant="headlineMedium"
        color={Theme.colors.warning}
        style={{
          flex: 1,
          fontFamily: Fonts.bold.secondary,
        }}>
        Clubado
      </AppText>
      <Button
        showLeftIcon={true}
        iconName={'ProfileDarkIcon'}
        iconColor={Theme.colors.light}
        iconSize={ModerateScale(32)}
        style={{
          borderRadius: ModerateScale(55),
          height: ModerateScale(40),
        }}
        onPress={OnNavigate}
      />
    </View>
  );
}

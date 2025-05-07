import {View} from 'react-native';

import AppText from '../AppText';

import useTheme from '../../Hook/Utility/useTheme';

import {ModerateScale} from '../../Config/Theme';

export default function UnderDevelpment() {
  const Theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.light,
        gap: ModerateScale(10),
      }}>
      <AppText
        style={{
          fontSize: ModerateScale(30),
          fontWeight: 'bold',
          color: Theme.colors.muted,
        }}>
        Under Development
      </AppText>
      <AppText
        style={{
          fontSize: ModerateScale(20),
          color: Theme.colors.muted,
        }}>
        Coming Soon
      </AppText>
    </View>
  );
}

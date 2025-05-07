import {StyleSheet, View} from 'react-native';

import Button from '../../../Components/Button';
import AppText from '../../../Components/AppText';

import useTheme from '../../../Hook/Utility/useTheme';

import {ModerateScale} from '../../../Config/Theme';

export default function BecomeHost({isHost, OnPress}: {isHost: boolean; OnPress: () => void}) {
  const Theme = useTheme();
  return (
    <View style={style.BottomTextContainer}>
      <View>
        <AppText color={Theme.colors.warning} variant={'displaySmall'}>
          Become a host
        </AppText>
        <AppText variant="bodySmall" color={Theme.colors.light}>
          Earn money by renting your golf clubs out, when{`\n`} you want, at the price you want, all on Clubado.
        </AppText>
      </View>
      <Button
        type="ripple"
        variant={'light'}
        text={isHost ? 'Complete setup' : 'Learn more'}
        onPress={OnPress}
        style={style.BottomButton}
      />
    </View>
  );
}

const style = StyleSheet.create({
  BottomTextContainer: {
    gap: ModerateScale(40),
  },
  BottomButton: {
    padding: ModerateScale(10),
    minHeight: ModerateScale(45),
    width: ModerateScale(150),
  },
});

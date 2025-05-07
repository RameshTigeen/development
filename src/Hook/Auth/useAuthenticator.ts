import {useNavigation} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import {useAppContext} from '../../Contexts/AppContext';

import Constant from '../../Config/Constants';

import type {Renter} from '../../types/Root/Profile';
import type {AuthenticationType} from '../../types/Common';
import type {RootStackScreenProps} from '../../Routes/types';

export default function useAuthenticator() {
  const navigation = useNavigation<RootStackScreenProps<'AppInitializer'>['navigation']>();

  const {setItem: SetLocalUserDetail} = useAsyncStorage(Constant.LOCALSTORAGE_KEYS.USER);
  const {setItem: SetBearerToken} = useAsyncStorage(Constant.LOCALSTORAGE_KEYS.REFRESH_TOKEN);

  const {setState: setAppState} = useAppContext();

  /**
   * @description Authenticates the user by setting user details, refresh token, and updating the app state.
   * Depending on the authentication type, it navigates to the appropriate route.
   *
   * @param user - The user details to be stored in the context state ( global state ).
   * @param authenticationType - that refers to as the screen name being navigate next.
   * @param token - The screen based api response of ( Auth | Verification | Reset Passsword ) token.
   */
  const AuthenticateUser = async ({
    user,
    token,
    authenticationType,
  }: {
    user: Renter;
    token: string;
    authenticationType: AuthenticationType;
  }) => {
    setAppState(prev => ({
      ...prev,
      user: user,
      token: token,
    }));

    await SetBearerToken(token);
    await SetLocalUserDetail(JSON.stringify(user));

    switch (authenticationType) {
      case 'Login':
      case 'CompleteProfile': {
        navigation.replace('RootTab', {screen: 'Profile'});
        break;
      }
      case 'Verification': {
        navigation.replace('ProfileVerification');
        break;
      }
      default: {
        navigation.replace('Login');
        break;
      }
    }
  };

  return {
    AuthenticateUser,
  };
}

import {useNavigation} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import useAPI from './useAPI';

import {useAppContext} from '../../Contexts/AppContext';

import Constant from '../../Config/Constants';

import type {Renter} from '../../types/Root/Profile';
import type {FailureResponse} from '../../types/Common';
import type {RootStackScreenProps} from '../../Routes/types';
import type {ResetEmailValidationResponse} from '../../types/Auth/Signup';

export default function useAppInitializer() {
  const navigation =
    useNavigation<RootStackScreenProps<'AppInitializer'>['navigation']>();

  const {setState, user} = useAppContext(); // Global State

  /** API Hook */

  const {Post: GetVerificationCode} = useAPI({});
  const {Post: ExtendTokenExpiryTimestamp} = useAPI({});

  /** Local Storage Hook */

  const {
    getItem: GetVerificationOrPasswordResetTokenExpiryTimestamp,
    setItem: SetVerificationOrPasswordResetTokenExpiryTimestamp,
  } = useAsyncStorage(Constant.LOCALSTORAGE_KEYS.VALIDATE_EMAIL_SENT_TIME);
  const {getItem: GetLocalStorageUserDetails} = useAsyncStorage(
    Constant.LOCALSTORAGE_KEYS.USER,
  );
  const {getItem: GetLocalStorageBearToken} = useAsyncStorage(
    Constant.LOCALSTORAGE_KEYS.REFRESH_TOKEN,
  );

  /**
   * we already store the expiry timestamp when the otp generation at ( Signup | Forgot Password )
   * using expiry timestamp match with current date & Time to verify the timestamp is expired
   * if expiry then create the call request to resend the new otp code to the user
   * -------------------------------------------------------------------------------
   * when the app restarts automatically using AppRedirector function to navigate the OTP verification process
   */

  const GetNewVerificationCodeForExistingEmail = async (email: string) => {
    const formdata = new FormData();
    formdata.append('email', email || user?.email);
    const response = await GetVerificationCode<
      ResetEmailValidationResponse | FailureResponse
    >({
      endpoint: '/email-verification',
      body: formdata,
      isNeedAuthorizationVerification: false,
    });
    if (response.status) {
      setState(prev => ({
        ...prev,
        token: response.data.verification_token ?? '',
      }));
      await SetVerificationOrPasswordResetTokenExpiryTimestamp(
        response.data?.verification_token_expiry_at ?? '',
      );
      return true;
    }
    return false;
  };

  /**
   *----------------------------------------------------------------------------
   * we already store the expiry timestamp and token of new password creation when otp verification process completed ( Signup | Forgot Password )
   * using expiry timestamp match with current date & Time to verify the timestamp is expired
   * if expiry then create the call request to extended the time period and token
   * -------------------------------------------------------------------------------
   * when the app restarts automatically using AppRedirector function to navigate the Password Creation ( Signup Method )
   */

  const GetNewPasswordTokenWithExtentedTimePeroid = async () => {
    const token = await GetLocalStorageBearToken();

    const formdata = new FormData();
    formdata.append('password_token', token);
    const response = await ExtendTokenExpiryTimestamp<
      ResetEmailValidationResponse | FailureResponse
    >({
      endpoint: '/refresh-password-token',
      body: formdata,
      isNeedAuthorizationVerification: false,
    });
    if (response.status) {
      setState(prev => ({
        ...prev,
        token: response.data.password_token ?? '',
      }));
      await SetVerificationOrPasswordResetTokenExpiryTimestamp(
        response.data.password_token_expiry_at ?? '',
      );
      return true;
    }
    return false;
  };

  /** Router ( Change | Management ) Method */

  const AppRedirector = async (user: Renter) => {
    const timestamp =
      await GetVerificationOrPasswordResetTokenExpiryTimestamp();
    const isTimePeriodHasPassed = false;
    // const isTimePeriodHasPassed = CalendarUtils.validateTimeStamp(timestamp || `${new Date()}`);

    if (!user?.email_verified) {
      isTimePeriodHasPassed &&
        (await GetNewVerificationCodeForExistingEmail(user?.email));
      navigation.reset({
        index: 0,
        routes: [{name: 'Signup', params: {page: 1}}],
      });
      return;
    } else if (!user?.password_updated) {
      // Trying to keep the user as much as where they left in the process of account creation
      isTimePeriodHasPassed &&
        (await GetNewPasswordTokenWithExtentedTimePeroid());
      navigation.reset({
        index: 0,
        routes: [{name: 'Signup', params: {page: 2}}],
      });
      return;
    } else if (!user?.profile_updated) {
      navigation.reset({index: 0, routes: [{name: 'ProfileVerification'}]});
      return;
    }

    navigation.replace('RootTab', {screen: 'Profile'});
  };

  /** Main Method */

  /**
   * When the app restarts or open the first time we call this function to trigger inital routings ( login | Signup | Profile-Verification | Root-Profile )
   * ------------------------------------------------------------------------
   *
   * if local storage not have values we can assume that user not authorized or done any ( login | signup process ) => navigate to login
   * if local storage not null
   * then as per condition we can navigate to screen ( In the AppRedirector function )
   *
   * 1. email-verified =>
   *   - if false then user email not verified then we navigate signup otp verification page to user need to verifiy his email with otp generation process
   *
   * 2. password-updated =>
   *   - if false then user password not created then we navigated signup password creation page to user need to create his authorize password
   *
   * 3. profile-updated =>
   *    if false then user verify his email and user create his own password and one basic user registration page to fill his basic details of choices ( city | club | course | Handicap )
   *    these are mandatory field to showcase in the app home screen
   *
   * 4. ( email-verificed and profile-updated and password-updated ) all the condition return true
   *     then user verified and autorized person navigate user to the profile page ( Home screen of app )
   *
   */

  const InitialCheck = async () => {
    const token = await GetLocalStorageBearToken();
    const existingDetailsOfUser = await GetLocalStorageUserDetails();
    console.log(existingDetailsOfUser);
    if (!existingDetailsOfUser) {
      navigation.replace('Login');
      return;
    }

    const exisitngUser: Renter = JSON.parse(existingDetailsOfUser);

    setState(prev => ({
      ...prev,
      user: exisitngUser,
      token: token ?? '',
    }));
    AppRedirector(exisitngUser);
  };

  return {
    InitialCheck,
  };
}

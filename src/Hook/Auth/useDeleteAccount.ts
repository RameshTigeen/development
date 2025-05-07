import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAppContext} from '../../Contexts/AppContext';

import useAPI from '../Utility/useAPI';
import useToast from '../Utility/useToast';

import Constant from '../../Config/Constants';

import type {RootStackScreenProps} from '../../Routes/types';
import type {FailureResponse, SuccessResponse} from '../../types/Common';

export default function useAccountDeletion() {
  const {ShowToast} = useToast();
  const {setState, user} = useAppContext();

  const {deleting, Delete} = useAPI({});
  const navigation = useNavigation<RootStackScreenProps<'Logout'>['navigation']>();

  /**
   * Delete Account Method
   * - Remember when delete the account that will permantantly delete the all the personal information about user from the db
   * - before call the method we recommand to create alert or model to get confirmation from the user , recommand & required feature
   *
   * @method DELETE
   *
   *-----------------------------------------------
   * After the confirmation from the user to delete account first call the Delete users api to clear entire data
   * if api getting success then remove the data from the localstorage
   *
   * ------------------------------------------------------
   * why we don't implement soft delete ?
   * - as per instructions from the google & Apple Store we need to if user wants to delete his account he will permantantly delete the all account related details
   * @reference (https://support.google.com/googleplay/android-developer/answer/13327111?hl=en)
   */

  const HandleAccountDelete = async () => {
    try {
      const response = await Delete<SuccessResponse | FailureResponse>({
        endpoint: '/users',
      });
      if (response.status) {
        setState(prev => ({
          ...prev,
          user: null,
        }));
        await AsyncStorage.multiRemove(Object.values(Constant.LOCALSTORAGE_KEYS));
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      } else {
        ShowToast({
          message: response.message ?? 'Something went wrong, please contact our support',
          variant: 'Danger',
          title: 'Failed to delete account',
        });
      }
    } catch (error) {
      ShowToast({
        message: 'Something went wrong while we are processing your request, Please try again after sometimes',
        variant: 'Danger',
        title: 'Failed to delete account',
      });
    }
  };

  return {HandleAccountDelete, deleting, user};
}

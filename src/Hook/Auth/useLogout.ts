import React from 'react';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAppContext} from '../../Contexts/AppContext';

import useAPI from '../Utility/useAPI';
import useDevice from '../Utility/useDevice';

import Constant from '../../Config/Constants';

import type {RootStackScreenProps} from '../../Routes/types';

export default function useLogout(needInitialization = false) {
  const {setState} = useAppContext();
  const {deviceUniqueId} = useDevice();

  const {posting: loading, Post: RequestToLogout} = useAPI({});
  const navigation = useNavigation<RootStackScreenProps<'Logout'>['navigation']>();

  const ClearUserDetails = async () => {
    const preservedKeys = Object.keys(Constant.LOCALSTORAGE_KEYS);
    const allKeys = await AsyncStorage.getAllKeys();
    const keysToRemove = allKeys.filter(key => !preservedKeys.includes(key));

    await AsyncStorage.multiRemove(keysToRemove);
    setState(prev => ({
      ...prev,
      user: null,
    }));
  };

  const LogoutUser = async () => {
    try {
      const formdata = new FormData();
      formdata.append('unique_id', deviceUniqueId);

      await RequestToLogout({
        endpoint: '/logout',
        body: formdata,
      });
    } catch (error) {
    } finally {
      ClearUserDetails();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  };

  React.useEffect(() => {
    needInitialization && LogoutUser();
  }, []);

  return {LogoutUser, loading, ClearUserDetails};
}

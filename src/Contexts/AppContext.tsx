import React from 'react';

import NetInfo from '@react-native-community/netinfo';

import Toast from '../Components/Toast';

import useTheme from '../Hook/Utility/useTheme';

import Config from '../Config';

import type {ToastStateTypes} from '../types/Hook/useToast';
import type {AppContextState, AppContextValue} from './types';

/**
 * @params Token - AppContext Value that Token Used to Store and Used for  All Authorization Validation ( App Context (Key : token ) and Local Storage (AsyncStorage) (key : CLUBADO_REFRESH_TOKEN ) )
 *
 * Signup Verification -  ( Basic Details Verification Token , Email Verification Token , Email Verification OTP resend Token  , New password Set Verification Token ,  )
 *
 * Forgot Password Verification -  ( Email Verification Token , Email Verification OTP resend Token , Password Reset Password Token , Refresh Token Generate  )
 *
 * Authorization Token
 *
 */

export const AppContext = React.createContext<AppContextValue>({
  isInternetConnected: false,
  token: '',
  appVersion: Config.appVersion,
  user: null,
  host: null,
  publishableKey: '',
  showInternetAlert: false,
  toast: [],
  showUpgradeAlert: false,
  setState: () => {},
  setToast: () => {},
});

export function AppContextWrapper({children}: {children: React.ReactNode}) {
  const [state, setState] = React.useState<AppContextState>({
    isInternetConnected: false,
    appVersion: '',
    user: null,
    token: '',
    host: null,
    publishableKey: '',
    showInternetAlert: false,
    showUpgradeAlert: false,
  });
  const [toast, setToast] = React.useState<ToastStateTypes[]>([]);

  const Theme = useTheme();

  const verificationTimer = React.useRef<number>(0);

  const contextValue = {
    ...state,
    setState,
    setToast,
    toast,
    verificationTimer,
  };

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setState(prev => {
        return {
          ...prev,
          isInternetConnected: !!state.isConnected,
          showInternetAlert: !state.isConnected ? true : false,
        };
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
      {/**
       * Toast Component
       */}
      <Toast
        toast={toast}
        textColor={Theme.colors.light}
        backgroundColor={Theme.colors.dark}
      />
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const contextValue = React.useContext(AppContext);
  return contextValue;
}

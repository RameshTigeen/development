import React from 'react';
import {Keyboard, TextInput, TextInputKeyPressEventData} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer';

export type OTPState = string[];

export type useOTPProps = {
  length?: number;
  startTimer: boolean;
  timerMinutes?: number;
  refs: React.RefObject<TextInput | null>[];
  OnChange: (text: string) => void;
  disableRefresh?: boolean;
};

export default function useOTP({
  refs,
  startTimer,
  length = 6,
  timerMinutes = 2,
  OnChange,
  disableRefresh,
}: useOTPProps) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [countdown, setCountdown] = React.useState<number>(timerMinutes * 60);

  const [otp, setOTP] = React.useState<OTPState>(Array(length).fill(''));
  /*
    ###########################################################################
    #                           Utility Methods                               #
    ###########################################################################
  */

  const ClearCodeAtIndex = React.useCallback(
    (index: number) => {
      const newOTP = [...otp];
      newOTP[index] = '';
      setOTP(newOTP);
    },
    [otp],
  );

  const HandleVerifyOTP = React.useCallback(
    (otp: OTPState) => {
      const enteredOTP = otp.join('');
      Keyboard.dismiss();
      refs.forEach(item => item.current?.blur());
      OnChange(enteredOTP);
    },
    [otp],
  );

  const HandleResetCode = () => {
    setRefreshing(!refreshing);
    setOTP(Array(6).fill(''));
    setCountdown(timerMinutes * 60);
  };

  /*
    ###########################################################################
    #                           Core Methods                                  #
    ###########################################################################
  */

  const HandleInputChange = (index: number, typedText: string) => {
    const text = typedText.replace(/[^a-zA-Z0-9]/g, '');

    if (text.length > 1) {
      const pastedCode = text.split('').slice(0, length - index);
      let modOTP = [...otp];
      modOTP.splice(index, pastedCode.length, ...pastedCode);
      const validCode = modOTP.filter(item => item);
      if (validCode.length === length) {
        setOTP(modOTP);
        HandleVerifyOTP(modOTP);
        return;
      } else {
        if (index === length - 1) refs[index + 0]?.current?.focus();
        else refs[index + text.length]?.current?.focus();
      }
      setOTP(modOTP);
      return;
    }

    const modOTP = otp.map((val, i) => (i === index ? text : val));

    if (modOTP.every(item => item)) {
      HandleVerifyOTP(modOTP);
    } else {
      refs[index + text.length]?.current?.focus();
    }

    setOTP(modOTP);
  };

  /*
    ###########################################################################
    #                           Effect Implementation                         #
    ###########################################################################
  */

  React.useEffect(() => {
    if (!startTimer || disableRefresh) return;
    BackgroundTimer.start();
    const timer = BackgroundTimer.setInterval(() => {
      setCountdown(prev => {
        if (!prev) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => {
      BackgroundTimer.clearInterval(timer);
      BackgroundTimer.stop();
    };
  }, [refreshing, startTimer]);

  useFocusEffect(
    React.useCallback(() => {
      if (disableRefresh) return;
      setCountdown(timerMinutes * 60);
      setOTP(Array(length).fill(''));
    }, [startTimer, disableRefresh]),
  );

  return {
    otp,
    refs,
    countdown,
    refreshing,

    setOTP,
    setCountdown,
    setRefreshing,
    ClearCodeAtIndex,
    HandleInputChange,
    HandleResetCode,
  };
}

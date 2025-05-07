import React from 'react';
import {Keyboard, Platform} from 'react-native';

import type {EmitterSubscription, KeyboardEventListener, KeyboardMetrics} from 'react-native';

const emptyCoordinates = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0,
});
const initialValue = {
  start: emptyCoordinates,
  end: emptyCoordinates,
};

export function useKeyboard() {
  const [shown, setShown] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState<{
    start: undefined | KeyboardMetrics;
    end: KeyboardMetrics;
  }>(initialValue);
  const [keyboardHeight, setKeyboardHeight] = React.useState<number>(0);

  const handleKeyboardDidShow: KeyboardEventListener = e => {
    setShown(true);
    setCoordinates({start: e.startCoordinates, end: e.endCoordinates});
    setKeyboardHeight(e.endCoordinates.height);
  };
  const handleKeyboardDidHide: KeyboardEventListener = e => {
    setShown(false);
    if (e) {
      setCoordinates({start: e.startCoordinates, end: e.endCoordinates});
    } else {
      setCoordinates(initialValue);
      setKeyboardHeight(0);
    }
  };

  React.useEffect(() => {
    let subscriptions: EmitterSubscription[] = [];

    if (Platform.OS == 'ios') {
      subscriptions = [
        Keyboard.addListener('keyboardWillShow', handleKeyboardDidShow),
        Keyboard.addListener('keyboardWillHide', handleKeyboardDidHide),
      ];
    } else {
      subscriptions = [
        Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
        Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
      ];
    }

    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  }, []);

  return {
    keyboardShown: shown,
    coordinates,
    keyboardHeight,
  };
}

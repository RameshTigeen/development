import React from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {ValidationUtils} from '../../Helper/ValidationUtil';

import type {RootStackScreenProps} from '../../Routes/types';
import type {PreventRemoveEvent, PreventRemoveHook} from '../../types/Hook/useScreenPreventRemove';

/**
 *
 * Handle Screen Navigation Event to Determine the Preventation to the screen
 * before remove => Event Name to handle event handling
 *
 * Note: This Hook will not handle app crash and native gestures (Swipe)
 * ----------------------------------------------
 *
 * why we using this hook to handle the screen removing?
 *
 * React navigation supports one of hook named "usePreventRemove" but it not suitable for the our changes and it is not stabled version
 * if it working better then use these hook from the react-navigation
 *
 * #refrence: https://reactnavigation.org/docs/use-prevent-remove/
 *
 * ----------------------------------------
 *
 * @author Ramesh
 *
 * @param Callback callback trigger when the event will act
 * @param unsavedChanges screen need to handle the prevention boolean if true means prevention proceed
 */

export function useInternalPreventRemove(unsavedChanges: boolean, Callback: (e: PreventRemoveEvent) => void) {
  const navigation = useNavigation<RootStackScreenProps<'RootTab'>['navigation']>();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (!unsavedChanges) return;
      e.preventDefault();
      Callback(e);
      return;
    });

    return unsubscribe;
  }, [navigation, unsavedChanges]);
}

/**
 *
 * Handle Screen Prevention ( when screen will remove ), Hook will helps to reach out if screen needs prevention
 * - supports three case, create the alert when screen going to be remove, you can disable it also ( default true)
 * - internal changes calculations from based on the initial-fields and fields
 * - Addtional we can use this hook in any of component or screen to be prevention detects
 *
 * Basically working like the if the detections has been happaned we store as value (Boolean)
 * then internal maintain one state to user when his want to stop the prevention that also (Boolean)
 * if the two boolean to be true then we create the alert when the screen going to be remove
 *
 *--------------------------------------------------------------------------
 * @author Ramesh
 *
 * How do use the hook ?
 * ---------------------
 * Remember TWO Steps
 * - Step 1: Add the Configurations of Initial Fields and Fields( Changed Fields) with same type what you given mentions given to hook
 * - Step 2: when you want to cancel the preventation export the funcition from the hook then where you want call the function (RemovePrevention)
 *
 *
 */

export default function useScreenPreventRemove<T>({
  fields,
  alertDetails,
  initialFields,
  showAlert = true,
  initialization = true,
  PreventCallback,
}: PreventRemoveHook<T>) {
  /**
   * React Hooks and Internal Hooks Initializations
   */

  const initialFieldsRef = React.useRef<T>(initialFields);
  const [isHasPrevent, SetIsHasPrevent] = React.useState(initialization);
  const navigation = useNavigation<RootStackScreenProps<'RootTab'>['navigation']>();
  const isNeedPrevent = !ValidationUtils.IsValuesAreSame<T>(initialFieldsRef.current as T, fields);

  /**
   * Utils Methods
   */

  const RemovePrevention = () => {
    try {
      initialFieldsRef.current = fields;
    } catch {
      initialFieldsRef.current = initialFields;
    } finally {
      SetIsHasPrevent(false);
    }
  };

  const CreatePreventionAlert = (e: PreventRemoveEvent) => {
    Alert.alert(
      alertDetails?.title ?? 'Discard changes?',
      alertDetails?.description ?? 'Changes you made may not be saved. Do you want to discard them and leave the page?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ],
    );
  };

  /**
   * Effect Implementation
   */

  React.useEffect(() => {
    if (initialFields) {
      initialFieldsRef.current = initialFields;
    }
  }, [initialFields]);

  useInternalPreventRemove(isNeedPrevent && isHasPrevent, e => {
    showAlert && CreatePreventionAlert(e);
    PreventCallback?.(e);
  });

  return {
    isNeedPrevent,
    RemovePrevention,
    CreatePreventionAlert,
  };
}

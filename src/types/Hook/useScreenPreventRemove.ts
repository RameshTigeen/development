import type {EventArg, NavigationAction} from '@react-navigation/native';

export type PreventRemoveEvent = EventArg<
  'beforeRemove',
  true,
  {
    action: NavigationAction;
  }
>;

export type PreventRemoveHook<T> = {
  fields: T;
  initialFields: T;
  showAlert?: boolean;
  initialization?: boolean;
  alertDetails?: {
    title?: string;
    description?: string;
  };
  PreventCallback?: (e: PreventRemoveEvent) => void;
};

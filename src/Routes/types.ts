import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';

// RouteStack ( Stack Navigation ) Types

export type RootStackScreens = {
  AppInitializer: undefined;
  Login: undefined;
  RootTab: NavigatorScreenParams<UserStackScreens>;
};

export type RootStackScreenProps<T extends keyof RootStackScreens> = NativeStackScreenProps<RootStackScreens, T>;

// UserStack ( Bottom Tab Navigation ) Types

export type UserStackScreens = {
  Jobs: undefined;
  Timecard: undefined;
  Settings: undefined;
  Profile: undefined;
};

export type UserStackScreensProps<T extends keyof UserStackScreens> = CompositeScreenProps<
  BottomTabScreenProps<UserStackScreens, T>,
  RootStackScreenProps<keyof RootStackScreens>
>;

import React from 'react';

import type {Host} from '../types/Host';
import type {Renter} from '../types/Root/Profile';
import type {UserStackScreensProps} from '../Routes/types';
import type {ToastStateTypes} from '../types/Hook/useToast';
import type {ExploreState, FilterState, ListingRecords} from '../types/Explore';

/// App Context

export type AppContextState = {
  host: Host | null;
  user: Renter | null;
  token: string;
  appVersion: string;
  isInternetConnected: boolean;
  publishableKey: string;
  showInternetAlert: boolean;
  showUpgradeAlert: boolean;
};

// Toast State

export type AppContextValue = AppContextState & {
  toast: ToastStateTypes[];
  setToast: React.Dispatch<React.SetStateAction<ToastStateTypes[]>>;
  setState: React.Dispatch<React.SetStateAction<AppContextState>>;
};

// Explore Context

export interface RenterListingContextValue {
  loading: boolean;
  groupListingByCourse: {
    id: string;
    title: string;
    data: ListingRecords[];
  }[];
  parentNavigation: UserStackScreensProps<'Explore'>['navigation'] | null;
}

export interface ExploreListingContextValues {
  filterFields: FilterState;
  setFilterFields: React.Dispatch<React.SetStateAction<FilterState>>;
  state: ExploreState;
  setState: React.Dispatch<React.SetStateAction<ExploreState>>;
  needInitialization: {
    current: boolean;
  };
}

// Custom Refresh handler Context

export type RefreshHandlerModules = {
  HostListings: boolean;
  HostReservations: boolean;
  EditListing: boolean;
  ListingGalleryManager: boolean;
  ListingBasicInfo: boolean;
  AddListing: boolean;
  Profile: boolean;
  Explore: boolean;
  Rentals: boolean;
  MyListing: boolean;
  Walkthrough: boolean;
  HostProfilePicture: boolean;
  HostBasicDetailsForm: boolean;
  MobileNumberVerification: boolean;
  DriverLicenseVerification: boolean;
  AppInitializer: boolean;
  Signup: boolean;
  Login: boolean;
  ForgotPassword: boolean;
  Logout: boolean;
  ProfileVerification: boolean;
  EditProfile: boolean;
  WebViewer: boolean;
  RootTab: boolean;
  BecomeHostStack: boolean;
  HostListingDetail: boolean;
  RenterListingDetail: boolean;
  HostReservationDetail: boolean;
  RenterReservationDetail: boolean;
  RentalSummary: boolean;
  ListingAvailabilityManager: boolean;
  UserAccountSettings: boolean;
  ClubListingStack: boolean;
  ReservationPaymentConfirmation: boolean;
};

export interface RefreshHandlerValues {
  refreshHandlerRef: {current: RefreshHandlerModules};
  state: RefreshHandlerModules;
  setState: React.Dispatch<React.SetStateAction<RefreshHandlerModules>>;
}

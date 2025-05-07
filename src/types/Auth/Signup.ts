// Component Props

import {Renter} from '../Root/Profile';

export type SignupState = {
  page: number;
  isScreenProcessing: boolean;
};

// Network Fetch Response Props

export type SignupResponse = {
  status: true;
  message: string;
  data: Renter;
};

export type EmailValidationResponse = {
  status: true;
  message: string;
  data: Renter;
};

export type ResetEmailValidationResponse = {
  status: true;
  message: string;
  data: Renter;
};

export type SetPasswordResponse = {
  status: true;
  message: string;
  data: Renter;
};

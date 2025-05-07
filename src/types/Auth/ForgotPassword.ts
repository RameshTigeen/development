import {Renter} from '../Root/Profile';

export type ForgotPasswordEmailValidation = {
  status: true;
  message: string;
  data: Renter;
};

export type ForgotPasswordState = {
  page: number;
  email: string;
  token: string;
  verification_token_expiry_at: string;
};

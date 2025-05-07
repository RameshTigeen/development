/// State Props

import {Renter} from '../Root/Profile';

export interface LoginState {
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
}

export interface LoginHookState {
  email: string;
  password: string;
}

// Network Fetch Response Props

export interface LoginRequestResponse {
  status: true;
  message: string;
  data: Renter;
}

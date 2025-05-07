// Host API response Common

export type HostResponse = {
  status: true;
  message: string;
  data: Host;
};

// Host State

export interface Host {
  id: string;
  country_id: string;
  mobile_number: string;
  advance_notice_period: string;
  min_rental_period: string;
  max_rental_period: string;
  host_verified: boolean;
  driver_license_front_view: string;
  driver_license_back_view: string;
  user_id_fk: string;
  country_id_fk: null;
  get_text_updates: number;
  verification_code: null;
  verification_code_expiry_at: null;
  mobile_number_verified_at: string;
  stripe_account_id: string;
}
export type ClubAvailability = {
  id: number;
  start_date: string;
  end_date: string;
};

export type UploadImageResponse = {
  status: true;
  message: string;
  data: {
    email: string;
    first_name: string;
    last_name: string;
    email_verified: boolean;
    password_updated: boolean;
    profile_updated: boolean;
    image: string;
  };
};

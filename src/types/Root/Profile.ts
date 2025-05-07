import {CourseDetail} from '../Dropdowns/Courses';

export type Renter = {
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  default_image: string;
  host_id: string;
  host_verified: boolean;
  club: {
    id: number;
    name: string;
    club_make_id: number;
    club_type_id: number;
  };
  course: CourseDetail;
  city: CitiesDetail;
  rating: number;
  home_town: string;
  handicap: string;
  email_verified: boolean;
  password_updated: boolean;
  profile_updated: boolean;
  user_type: 'host' | 'user' | 'renter';
  auth_token: string;
  app_version: string;
  verification_token: string | null;
  verification_token_expiry_at: string | null;
  password_token: null | string;
  password_token_expiry_at: string | null;
};

export type CitiesDetail = {
  id: number;
  name: string;
  lat: string;
  lng: string;
  state_id: number;
  state: {
    id: number;
    name: string;
    short_code: string;
  };
};

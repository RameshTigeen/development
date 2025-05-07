import type {ClubMakes} from '../Dropdowns/ClubMakes';
import type {CourseDetail} from '../Dropdowns/Courses';
import type {ClubCondition} from '../Dropdowns/ClubCondition';
import type {ClubSpecifications, Listing} from '../Host/Listing';
import {RootStackScreens} from '../../Routes/types';

export type RenterReservationRatings = {
  pickup_experience: number;
  club_quality: number;
  location: number;
  overall: number;
  additional_comment: string;
};

export type RenterReservationDetail = {
  id: number;
  reservation_no: string;
  start_date: string;
  status: {
    id: number;
    name: string;
    color_code: string;
    description: string;
  };
  payment: {
    id: number;
    currency: string;
    amount: string;
    status: string;
  };
  rating: null | RenterReservationRatings;
  listing: {
    id: number;
    name: string;
    price: string;
    description: string;
    featured_image: null;
    club_make: ClubMakes;
    condition: ClubCondition;
    listing_status: {
      id: number;
      name: string;
      color_code: string;
      description: string;
    };
    course: CourseDetail;
    images: Listing['images'];
  } & ClubSpecifications;
  cancelation: {
    is_canceled: boolean;
    cancelled_at: string;
    reason: number;
    cancelled_by: string;
  };
};

export type GetReservationDetailRequest = {
  status: true;
  message: string;
  data: RenterReservationDetail;
};

export type RenterReservationData = {
  id: number;
  listing: {
    name: string;
    description: string;
    image: string;
  };
  status: {
    id: number;
    name: string;
    color_code: string;
  };
  start_date: string;
  course: CourseDetail;
  is_canceled: boolean;
};

// Failure Response Props

// Success Response

export type GetAllRentalsSuccessResponse = {
  status: true;
  message: string;
  data: {past_rentals: RenterReservationData[]; upcoming_rentals: RenterReservationData[]};
};

export interface RenterReservationDetails {
  HandleClose: () => void;
  data: RootStackScreens['RentalSummary']['listing'] | null;
  startDate: string;
  endDate: string;
}

export type RenterReservationStateBase = {
  pickupExperience: number | null;
  clubQuality: number | null;
  location: number | null;
  overall: number | null;
  additionalComment: string;
};

export type RenterReservationStateProps = {
  reservationDetail: RenterReservationDetail | null;
  cancelationReason: string;
  refreshing: boolean;
} & RenterReservationStateBase;

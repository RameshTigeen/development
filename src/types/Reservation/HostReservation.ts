import type {CourseDetail} from '../Dropdowns/Courses';
import type {RootStackScreens} from '../../Routes/types';

export type HostReservation = {
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

export type HostReservationRatings = {
  id: number;
  pickup_experience: number;
  club_cleanliness: number;
  overall: number;
  additional_comment: string;
};

export type HostReservationDetail = {
  id: number;
  reservation_no: string;
  payment: {
    id: number;
    amount: string;
    status: string;
    currency: string;
  };
  start_date: string;
  status: {
    id: number;
    name: string;
    color_code: string;
    description: string;
  };
  listing: {
    name: string;
    course: CourseDetail;
  };
  rating: null | HostReservationRatings;
  cancelation: {
    is_canceled: true;
    canceled_at: null;
    reason: null;
    canceled_by: null;
  };
};

export interface HostReservationSuccessResponse {
  data: {past_rentals: HostReservation[]; upcoming_rentals: HostReservation[]};
  status: true;
  message: string;
}

export interface HostReservationDetailSuccessResponse {
  data: HostReservationDetail;
  status: true;
  message: string;
}

export interface RenterReservationDetails {
  HandleClose: () => void;
  data: RootStackScreens['RentalSummary']['listing'] | null;
  startDate: string;
  endDate: string;
}

export type HostReservationRatingState = {
  pickupExperience: number | null;
  clubCleanliness: number | null;
  overall: number | null;
  additionalComment: string;
};

export type HostReservationStateProps = HostReservationRatingState & {
  reservationDetail: HostReservationDetail | null;
  cancelationReason: string;
  refreshing: boolean;
};

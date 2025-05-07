import type {ClubSpecifications} from './Listing';
import type {CourseDetail} from '../Dropdowns/Courses';
import type {ClubCondition} from '../Dropdowns/ClubCondition';
import type {ClubPictures} from '../../Views/Reservation/RenterReservationDetails/ClubPictures';

export type RenterAvailability = {
  start_date: string;
  end_date: string;
};

export type RenterListing = {
  id: string;
  name: string;
  price: string;
  description: string;
  featured_image: string;
  club_make: {
    id: string;
    name: string;
  };
  condition: ClubCondition;
  club_status: {
    id: string;
    name: string;
    color_code: string;
    description: string;
  };
  course: CourseDetail;
  images: ClubPictures[];
  availabilities: RenterAvailability[];
} & ClubSpecifications;

export type GetRenterListingResponse = {
  status: true;
  message: string;
  data: RenterListing;
};

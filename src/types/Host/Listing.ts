import type {ClubMakes} from '../Dropdowns/ClubMakes';
import type {CourseDetail} from '../Dropdowns/Courses';
import type {ClubCondition} from '../Dropdowns/ClubCondition';

export type Listing = {
  name: string | null;
  description: string | null;
  condition: ClubCondition;
  club_make: ClubMakes;
  club_status: {
    id: number;
    name: string;
    color_code: string;
  };
  price: string | null;
  course: CourseDetail;
  images: {
    featured: boolean;
    id: number;
    path: string;
  }[];
  featured_image: number | null;
} & ClubSpecifications;

export type ClubSpecifications = {
  driver?: ClubDriver;
  iron?: ClubIron;
  putter?: ClubPutter;
  wedge?: ClubWedge;
};

export type GetListingResponse = {
  status: true;
  message: string;
  data: Listing;
};

/** Golf Club Type Each Specs  */

export type ClubDriver = {
  id: number | null;
  type_id: number | null;
  model: string | null;
  flex: {
    id: number;
    name: string;
  } | null;
  shaft: {
    id: number;
    name: string;
  } | null;
  loft: string | null;
};

export type ClubIron = {
  id: number | null;
  type_id: number | null;
  model: string | null;
  set_composition: string | null;
  lie_angle: string | null;
  shaft: {
    id: number;
    name: string;
  } | null;
  grip: {
    id: number;
    name: string;
  } | null;
  flex: {
    id: number;
    name: string;
  } | null;
};

export type ClubPutter = {
  id: number | null;
  type_id: number | null;
  model: string | null;
  grip: {
    id: number;
    name: string;
  } | null;
  length: string | null;
};

export type ClubWedge = {
  id: number | null;
  type_id: number | null;
  model: string | null;
  bounce: string | null;
  loft: string | null;
  shaft: {
    id: number;
    name: string;
  } | null;
  flex: {
    id: number;
    name: string;
  } | null;
  grind: string | null;
};

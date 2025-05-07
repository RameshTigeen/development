// Host API response Common

import type {DropdownData} from './ClubData';
import {Listing as ListingDetail} from './Listing';

export type ClubDetailsDropdownResponse = {
  status: true;
  message: string;
  data: DropdownData[];
};

export interface ListingGroup {
  host_id_fk: string;
  club_makes_id_fk: string;
  club_conditions_id_fk: string;
  driver_id_fk: string;
  driver_shaft_id_fk: string;
  driver_flexes_id_fk: string;
  driver_loft: string;
  irons_id_fk: string;
  irons_set_composition: string;
  irons_lie_angle: string;
  iron_shafts_id_fk: string;
  iron_flexes_id_fk: string;
  iron_grips_id_fk: string;
  putter_id_fk: string;
  putter_length: string;
  putter_grips_id_fk: string;
  wedge_id_fk: string;
  wedge_loft: string;
  wedge_bounce: string;
  wedge_shafts_id_fk: string;
  wedge_grind: string;
  wedge_flexes_id_fk: string;
  price: string;
  status: string;
  id: number;
}

export interface ListingResponse {
  status: true;
  message: string;
  data: ListingGroup;
}

export interface GetListingByIdResponse {
  status: true;
  message: string;
  data: ListingDetail;
}

export interface ShrinkListing {
  id: number;
  status: {
    id: number;
    name: string;
    color_code: string;
  };
  name: string;
  image: string;
}

export interface GetAllListingResponse {
  status: true;
  message: string;
  data: ShrinkListing[];
}

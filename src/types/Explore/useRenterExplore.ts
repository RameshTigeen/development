import type {ClubMakes} from '../Dropdowns/ClubMakes';
import type {ClubCondition} from '../Dropdowns/ClubCondition';

export type ChipTypes =
  | 'location'
  | 'distance'
  | 'make'
  | 'type'
  | 'condition'
  | 'price'
  | 'availability'
  | 'rating'
  | 'ironSetComposition';

export type ChipItem = {
  key: ChipTypes;
  label: string;
  value: string;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type LocationFilterTypes = 'current_location' | 'user_home_town' | 'custom_location';

export type LocationFilter = {id: number; name: string; lat: number; lng: number; type: LocationFilterTypes};

export type ExploreFilterState = {
  condition: ClubCondition | null;
  makes: ClubMakes[];
  location: LocationFilter | null;
  ownerRating: number | null;
  priceRange: null | {
    start: number;
    end: number;
  };
  CurrentlatLng: LatLng | null;
  distanceRange: null | {
    start: number;
    end: number;
  };
  kitIncludes: {
    driver: boolean;
    iron: boolean;
    wedge: boolean;
    putter: boolean;
    ironSetComposition: number[];
  };
  availability: {
    availability_start_date: string;
    availability_end_date: string;
  };
};

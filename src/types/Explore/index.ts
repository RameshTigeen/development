// Component Variable

import type {SorterVariant} from '../../Views/Explore/Modals/SortModal';
import type {RenterReservationData} from '../Reservation/RenterReservation';

export type CardItem = {
  title: string;
  label: keyof FilterState;
  description: string;
};

export type ListingRecords = {
  id: number;
  name: string;
  price: string;
  description: string;
  rating: string;
  image: string;
  condition: {
    id: number;
    name: string;
    color_code: string;
    suggested_price: string;
  };
  course: {
    id: 1;
    name: string;
    address: {
      line_1: string;
      line_2: string;
      lat: string;
      lng: string;
      city_name: string;
      state_code: string;
    };
  };
};

// Components

export type ExploreState = {
  screenIndex: number;
  isMapViewRecords: boolean;
  refreshing: boolean;
  cardList: CardItem[];
  list: ListingRecords[];
  searchText: string;
  count: number;
  totalCount: number;
  showAvailabilityEditor: boolean;
  selecetedAvaiabilites: {
    startDate: string;
    endDate: string;
  } | null;
  isLocationModelEnabled: boolean;
  selectedSort: SorterVariant | null;
  view: 'listview' | 'mapview';
  locationError: string;
  offset: number;
  showLoadingMore: boolean;
  endOfList: boolean;
  loadingMoreList: boolean;
};

export interface FilterFieldsState {
  label: string;
  value: string;
}

export type FilterState = {
  make: FilterFieldsState;
  model: FilterFieldsState;
  condition: FilterFieldsState;
  price_range: string;
  distance_range: string;
  location: FilterFieldsState;
  owner_rating: string;
  availability_end_date: string;
  availability_start_date: string;
  user_latitude: string;
  user_longitude: string;
  type: {
    driver: string;
    putter: string;
    iron: string;
    wedge: string;
  };
  set_composition: string;
};

export interface CardsProps {
  cardList?: CardItem[];
  HandleRemoveCard: (key: keyof FilterState) => void;
}

export interface ExploreHeaderProps {
  OnChangeView: () => void;
  screenIndex: number;
}

export interface ListingRecordsProps {
  loading: boolean;
  refreshing: boolean;
  data: ListingRecords[];
  OnPress: (id: number) => void;
  HandleRefresh?: () => void;
}

export interface FilterFieldsProps {
  HandleClose: () => void;
  fields: FilterState;
  HandleFieldChange: (key: keyof FilterState, value: any) => void;
}

// Fetch Response

export type RenterListingSuccessResponse = {
  status: true;
  message: string;
  data: ListingRecords[];
};

export type RenterListingFailureResponse = {
  status: false;
  message: string;
};

export type useExploreFilterState = {
  count: number;
  loading: boolean;
  searchText: string;
  refreshing: boolean;
  listings: ListingRecords[];
  selectedSort: SorterVariant | null;
};

export type useRenterReservationState = {
  upcomingRentalsRecords: RenterReservationData[];
  pastRentalsRecords: RenterReservationData[];
  refreshing: boolean;
};

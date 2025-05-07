export type ListingAvailability = {
  id: number;
  listing_id_fk: number;
  start_date: string;
  end_date: string;
};

export type GetListingAvailabilitiesResponse = {
  status: true;
  message: string;
  data: {
    availabilities: ListingAvailability[];
    reserved_availabilities: ListingAvailability[];
    timezone: string;
  };
};

export type CreateListingAvailabilitiesResponse = {
  status: true;
  message: string;
  data: ListingAvailability;
};

export type UpdateListingAvailabilitiesResponse = {
  status: true;
  message: string;
  data: ListingAvailability;
};

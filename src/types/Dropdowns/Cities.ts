export type Cities = {
  id: number | null;
  name: string;
  lat: number;
  lng: number;
};

export type GetCitiesSuccessResponse = {
  status: true;
  message: string;
  data: Cities[];
};

export type CityDetail = {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  lat: string;
  lng: string;
};

export type GetCitiesDetailSuccessResponse = {
  status: true;
  message: string;
  data: CityDetail;
};

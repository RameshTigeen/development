export type DropdownData = {
  id: number | null;
  name: string;
};

export type GetDropdownSuccessResponse = {
  status: true;
  message: string;
  data: DropdownData[];
};

export type DropdownDataDetail = {
  name: string;
  state_id: number;
  lat: string;
  lng: string;
};

export type GetDropdownDetailResponse = {
  status: true;
  message: string;
  data: DropdownDataDetail;
};

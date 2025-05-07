export type ClubKit = {
  id: number | null;
  name: string;
};

export type GetClubKitSuccessResponse = {
  status: true;
  message: string;
  data: ClubKit[];
};

export type ClubKitDetail = {
  name: string;
  state_id: number;
  lat: string;
  lng: string;
};

export type GetClubKitDetailSuccessResponse = {
  status: true;
  message: string;
  data: ClubKitDetail;
};

export type ClubMakes = {
  id: number | null;
  name: string;
};

export type ClubMakesSuccessResponse = {
  status: true;
  message: string;
  data: ClubMakes[];
};

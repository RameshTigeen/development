export type ClubCondition = {
  id: number | null;
  name: string;
  color_code: string;
  suggested_price: string;
};

export type ClubListingConditionSuccessResponse = {
  status: true;
  message: string;
  data: ClubCondition[];
};

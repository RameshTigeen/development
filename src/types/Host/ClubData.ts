export interface DropdownData {
  name: string;
  id: number;
}

export interface SearchData {
  driver: string;
  putter: string;
  irons: string;
  wedge: string;
}

export interface DropdownList {
  list: DropdownData[];
  count: number;
}

export interface SearchDataList {
  driver: DropdownList;
  putter: DropdownList;
  irons: DropdownList;
  wedge: DropdownList;
}

export interface ClubDataHookState {
  makeList: DropdownList;
  typesList: DropdownData[];
  conditionList: DropdownData[];

  flexList: SearchDataList;
  shaftList: SearchDataList;
  gripList: SearchDataList;

  driverModelList: DropdownList;
  putterModelList: DropdownList;
  wedgeModelList: DropdownList;
  ironsModelList: DropdownList;

  searchFlexName: SearchData;
  searchShaftName: SearchData;
  searchGripName: SearchData;
  searchMakeName: string;
  searchmodelName: SearchData;
}

export type ClubType = 'drivers' | 'irons' | 'wedges' | 'putters';

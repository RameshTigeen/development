export type GetDropdownResponse<T> = {
  status: true;
  message: string;
  data: T[];
};

export type GetDropdownDetialResponse<T> = {
  status: true;
  message: string;
  data: T;
};

export type DropdownHookProps<T> = {
  method?: 'POST' | 'GET';
  endpoint?: string;
  limit?: number;
  needInitialization?: boolean;
  searchKey?: keyof T;
  CustomHandleSearch?: () => void;
};

export type DropdownState<T> = {
  data: T[];
  count: number;
  showLoadingMore: boolean;
  offset: number;
  loadingMore: boolean;
  searchWord: string;
};

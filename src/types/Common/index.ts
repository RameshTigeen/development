// Failure Response Props

export type ErrorResponse = {
  status: false;
  message: string;
  error: unknown;
  fetchStatus: 'NOTCOMPLETED' | 'FAILED';
};

export type FailureResponse = ErrorResponse;

// Failure Response Props

export type SuccessResponse = {
  status: true;
  message: string;
};

export type StoreImage = {
  uri: string;
  type: string;
  name: string;
  id: number | null;
};

// Methods

export interface ForwardRefProps {
  /** Callback function for the declare to Focus the Accordion */
  focus: () => void;

  /** Callback function for the declare to blur the Accordion */
  blur: () => void;
}

export type UpdateImageResponse = {
  status: true;
  message: string;
  data: {
    image_path: string;
  };
};

/** File Success Response */
export type AuthenticationType = 'CompleteProfile' | 'Login' | 'OpeningApp' | 'Verification';

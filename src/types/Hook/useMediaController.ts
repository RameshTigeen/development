export type MediaControllerImage = {
  uri: string;
  type: string;
  name: string;
  width: number;
  height: number;
  id: string;
} | null;

export type ImagePickSuccessResponse = {
  data: MediaControllerImage;
  status: true;
};

export type ImagePickMultipleSuccessResponse = {
  data: MediaControllerImage[];
  status: true;
};

export type ImagePickFailureResponse = {
  status: false;
  error: string;
  data: MediaControllerImage;
};

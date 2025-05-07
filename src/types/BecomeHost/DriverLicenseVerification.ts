export type ImageResponse = {
  uri: string;
  type: string;
  name: string;
};

export type DrivingLicenseVerificationState = {
  drivingLicenseFrontView: ImageResponse;
  drivingLicenseBackView: ImageResponse;
};

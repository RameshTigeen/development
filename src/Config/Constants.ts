import Config from '.';

const LOCALSTORAGE_KEYS_APP_OPENING = {
  IS_EMAIL_VERIFIED: 'CLUBADO_IS_EMAIL_VERIFIED',
  IS_SET_PASSED: 'CLUBADO_IS_SET_PASSED_CHECK',
  VALIDATE_EMAIL_SENT_TIME: 'CLUBADO_VALIDATE_EMAIL_SENT_TIME',
};

const dropdownDataListKey = {
  CITIES: 'CLUBADO_STORE_CITIES',
  COURSES: 'CLUBADO_STORE_COURSES',
  CLUBS: 'CLUBADO_STORE_CLUBS',
};

const LOCALSTORAGE_KEYS = {
  REFRESH_TOKEN: 'API_TOKEN_CLUBADO',
  APP_VERSION: 'CLUBADO_APP_VERSION',
  USER: 'CLUBADO_USER',
  HOST: 'CLUBADO_HOST_USER',
  ...LOCALSTORAGE_KEYS_APP_OPENING,
  ...dropdownDataListKey,
};

const BASE_URL = Config.isProduction ? 'https://clubado.tennigence.com' : 'http://192.168.0.49:8995';

const MAPAPIKey = 'AIzaSyAvU-7olfU4KmtYKFNORc13d55i_cdNFWg'; // Client API key
// const MAPAPIKey = "AIzaSyAmu8gwqiW-_7eBd8BhKfWs1u6EX4FnNa0"; // #Our Tigeen Computing API key

const ASPECTRADIO = {
  PORTRAIT: 4 / 5,
  SQUARE: 1,
  LANDSCAPE: 16 / 9,
};

const Constant = {
  BASE_URL: BASE_URL + '/api',
  LOCALSTORAGE_KEYS,
  FILE_SIZE: 5,
  API_KEY: Config.isProduction ? 'MNGH67Y8GPA' : 'K5vqedFMHN0W2BUSZZeZYOpUbqbsHmX6',
  CLUBADO_TERMS_CONDTION: 'https://clubadogolf.com/',
  ONESIGNAL_ID: '9abb17c8-22d0-41e5-a998-16c75bfc1afc',
  MAPAPIKey,
  ASPECTRADIO,
};
export default Constant;

export type MethodsProps = {
  /**
   * @param  endpoint - Define the network endpoint to fetch the as per request, that endpoint concat with Base URL
   */
  endpoint: string;
  /**
   * @param  headers - Define the cusom headers to request, That endpoint Concat with Base Common Headers
   */
  headers?: Headers;
  /**
   * @param  body - Body data of requested API call as per request, that data's type will be consider of as per API call RAW JSON | FORM DATA  (#optional)
   */
  body?: string | any | any;
  /**
   * @param  formData - Body data of requested API call as per request, that data's type will be consider of as per API call RAW JSON and that will be converts to formdata as per type  (#optional)
   */
  formData?: any;
  /**
   * @param  callback - callback trigger when the api wants to call another calls
   */
  callback?: () => void | Promise<void>;
  /**
   * @param isNeedAuthorizationVerification- Define the method to be pass the authorization controll, if false not affect the api calling
   * they will check if the api need to pass the authorization verification from the user token
   */
  isNeedAuthorizationVerification?: boolean;
  /**
   * @param timeout - Define timeout limit for the fetching timings api ( Default (30s) 30000)
   */
  timeout?: number;
};

export type useAPIHookProps = {
  /**
   * @param  initialLoaders - Define the network endpoint to fetch the as per request, that endpoint concat with Base URL
   */
  initialLoaders?: {
    getting?: boolean;
    posting?: boolean;
    putting?: boolean;
    patching?: boolean;
    deleting?: boolean;
  };
  /**
   * @param  before - Define the network endpoint to fetch the as per request, that endpoint concat with Base URL
   */
  before?: {
    get?: Callback;
    post?: Callback;
    put?: Callback;
    patch?: Callback;
    delete?: Callback;
  };
  /**
   * @param  after - Define the network endpoint to fetch the as per request, that endpoint concat with Base URL
   */
  after?: {
    get?: Callback;
    post?: Callback;
    put?: Callback;
    patch?: Callback;
    delete?: Callback;
  };
};

export type Callback = () => Promise<void>;

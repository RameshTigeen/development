import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {navigationRef} from '../../../App';

import useToast from './useToast';
import useDebounce from './useDebounce';

import {useAppContext} from '../../Contexts/AppContext';

import Config from '../../Config';
import Constant from '../../Config/Constants';

import type {ErrorResponse} from '../../types/Common';
import type {MethodsProps, useAPIHookProps} from '../../types/Hook/useAPI';
import {ValidationUtils} from '../../Helper/ValidationUtil';

/** As the GP Suggest we keep the timeout 30s we ususally handle with 10s  */
const TIMEOUT = 30000;

export default function useAPI({
  initialLoaders = {
    getting: false,
    posting: false,
    putting: false,
    patching: false,
    deleting: false,
  },
}: useAPIHookProps) {
  const baseURL = Constant.BASE_URL;
  const [state, setState] = React.useState(initialLoaders);
  const {ShowToast} = useToast();
  const {setState: setVersionUpgradeState} = useAppContext();

  const loading = React.useRef(false);

  const HandleTokenNotAuthenticated = React.useCallback(
    useDebounce(() => {
      if (!navigationRef.isReady()) return;
      if (loading.current) return;

      // why use the ref instead of using hook ( useNavigation ) ?
      // because the using this hook from the inital starter of app and to the all the hook and screen utils part of method to handle the api so prioritize the order (render and mount component concept) In the component first time mounting
      // call hook first using this mount this hook so if the navigationContainer is not mounted then use hook to we have error like navigation is not object so we using this ref to handle the navigation
      AsyncStorage.multiRemove(Object.values(Constant.LOCALSTORAGE_KEYS))
        .then(() => {
          if (navigationRef) {
            ShowToast({
              variant: 'Info',
              title: 'Token Unauthorized',
              message: 'Your token has been expired, Please login again.',
            });

            navigationRef.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          loading.current = false;
        });
      loading.current = true;
    }, 500),
    [navigationRef, loading.current],
  );

  const HandleResponseMiddleware = async <T>(
    response: Response,
    isNeedAuthorizationVerification: boolean,
  ): Promise<T> => {
    const result = await response.json();

    if (!response.ok) {
      console.log(
        `API Failed: you can trace and visit the log using Trace_ID - ${result?.trace_id} for more details. and response message: ${result.message}`,
      );

      if (isNeedAuthorizationVerification && response.status === 401) {
        await HandleTokenNotAuthenticated();
      } else {
        return result;
      }
    }

    const isUpgradeAvailable = result.app_version
      ? ValidationUtils.IsVersionAreSame(Config.appVersion, result.app_version)
      : false;
    /**
     *  In the we don't compare the patch version for the upgrade checkup and
     *  if the minor version or major version have upgrade then only we show the upgrade model to indicate user need to update the app
     */

    setVersionUpgradeState(prev => ({
      ...prev,
      showUpgradeAlert: isUpgradeAvailable,
    }));
    return result;
  };

  /**
   * CRUD Operations ( API Methods )
   */

  async function Get<T>({
    endpoint,
    headers = new Headers(),
    isNeedAuthorizationVerification = true,
    timeout,
  }: MethodsProps): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout ?? TIMEOUT);

    try {
      setState(prev => ({
        ...prev,
        getting: true,
      }));
      await APIHelper.AddedCommonHeaders(headers);
      console.log(JSON.stringify({endpoint: baseURL + endpoint, headers}));
      const response = await fetch(baseURL + endpoint, {
        method: 'GET',
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const result = await HandleResponseMiddleware<T>(
        response,
        isNeedAuthorizationVerification,
      );
      return result;
    } catch (error) {
      return APIHelper.ErrorHandler(error) as T;
    } finally {
      setState(prev => ({...prev, getting: false}));
    }
  }

  async function Post<T>({
    endpoint,
    body = undefined,
    formData = undefined,
    headers = new Headers(),
    isNeedAuthorizationVerification = true,
    timeout,
  }: MethodsProps): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout ?? TIMEOUT);

    try {
      setState(prev => ({...prev, posting: true}));
      await APIHelper.AddedCommonHeaders(headers);

      console.log(
        JSON.stringify({
          endpoint: baseURL + endpoint,
          headers,
          body,
          formData,
        }),
      );

      const response = await fetch(baseURL + endpoint, {
        headers,
        method: 'POST',
        body: formData
          ? APIHelper.ExisitingDataConvertAsFormData(formData)
          : body,
        signal: controller.signal,
      });
      console.log(response);

      clearTimeout(timeoutId);
      const result = await HandleResponseMiddleware<T>(
        response,
        isNeedAuthorizationVerification,
      );
      return result;
    } catch (error) {
      return APIHelper.ErrorHandler(error) as T;
    } finally {
      setState(prev => ({...prev, posting: false}));
    }
  }

  async function Put<T>({
    endpoint,
    body = undefined,
    headers = new Headers(),
    isNeedAuthorizationVerification = true,
    timeout,
  }: MethodsProps): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout ?? TIMEOUT);
    try {
      setState(prev => ({...prev, putting: true}));
      await APIHelper.AddedCommonHeaders(headers);
      console.log(
        JSON.stringify({endpoint: baseURL + endpoint, headers, body}),
      );

      const response = await fetch(baseURL + endpoint, {
        method: 'PUT',
        headers,
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await HandleResponseMiddleware<T>(
        response,
        isNeedAuthorizationVerification,
      );
      return result;
    } catch (error) {
      return APIHelper.ErrorHandler(error) as T;
    } finally {
      setState(prev => ({...prev, putting: false}));
    }
  }

  async function Patch<T>({
    endpoint,
    body = undefined,
    headers = new Headers(),
    isNeedAuthorizationVerification = true,
    timeout,
  }: MethodsProps): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout ?? TIMEOUT);
    try {
      setState(prev => ({
        ...prev,
        patching: true,
      }));
      await APIHelper.AddedCommonHeaders(headers);
      headers.append('Content-Type', 'application/json');
      console.log(
        JSON.stringify({endpoint: baseURL + endpoint, headers, body}),
      );

      const response = await fetch(baseURL + endpoint, {
        headers,
        method: 'PATCH',
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await HandleResponseMiddleware<T>(
        response,
        isNeedAuthorizationVerification,
      );
      return result;
    } catch (error) {
      return APIHelper.ErrorHandler(error) as T;
    } finally {
      setState(prev => ({...prev, patching: false}));
    }
  }

  async function Delete<T>({
    endpoint,
    body = undefined,
    headers = new Headers(),
    isNeedAuthorizationVerification = true,
    timeout,
  }: MethodsProps): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout ?? TIMEOUT);
    try {
      setState(prev => ({
        ...prev,
        deleting: true,
      }));
      await APIHelper.AddedCommonHeaders(headers);
      console.log(
        JSON.stringify({endpoint: baseURL + endpoint, headers, body}),
      );
      const response = await fetch(baseURL + endpoint, {
        method: 'DELETE',
        headers,
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await HandleResponseMiddleware<T>(
        response,
        isNeedAuthorizationVerification,
      );
      return result;
    } catch (error) {
      return APIHelper.ErrorHandler(error) as T;
    } finally {
      setState(prev => ({...prev, deleting: false}));
    }
  }

  return {
    ...state,
    setState,
    Get,
    Post,
    Put,
    Patch,
    Delete,
  };
}

export class APIHelper {
  static async AddedCommonHeaders(headers: Headers): Promise<Headers> {
    const token = await AsyncStorage.getItem(
      Constant.LOCALSTORAGE_KEYS.REFRESH_TOKEN,
    );
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Don't remove the timezone because this API handles the time configuration (converting to UTC) to the server-side timezone.
    headers.set('time-zone', timeZone);
    headers.set('x-api-key', Constant.API_KEY);
    token && headers.set('Authorization', 'Bearer ' + token);
    return headers;
  }

  static ExisitingDataConvertAsFormData(data: any) {
    if (!data) return undefined;
    const formdata = new FormData();
    Object.keys(data ?? {})
      ?.filter(item => !!data[item])
      .map(key => {
        formdata.append(key, String(data[key]));
      });
    return formdata;
  }

  static ErrorHandler(error: any): ErrorResponse {
    const response: ErrorResponse = {
      status: false,
      message: 'Something went wrong!. Please try again.',
      error: error,
      fetchStatus: 'NOTCOMPLETED',
    };
    if (error.name === 'AbortError') {
      response.message = 'Please check your internet connection and try again';
    } else if (error instanceof TypeError) {
      response.message =
        'A network error occurred. Please check your internet connection.';
    } else if (error instanceof SyntaxError) {
      response.message =
        'There was a syntax error in the response from the server.';
    } else if (error instanceof RangeError) {
      response.message = 'A range error occurred.';
    } else if (error instanceof EvalError) {
      response.message = 'An eval error occurred.';
    } else if (error instanceof ReferenceError) {
      response.message = 'A reference error occurred.';
    } else if (error instanceof URIError) {
      response.message = 'A URI error occurred.';
    } else {
      response.message = 'A Call error occurred.';
    }

    return response;
  }
}

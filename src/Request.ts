import type {
  AxiosStatic,
  AxiosRequestConfig,
  CancelTokenSource as TokenSource,
  CancelTokenStatic as TokenStatic,
} from 'axios';

import axios from 'axios';
import { Config } from '@/Config';
import { STORAGE_KEYS } from '@/helpers/constant';
import { getStorage } from '@/utils';

axios.defaults.baseURL = Config.API.URL;

axios.interceptors.request.use((config) => {
  const accessToken = getStorage(STORAGE_KEYS.JWT);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  config.headers['Content-Type'] = 'application/json';
  config.headers.Accept = 'application/json';
  return config;
});

export interface CancelTokenSource extends TokenSource { }
export interface CancelTokenStatic extends TokenStatic { }
export interface RequestConfig extends AxiosRequestConfig { }
export interface HttpModel extends AxiosStatic { }

export const Http: HttpModel = axios;
export const FixedHttp = axios.create();
FixedHttp.interceptors.request.use((config) => {
  const accessToken = getStorage(STORAGE_KEYS.JWT);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/* eslint-disable quote-props */
import 'whatwg-fetch';
import * as QS from 'qs';
import { longanDispatchError } from 'longan-sdk';
import get from 'lodash/get';

import { REQUEST_MATERIAL } from './constants';

interface IOption {
  method?: string;
  headers?: any;
  body?: any;
  credentials?: RequestCredentials;
  redirect?: RequestRedirect;
}

interface IConfig extends IOption {
  baseUrl?: string;
}

interface IResponseError extends Error {
  response?: Response;
}

// 目前支持的请求数据类型
// eslint-disable-next-line
export enum ContentType {
  json = 'application/json',
  form = 'application/x-www-form-urlencoded',
  formData = 'multipart/form-data'
}

const defaultConfig: IConfig = {
  baseUrl: '',
  redirect: 'manual',
  credentials: 'include',
  method: 'GET',
};

/**
 * 处理请求url
 * @param baseUrl 基础路径
 * @param relativeUrl 相对路径
 * @param query 请求参数
 */
function parseUrl<T>(baseUrl = '', relativeUrl = '', query?: T): string {
  let res = '';
  try {
    res += baseUrl;

    if (res.endsWith('/') && relativeUrl.startsWith('/')) {
      res += relativeUrl.replace('/', '');
    } else {
      res += relativeUrl;
    }

    if (query) {
      res += `?${QS.stringify(query)}`;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('parseUrl', err);
  }
  return res;
}

/**
 * 处理请求头部
 * @param headerInit
 * @param headers
 */
function parseHeaders(headerInit: IOption['headers'] = {}, headers: IOption['headers'] = {}): Record<string, unknown> {
  let res: Record<string, unknown> = {};
  try {
    if (headerInit) {
      res = { ...res, ...headerInit };
    }
    if (headers) {
      res = { ...res, ...headers };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('parseHeaders', err);
  }
  return res;
}

/**
 * 处理请求数据类型
 * @param data 请求的数据
 * @param headers
 */
function parseBody<T>(data: T, headers: IOption['headers'] = {}): string | T {
  let res;
  const requestType = headers['Content-Type'] || '';
  try {
    switch (requestType) {
      case ContentType.json:
        res = JSON.stringify(data);
        break;
      case ContentType.form:
        res = QS.stringify({ ...data });
        break;
      default:
        res = data;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('parseBody', err);
  }
  return res;
}

/**
 * 处理结果为不同数据类型
 * @param res 请求结果
 */
function parseResponse<T>(res: Response): Promise<T | RequestInit['body']> {
  if (res.status === 204 || res.status === 205) {
    return null;
  }
  const contentType = res.headers.get('Content-Type');
  if (contentType) {
    if (contentType.includes('json')) {
      return res.json();
    }
    if (contentType.includes('image')) {
      return res.arrayBuffer();
    }
    if (contentType.includes('text')) {
      return res.text();
    }
    if (contentType.includes('form')) {
      return res.formData();
    }
    if (contentType.includes('video')) {
      return res.blob();
    }
  }
  return res.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: Response): Response | void {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error: IResponseError = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default class FetchRequest {
  private readonly config: IOption = {};

  private readonly baseUrl: string = '';

  constructor(configs: IConfig = {}) {
    const { baseUrl, ...otherConfigs } = configs;
    this.baseUrl = baseUrl || '';
    this.config = otherConfigs ? { ...otherConfigs } : {};
  }

  /**
   * request
   * @param url
   * @param params 请求参数
   * @param options 配置参数
   */
  request<T, K>(url: string, params?: T, options: IOption = {}, inQuery?: boolean): any {
    try {
      const { config, baseUrl } = this;
      const option: IOption = { ...config, ...options };
      let newUrl = url;
      option.headers = parseHeaders(config.headers || null, options.headers || null);

      const newMethod = options.method || config.method || 'GET';
      REQUEST_MATERIAL.requestMethod = newMethod;
      REQUEST_MATERIAL.requestUrl = url;
      if (newMethod !== 'GET' && !inQuery) {
        option.body = parseBody<T>(params, option.headers);
      }
      // 只在GET请求拼接参数 其他请求有可能超长
      if (newMethod.toUpperCase() === 'GET' || inQuery) {
        newUrl = parseUrl(baseUrl, url, params);
      }
      return fetch(newUrl, {
        ...option,
      })
        .then((data: Response) => checkStatus(data))
        .then((data: Response) => parseResponse<K>(data))
        // .then(data => longanCheckErrno(data, options, url))
        .catch((err: Error) => {
          try {
            const status = get(err, ['response', 'status'], '');
            const errorMsg = get(err, ['message'], '');
            let error_tag = 'network_error';
            let error_level: '2' | '1' | '0' = '2';
            let error_message = '网络错误';
            if (status) {
              // 如果状态码存在再报警，一般情况下网络问题只收集错误，不上报
              error_level = '1';
              error_message = `${url}接口请求报错`;
              if (Number(status) >= 500) {
                error_tag = 'fetch_error_500';
              } else if (Number(status) >= 400) {
                error_tag = 'fetch_error_400';
              }
            }
            if (url !== '/static/buildVersion.json' && status !== 504) {
              longanDispatchError({
                error_message,
                error_level,
                error_content: JSON.stringify({
                  url: encodeURIComponent(url),
                  params,
                  method: newMethod,
                  status,
                  errorMsg,
                }),
                error_tag,
              });
            }
          } catch (error) {
            console.log(error);
          }
          throw err;
        });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('request', err);
      return {};
    }
  }

  getRequest<T, K>(url: string, params?: T, options?: IOption): Promise<K> {
    return this.request(url, params, { ...options, method: 'GET' });
  }

  postRequest<T, K>(url: string, params?: T, options?: IOption): Promise<K> {
    return this.request(url, params, { ...options, method: 'POST' });
  }

  /**
   * 使用默认配置发起请求
   * @param method
   * @param config
   */
  static create(method = 'GET', config: IConfig = defaultConfig) {
    return new FetchRequest({ ...config, method });
  }

  static getRequest<T, K>(url: string, params?: T): Promise<IResponseData<K>> {
    return FetchRequest.create().request(url, params, { headers: {} });
  }

  static postRequest<T, K>(url: string, params?: T): Promise<IResponseData<K>> {
    return FetchRequest.create('POST').request(url, params, {
      headers: { 'Content-Type': ContentType.form },
    });
  }

  static postJsonRequest<T, K>(url: string, params?: T): Promise<IResponseData<K>> {
    return FetchRequest.create('POST').request(url, params, {
      headers: { 'Content-Type': ContentType.json },
    });
  }

  static postJsonQueryRequest<T, K>(url: string, params?: T): Promise<IResponseData<K>> {
    return FetchRequest.create('POST').request(url, params, {
      headers: { 'Content-Type': ContentType.json },
    }, true);
  }

  static postFormDataRequest<T, K>(url: string, params?: T): Promise<IResponseData<K>> {
    return FetchRequest.create('POST').request(url, params);
  }
}

export const parseParams = (params: { [key: string]: any }) => (
  Object.keys(params)
    .map((key: string) => (`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`))
    .join('&')
);

const { create, getRequest, postRequest, postJsonRequest, postFormDataRequest, postJsonQueryRequest } = FetchRequest;

export {
  create,
  getRequest,
  postRequest,
  postJsonRequest,
  postFormDataRequest,
  postJsonQueryRequest,
};

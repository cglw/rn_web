import {HttpClient} from '../sdk/http/HttpClient';
import {CommonInterceptors} from './CommonInterceptors';
import {HttpResponse} from '../sdk/http/ResponseChain';

function appendParams(url: string, params: any): string {
  if (params) {
    url = url + '?';
    Object.keys(params).forEach(
      (key) =>
        (url =
          url +
          encodeURIComponent(key) +
          '=' +
          encodeURIComponent(params[key]) +
          '&'),
    );
    return url.substring(0, url.length - 1);
  }
  return url;
}

export class Http {
  static fetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    return HttpClient.getInstance()
      .fetch<HttpResponse<T>>(input, init)
      .then((res) => {
        return res.response;
      });
  }
  static defaultFetch(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<BaseResponse<any>> {
    return Http.fetch<BaseResponse<any>>(input, init);
  }

  private static common(
    method: string = 'GET',
    url: string,
    params?: object,
    body?: object,
    options: object = {},
  ): Promise<BaseResponse<any>> {
    return Http.defaultFetch(appendParams(url, params), {
      body: JSON.stringify(body),
      method: method,
      ...options,
    });
  }
  static get(
    url: string,
    params?: object,
    options: object = {},
  ): Promise<BaseResponse<any>> {
    return Http.common('GET', url, params, options);
  }

  static post(
    url: string,
    body?: object,
    params?: object,
    options: object = {},
  ): Promise<BaseResponse<any>> {
    return Http.common('POST', url, params, body, options);
  }
  static put(
    url: string,
    body?: object,
    params?: object,
    options: object = {},
  ): Promise<BaseResponse<any>> {
    return Http.common('PUT', url, params, body, options);
  }
  static delete(
    url: string,
    body?: object,
    params?: object,
    options: object = {},
  ): Promise<BaseResponse<any>> {
    return Http.common('DELETE', url, params, body, options);
  }
}
HttpClient.getInstance().addInterceptors(new CommonInterceptors());

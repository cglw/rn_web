import {HttpClient} from '../sdk/http/HttpClient';
import {CommonInterceptors} from './CommonInterceptors';
import {HttpResponse} from '../sdk/http/ResponseChain';
import {HttpUtils} from '../sdk/http/HttpUtils';
interface ReqType<T> {
  get(): Promise<T>;
  post(): Promise<T>;
  put(): Promise<T>;
  delete(): Promise<T>;
}

class RequestBuilder implements ReqType<BaseResponse<any>> {
  private _method: string = 'GET';
  private readonly _url: string = '';
  private _params?: object;
  private _body: object = {};
  private _options?: object;
  constructor(url) {
    this._url = url;
  }

  params(value?: object) {
    this._params = value;
    return this;
  }

  body(value: object) {
    this._body = value;
    return this;
  }

  options(value: object) {
    this._options = value;
    return this;
  }

  private commonReq() {
    return Http.defaultFetch(HttpUtils.appendParams(this._url, this._params), {
      body: HttpUtils.objectToFormData(this._body),
      method: this._method,
      ...this._options,
    });
  }

  delete(): Promise<BaseResponse<any>> {
    this._method = 'DELETE';
    return this.commonReq();
  }

  get(): Promise<BaseResponse<any>> {
    this._method = 'GET';
    return this.commonReq();
  }

  post(): Promise<BaseResponse<any>> {
    this._method = 'POST';
    return this.commonReq();
  }

  put(): Promise<BaseResponse<any>> {
    this._method = 'PUT';
    return this.commonReq();
  }
}

export class Http {
  private static instance: Http;
  private static create() {
    if (!this.instance) {
      this.instance = new Http();
    }
    return this.instance;
  }

  static load(url: string) {
    return new RequestBuilder(url);
  }

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
    url: string,
    params?: object,
    body: object = {},
    options: object = {},
  ): RequestBuilder {
    return Http.load(url).params(params).body(body).options(options);
  }
  static get(
    url: string,
    params?: object,
    options: object = {},
  ): Promise<BaseResponse<any>> {
    return Http.common(url, params, options).get();
  }

  static post(
    url: string,
    body?: object,
    params?: object,
    options: object = {},
  ): Promise<BaseResponse<any>> {
    return Http.common(url, params, body, options).post();
  }
  static put(
    url: string,
    body?: object,
    params?: object,
    options: object = {},
  ): Promise<BaseResponse<any>> {
    return Http.common(url, params, body, options).put();
  }
  static delete(
    url: string,
    body?: object,
    params?: object,
    options: object = {},
  ): Promise<BaseResponse<any>> {
    return Http.common(url, params, body, options).delete();
  }
}
HttpClient.getInstance().addInterceptors(new CommonInterceptors());

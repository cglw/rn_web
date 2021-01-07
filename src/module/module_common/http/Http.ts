import {HttpClient} from '../../../sdk/http/HttpClient';
import {CommonInterceptors} from './CommonInterceptors';
import {HttpResponse} from '../../../sdk/http/ResponseChain';
import {HttpUtils} from '../../../sdk/http/HttpUtils';
import {DataHandleInterceptors} from './DataHandleInterceptors';
import {BaseResponse} from '../bean/BaseResponse';
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
  private _isOriginResponse: boolean;
  constructor(url) {
    this._url = url;
    this._isOriginResponse = false;
  }

  params(value?: object) {
    this._params = value;
    return this;
  }
  originResponse() {
    this._isOriginResponse = true;
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

  private commonReq<T>() {
    let formData = HttpUtils.objectToFormData(this._body);
    let body = {};
    if (!HttpUtils.isEmptyObject(formData)) {
      body = {
        body: HttpUtils.objectToFormData(this._body),
      };
    }
    this._options = {
      isOriginResponse: this._isOriginResponse,
      ...this._options,
    };
    return Http.defaultFetch<T>(
      HttpUtils.appendParams(this._url, this._params),
      {
        ...body,
        method: this._method,
        ...this._options,
      },
    );
  }

  delete<T>(): Promise<T> {
    this._method = 'DELETE';
    return this.commonReq();
  }

  get<T>(): Promise<T> {
    this._method = 'GET';
    return this.commonReq();
  }

  post<T>(): Promise<T> {
    this._method = 'POST';
    return this.commonReq();
  }

  put<T>(): Promise<T> {
    this._method = 'PUT';
    return this.commonReq();
  }
}

export class Http {
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
  static defaultFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    return Http.fetch<T>(input, init);
  }

  private static common(
    url: string,
    params?: object,
    body: object = {},
    options: object = {},
  ): RequestBuilder {
    return Http.load(url).params(params).body(body).options(options);
  }
  static get<T>(
    url: string,
    params?: object,
    options: object = {},
  ): Promise<T> {
    return Http.common(url, params, options).get<T>();
  }

  static post<T>(
    url: string,
    body?: object,
    params?: object,
    options: object = {},
  ): Promise<T> {
    return Http.common(url, params, body, options).post<T>();
  }
  static put<T>(
    url: string,
    body?: object,
    params?: object,
    options: object = {},
  ): Promise<T> {
    return Http.common(url, params, body, options).put<T>();
  }
  static delete<T>(
    url: string,
    body?: object,
    params?: object,
    options: object = {},
  ): Promise<T> {
    return Http.common(url, params, body, options).delete<T>();
  }
}
HttpClient.getInstance().addInterceptors(new CommonInterceptors());
HttpClient.getInstance().addInterceptors(new DataHandleInterceptors());

import { RequestApiInterceptor, LogInterceptor } from './Interceptors';
import { Interceptor } from './ResponseChain';
import { getResponseWithInterceptorChain } from './RealCall';

interface ApiInterface {
  fetch<T>(input: RequestInfo, init?: RequestInit): Promise<T>;
}
export class HttpClient implements ApiInterface {
  private static instance: HttpClient;
  private constructor() {}
  interceptors: Array<Interceptor> = [
    new LogInterceptor(),
    new RequestApiInterceptor(),
  ];

  static getInstance() {
    if (!this.instance) {
      this.instance = new HttpClient();
    }
    return this.instance;
  }
  //完全设置自己的拦截器
  initInterceptors(interceptors: Array<Interceptor> = []) {
    this.interceptors = interceptors;
  }
  //新增拦截器
  addInterceptors(interceptor: Interceptor) {
    this.interceptors.unshift(interceptor);
  }

  fetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    return <Promise<T>>(
      getResponseWithInterceptorChain(input, init, this.interceptors)
    );
  }
}

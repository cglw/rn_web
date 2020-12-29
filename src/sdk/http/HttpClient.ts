import {CallApiInterceptor, LogInterceptor} from './Interceptors';
import {HttpResponse, Interceptor} from './ResponseChain';
import {getResponseWithInterceptorChain} from './RealCall';

interface ApiInterface {
  fetch<T>(input: RequestInfo, init?: RequestInit): Promise<T>;
}
export class HttpClient implements ApiInterface {
  private static instance: HttpClient;
  private constructor() {}
  interceptors: Array<Interceptor> = [
    new LogInterceptor(),
    new CallApiInterceptor(),
  ];

  static getInstance() {
    if (!this.instance) {
      this.instance = new HttpClient();
    }
    return this.instance;
  }
  addInterceptors(interceptor: Interceptor) {
    this.interceptors.unshift(interceptor);
  }

  fetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    return <Promise<T>>(
      getResponseWithInterceptorChain(input, init, this.interceptors)
    );
  }
}

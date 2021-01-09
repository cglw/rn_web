import { HttpRequest, Interceptor, RealTaskChain } from './ResponseChain';

export function getResponseWithInterceptorChain<T>(
  input: RequestInfo,
  init?: RequestInit,
  interceptors: Array<Interceptor> = [],
) {
  let httpRequest: HttpRequest = new HttpRequest(
    input,
    init === null || init === void 0 ? {} : init,
  );
  let realTaskChain = new RealTaskChain(
    interceptors,
    0,
    httpRequest,
    Promise.resolve({}),
  );
  return <Promise<T>>realTaskChain.proceed(httpRequest);
}

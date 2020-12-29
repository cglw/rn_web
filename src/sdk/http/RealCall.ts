import {HttpRequest, Interceptor, RealTaskChain} from './ResponseChain';

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

//
// export function testReq() {
//   getResponseWithInterceptorChain<BaseResponse<any>>(
//     'https://testwx.baijiayun.com/api/app/banner',
//     {},
//     [new LogInterceptor(), new CallApiInterceptor()],
//   )
//     .then((res) => {
//       console.info('success');
//       console.info(res);
//     })
//     .catch((error) => {
//       console.info('error');
//       console.info(error);
//     });
// }

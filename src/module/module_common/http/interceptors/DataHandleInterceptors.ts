import {
  Chain,
  HttpResponse,
  Interceptor,
} from '../../../../sdk/http/ResponseChain';

export class DataHandleInterceptors implements Interceptor {
  intercept(chain: Chain): Promise<HttpResponse<any>> {
    let httpRequest = chain.request();
    let isOriginResponse = false;
    if (httpRequest.init) {
      // @ts-ignore
      isOriginResponse = httpRequest.init['isOriginResponse'];
    }
    let promise = chain.proceed(httpRequest);
    return promise.then(res => {
      return isOriginResponse ? res : new HttpResponse(res.response.data);
    });
  }
}

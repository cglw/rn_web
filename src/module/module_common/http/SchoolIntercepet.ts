import {
  Chain,
  HttpResponse,
  Interceptor,
} from '../../../sdk/http/ResponseChain';

class SchoolIntercepet implements Interceptor {
  intercept(chain: Chain): Promise<HttpResponse<any>> {
    let httpRequest = chain.request();
    let promise = chain.proceed(httpRequest);

    return promise;
  }
}

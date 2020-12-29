import {Chain, HttpResponse, Interceptor} from './ResponseChain';

export class CallApiInterceptor implements Interceptor {
  intercept(chain: Chain): Promise<HttpResponse<any>> {
    let httpRequest = chain.request();
    console.info('httpRequest=====start');
    console.info(httpRequest.init);
    console.info(httpRequest.input);
    return fetch(httpRequest.input, httpRequest.init).then((res) => {
      return new HttpResponse(res);
    });
  }
}

export class LogInterceptor implements Interceptor {
  intercept(chain: Chain): Promise<HttpResponse<any>> {
    let httpRequest = chain.request();
    console.info('HttpRequest');
    console.info('input:');
    console.info(httpRequest.input);
    console.info('init:');
    console.info(httpRequest.init);
    console.info('-------------------------------------------------');
    let httpResponse = chain.proceed(httpRequest);
    return httpResponse.then((res) => {
      if (res.response.ok) {
        let response = res.response.clone();
        const headers = response.headers;
        response.json().then((res) => {
          console.info('HttpResponse');
          console.info('header:');
          console.info(headers);
          console.info('input:');
          console.info(httpRequest.input);
          console.info(res);
          console.info('-------------------------------------------------');
        });
      }
      return res;
    });
  }
}

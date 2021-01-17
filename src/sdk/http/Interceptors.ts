import { Chain, HttpResponse, Interceptor } from './ResponseChain';

export class RequestApiInterceptor implements Interceptor {
  intercept(chain: Chain): Promise<HttpResponse<any>> {
    let httpRequest = chain.request();
    return fetch(httpRequest.input, httpRequest.init).then(res => {
      res.headers.forEach((v: string, k: string) => console.log(k, v));
      return new HttpResponse(res);
    });
  }
}

export class LogInterceptor implements Interceptor {
  intercept(chain: Chain): Promise<HttpResponse<any>> {
    let httpRequest = chain.request();
    console.info('HttpRequest');
    console.info(httpRequest.input);
    console.info(httpRequest.init);
    console.info('-------------------------------------------------');
    let httpResponse = chain.proceed(httpRequest);
    return httpResponse.then(async res => {
      if (res.response.ok) {
        let response: Response = res.response.clone();
        response.json().then(json => {
          console.info('HttpResponse');
          console.info(httpRequest.input);
          console.info(json);
          console.info('-------------------------------------------------');
        });
      }
      return res;
    });
  }
  printLog() {}
}

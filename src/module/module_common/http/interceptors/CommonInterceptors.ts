import { Chain, HttpResponse, Interceptor } from '@/sdk/http/ResponseChain';
import { BaseResponse } from '../../bean/BaseResponse';
const BASE_URL = 'https://testwx.baijiayun.com/';
export class CommonInterceptors implements Interceptor {
  intercept(chain: Chain): Promise<HttpResponse<any>> {
    let request = chain.request();
    if (typeof request.input === 'string') {
      if (!request.input.startsWith('http')) {
        request.input = BASE_URL + request.input;
      }
    }
    let headers = {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3R3eC5iYWlqaWF5dW4uY29tL2FwaS9hcHAvbG9naW4iLCJpYXQiOjE2MDkyNDk3NTksImV4cCI6MTYwOTU1MjE1OSwibmJmIjoxNjA5MjQ5NzU5LCJqdGkiOiJ5NU9uYldubUMxbTBjUjJyIiwic3ViIjoyMjgsInBydiI6IjlmMWZlOWUwZGZmYmU0NDQyZGM3ODMxMDc1MWY1OTFjZjRkMTQwMjAifQ.5YA2QAx2ook1BqonLn-KdOSQ7kLFKrBWnbRH7sxZlmI',
      DeviceType: 'ANDROID',
      // schoolid: '14',
      'Access-Control-Expose-Headers': 'date',
      'Access-Control-Allow-Origin': '*',
    };
    request.init = {
      ...request.init,
      headers: {
        ...request.init?.headers,
        ...headers,
      },
    };

    let httpResponsePromise = chain.proceed(request);
    return httpResponsePromise
      .then(res => <Promise<BaseResponse<any>>>res.response.json())
      .then(res => {
        if (res.code === 200) {
          return new HttpResponse(res);
        } else {
          throw res;
        }
      });
  }
}

import {Chain, HttpResponse, Interceptor} from '../sdk/http/ResponseChain';
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
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3R3eC5iYWlqaWF5dW4uY29tL2FwaS9hcHAvbG9naW4iLCJpYXQiOjE2MDkyMTU1NzYsImV4cCI6MTYwOTUxNzk3NiwibmJmIjoxNjA5MjE1NTc2LCJqdGkiOiJFR3BlMzhjZFhjak5VYVNsIiwic3ViIjoyMjgsInBydiI6IjlmMWZlOWUwZGZmYmU0NDQyZGM3ODMxMDc1MWY1OTFjZjRkMTQwMjAifQ.7wHUlhTr58c-A_11wHxh1UoIy5a5s7EFeAUv9Pr0Q9c',
      DeviceType: 'ANDROID',
      schoolid: '14',
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
      .then((res) => <Promise<BaseResponse<any>>>res.response.json())
      .then((res) => {
        if (res.code === 200) {
          return new HttpResponse(res);
        } else {
          throw res;
        }
      });
  }
}

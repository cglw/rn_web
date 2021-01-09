import {
  Chain,
  HttpResponse,
  Interceptor,
} from '../../../../sdk/http/ResponseChain';
import { TimeManager } from '../../helper/TimeManager';

export class TimeCalibrationInterceptor implements Interceptor {
  intercept(chain: Chain): Promise<HttpResponse<any>> {
    return chain.proceed(chain.request()).then(res => {
      let date = res.response.headers.get('date');
      console.info(date);
      if (date) {
        TimeManager.getInstance().calculateDiff(new Date(date).getTime());
      }
      return res;
    });
  }
}

import { Data } from '../bean/DemoBean';
import { Http } from './../../module_common/http/Http';
export class DemoApi {
  static getNav() {
    return Http.get<Data>('api/app/nav/bottom');
  }
}

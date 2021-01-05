import {Http} from '../../module_common/http/Http';
import {NavBean} from '../bean/NavBean';

export class LoginApi {
  static login() {
    return Http.get('api/login');
  }
  static getNav() {
    return Http.get<Array<NavBean>>('api/app/nav');
  }
}

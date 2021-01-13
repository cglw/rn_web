import { Http } from '../../module_common/http/Http';

export class LoginApi {
  static login() {
    return Http.get('api/login');
  }
}

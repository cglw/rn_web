import { Http } from '../../module_common/http/Http';
import { TabBean } from '../bean/TabBean';
import { TabWrapperBean } from '../bean/TabWrapperBean';

export class LoginApi {
  static login() {
    return Http.get('api/login');
  }
  static getNav() {
    return Http.get<Array<TabBean>>('api/app/nav');
  }
  static getMainTabs() {
    // return Http.load('api/app/nav/bottom').originResponse().get<NavResponse>();

    return Http.get<TabWrapperBean>('api/app/nav/bottom');
  }
  static getMainTabsObj() {
    // return Http.load('api/app/nav/bottom').originResponse().get<NavResponse>();

    return Http.get('api/app/nav/bottom');
  }
}

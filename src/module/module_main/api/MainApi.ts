import { TabWrapperBean } from '../bean/TabWrapperBean';
import { Http } from '../../module_common/http/Http';
export class MainApi {
  static getBottomNav() {
    return Http.get<TabWrapperBean>('api/app/nav/bottom');
  }
}

import { TabWrapperBean } from '../bean/TabWrapperBean';
import { Http } from '../../module_common/http/Http';
export class MainApi {
  static getBottomNav() {
    return Http.get<TabWrapperBean>('api/app/nav/bottom');
  }
  static getCourseList(page: number) {
    return Http.get<Array<Object>>(
      'api/app/courseBasis?limit=10',
      {
        page,
      },
      {
        schoolid: 25,
      },
    );
  }
}

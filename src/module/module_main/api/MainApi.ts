import { Datums } from './../bean/AppIndexBean';
import { TabWrapperBean } from '../bean/TabWrapperBean';
import { Http } from '../../module_common/http/Http';
import { Datum } from '../bean/NavBean';
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
  static getCourseList2(page: number) {
    return Http.load('api/app/courseBasis?limit=10')
      .params({ page })
      .options({
        schoolid: 25,
      })
      .get<Array<Object>>();
  }
  static getNav() {
    return Http.get<Array<Datum>>('api/app/nav');
  }
  static getAppIndex() {
    return Http.get<Array<Datums>>(
      'https://testwx.baijiayun.com/api/app/recommend/appIndex',
    );
  }
}

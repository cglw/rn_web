import { DataBean } from './../bean/DataBean';
import { Http } from './../../module_common/http/Http';
export class CampusApi {
  static getCampusNav() {
    return Http.get<Array<DataBean>>('api/app/getSchool');
  }
}

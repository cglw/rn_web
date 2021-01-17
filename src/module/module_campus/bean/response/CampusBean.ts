import { DataBean } from '../DataBean';
import { BaseResponse } from '../../../module_common/bean/BaseResponse';
export class CampusBean extends BaseResponse<Array<DataBean>> {
  get CampusList() {
    return this.data;
  }
}

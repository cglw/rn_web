import { BaseResponse } from '../../../module_common/bean/BaseResponse';
import { TabBarBean } from '../TabBarBean';
export class TabBarResponse extends BaseResponse<Array<TabBarBean>> {
  getBottomList() {
    return this.data;
  }
}

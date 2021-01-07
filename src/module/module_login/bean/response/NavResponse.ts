import {NavBean} from '../NavBean';
import {BaseResponse} from '../../../module_common/bean/BaseResponse';

export class NavResponse extends BaseResponse<Array<NavBean>> {
  getNavList() {
    return this.data;
  }
}

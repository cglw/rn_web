import {NavBean} from '../NavBean';

export class NavResponse extends BaseResponse<Array<NavBean>> {
  getNavList() {
    return this.data;
  }
}

import {AccountStore} from './AccountStore';

export class RootStore {
  accountStore: AccountStore;
  constructor() {
    this.accountStore = new AccountStore(this);
  }
}

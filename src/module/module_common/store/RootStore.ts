import { AccountStore } from './AccountStore';
import { ConfigStore } from './ConfigStore';

export class RootStore {
  accountStore: AccountStore;
  configStore: ConfigStore;
  constructor() {
    this.accountStore = new AccountStore(this);
    this.configStore = new ConfigStore();
  }
}

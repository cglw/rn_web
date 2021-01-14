import { AccountStore } from './AccountStore';
import { ConfigStore } from './ConfigStore';

export class RootStore {
  accountStore: AccountStore;
  configStore: ConfigStore;
  taskArr: Array<IStoreTask> = [];
  callBack?: () => {};
  isStart: boolean = false;

  constructor() {
    this.taskArr = [];
    this.accountStore = new AccountStore(this);
    this.configStore = new ConfigStore(this);
  }

  start() {
    if (this.isStart) {
      return;
    }
    this.isStart = true;
    for (let i = 0; i < this.taskArr.length; i++) {
      this.taskArr[i].run();
    }
  }

  syncCallBack(callBack: any): void {
    console.info('run end');
    this.callBack = callBack;
    this.checkSyncComplete();
  }
  syncSuccess(task: IStoreTask) {
    this.taskArr.splice(this.taskArr.indexOf(task), 1);
    this.checkSyncComplete();
  }
  checkSyncComplete() {
    if (this.taskArr.length === 0) {
      this.callBack && this.callBack();
    }
  }
  addTask(task: IStoreTask) {
    this.taskArr.push(task);
  }
  isLogin() {
    return this.accountStore.isLogin;
  }
}

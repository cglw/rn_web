import { RootStore } from './RootStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { StorageHelper } from '@/sdk/storage/StorageHelper';
import { AccountConstants } from '../constants/Constants';

export class AccountStore implements IStoreTask {
  isLogin = false;
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      isLogin: observable,
      total: computed,
      setLoginStatus: action,
    });
    this.rootStore.addTask(this);
  }
  setLoginStatus(loginStatus: boolean) {
    this.isLogin = loginStatus;
  }

  get total() {
    return 100;
  }

  run(): void {
    console.info('run===>');
    StorageHelper.get(AccountConstants.LOGIN)
      .then(res => {
        this.isLogin = res === true;
        this.rootStore.syncSuccess(this);
      })
      .catch(err => {
        console.info(err);
        this.rootStore.syncSuccess(this);
      });
  }
  loginSuccess() {
    StorageHelper.save(AccountConstants.LOGIN, true);
    this.setLoginStatus(true);
  }
  loginOut() {
    StorageHelper.save(AccountConstants.LOGIN, false);
    this.setLoginStatus(false);
  }
}

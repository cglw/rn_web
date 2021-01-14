import { RootStore } from './RootStore';
import { computed, makeObservable, observable } from 'mobx';

export class AccountStore implements IStoreTask {
  isLogin = false;
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      isLogin: observable,
      total: computed,
      // increment: action,
    });
    this.rootStore.addTask(this);
  }

  get total() {
    return 100;
  }

  run(): void {
    console.info('run===>');
    this.rootStore.syncSuccess(this);
  }
}

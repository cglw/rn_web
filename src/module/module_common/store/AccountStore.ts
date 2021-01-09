import { RootStore } from './RootStore';
import { action, computed, makeObservable, observable } from 'mobx';

export class AccountStore {
  time = 100;
  data = 99;
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      time: observable,
      total: computed,
      increment: action,
    });
  }

  get total() {
    return this.time * 100;
  }
  increment() {
    this.time++;
  }
}

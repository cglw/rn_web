import { RootStore } from './RootStore';

export class ConfigStore {
  isShowBottom: boolean;
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.isShowBottom = false;
    this.rootStore = rootStore;
  }
}

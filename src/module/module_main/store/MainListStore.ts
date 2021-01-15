// // @flow
// 'use strict';
import { action, computed, makeObservable, observable } from 'mobx';

export class MainListStore {
  count = 0;
  countB = 1;
  constructor() {
    makeObservable(this, {
      count: observable,
      total: computed,
      increment: action,
    });
  }
  increment() {
    this.count++;
  }
  get total() {
    return this.count * this.countB;
  }
}

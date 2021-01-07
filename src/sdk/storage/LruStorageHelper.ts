import {StorageHelper} from './StorageHelper';
import {checkEmpty} from '../../utils/CheckUtil';

export class LruStorageHelper {
  static async save(key: string, val: any, maxLength = 5) {
    await this.saveWithPromise(key, val, maxLength);
  }
  static saveWithPromise(key: string, val: any, maxLength = 5) {
    return this.get(key).then((res) => {
      console.info('query');
      console.info(res);

      if (checkEmpty(res) || !(res instanceof Array)) {
        console.info('setArray');
        res = [];
      }
      let index = res.indexOf(val);
      if (index > -1) {
        res.splice(index, 1);
        res.unshift(val);
      } else {
        if (res.length === maxLength) {
          res.splice(maxLength - 1, 1);
        }
        res.unshift(val);
      }
      console.info('res===>');
      console.info(res);
      return StorageHelper.save(key, res);
    });
  }

  static get(key: string): Promise<any> {
    return <Promise<any>>StorageHelper.get(key);
  }
  static clear(key) {
    StorageHelper.update(key, []);
  }
  static delete(key, val) {
    this.deleteWithPromise(key, val)
      .then((res) => {})
      .catch((err) => {});
  }
  static deleteWithPromise(key, val) {
    return this.get(key).then((res) => {
      if (checkEmpty(res) || !(res instanceof Array)) {
        res = [];
      }
      let index = res.indexOf(val);
      if (index > -1) {
        res.splice(index, 1);
        return StorageHelper.save(key, res);
      } else {
        return res;
      }
    });
  }
}

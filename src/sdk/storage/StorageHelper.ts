import AsyncStorage from '@react-native-community/async-storage';

export class StorageHelper {
  /**
   * 根据key获取json数值
   * @param key
   * @returns {Promise<TResult>}
   */
  static get(key: string) {
    return AsyncStorage.getItem(key)
      .then(value => {
        if (value && value !== '') {
          try {
            return JSON.parse(value);
          } catch (e) {
            return value;
          }
        }
        return null;
      })
      .catch(() => null);
  }

  /**
   * 保存key对应的json数值
   * @param key
   * @param value
   * @returns {Promise<string>}
   */
  static save(key: string, value: any) {
    this.saveWithPromise(key, value)
      .then(res => {})
      .catch(err => {});
  }
  static saveWithPromise(key: string, value: any) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 更新key对应的json数值
   * @param key
   * @param value
   * @returns {Promise<TResult>|Promise.<TResult>|Promise<T>}
   */
  static updateWithPromise(key: string, value: any) {
    return AsyncStorage.getItem(key).then(item => {
      value =
        typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }
  static update(key: string, value: any) {
    this.updateWithPromise(key, value)
      .then(res => {})
      .catch(err => {});
  }

  /**
   * 删除key对应json数值
   * @param key
   * @returns {Promise<string>}
   */
  static deleteItem(key: string) {
    this.deleteItemWithPromise(key)
      .then(res => {})
      .catch(err => {});
  }

  static deleteItemWithPromise(key: string) {
    return AsyncStorage.removeItem(key);
  }
  // 删除选择的json
  static deleteOptional(array: []) {
    array?.map((item, index) => AsyncStorage.removeItem(item));
  }

  /**
   * 删除所有配置数据
   * @returns {Promise<string>}
   */
  static clear() {
    AsyncStorage.clear()
      .then(res => {})
      .catch(err => {});
  }
  static clearWithPromise() {
    return AsyncStorage.clear();
  }
}

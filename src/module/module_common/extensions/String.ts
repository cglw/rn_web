import {itnFormat} from '../i18n/i18n';
String.prototype.itn = function (params): string {
  return itnFormat(this, params);
};
export {};

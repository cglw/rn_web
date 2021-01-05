import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode; // 用户系统偏好语言

if (systemLanguage) {
  I18n.locale = systemLanguage;
} else {
  I18n.locale = 'en'; // 默认语言为英文
}

I18n.fallbacks = true;
I18n.translations = {};

window.addTranslations = (translations = {}) => {
  let res = {};
  for (let key1 in I18n.translations) {
    for (let key2 in translations) {
      if (key1 === key2) {
        res[key1] = {
          ...I18n.translations[key1],
          ...translations[key1],
        };
      }
    }
  }
  I18n.translations = res;
};

export function itnFormat(str: String, params: Object = {}): string {
  return I18n.t(str, params);
}

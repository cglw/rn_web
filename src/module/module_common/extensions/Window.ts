import {
  GLOBAL_COLORS,
  GLOBAL_DIMES,
  GLOBAL_STYLES,
} from '../../../style/GlobleStyle';
import I18n from 'i18n-js';
import {RouterManager} from '../../../sdk/router/RouterManager';
globalStyles = GLOBAL_STYLES;
globalDimes = GLOBAL_DIMES;
globalColors = GLOBAL_COLORS;
globalI18n = I18n;
globalImages = {};
window.addTranslations = (translations = {}) => {
  let res = {};
  if (JSON.stringify(I18n.translations) == '{}') {
    res = translations;
  } else {
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
  }

  I18n.translations = res;
  console.info(' I18n.translations');
  console.info(I18n.translations);
};
window.routeTo = (name: string, params?: object | undefined) => {
  RouterManager.getInstance().push(name, params);
};

export {};

import Images from './Images';
import en from './strings/en';
import sh from './strings/sh';
import zh from './strings/zh';

addTranslations({
  en,
  sh,
  zh,
});
globalImages = {
  ...globalImages,
  ...Images,
};
export {};

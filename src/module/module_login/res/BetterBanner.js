import Images from './Images';
import en from './strings/en';
import zh from './strings/zh';

addTranslations({
  en,
  zh,
});
globalImages = {
  ...globalImages,
  ...Images,
};
export {};

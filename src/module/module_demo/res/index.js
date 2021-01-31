import Images from './Images';
import zh from './strings/zh';

addTranslations({
  zh,
});
globalImages = {
  ...globalImages,
  ...Images,
};
export {};

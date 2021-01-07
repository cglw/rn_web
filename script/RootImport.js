let fileUtil = require('./FileUtil');
let template = fileUtil.template;
let getFileName = fileUtil.getFileName;
const fs = require('fs');
const fPath = require('path'); //解析需要遍历的文件夹

const languageImportFmt = template`'./module/${0}/index';\n`;
const languageResFmt = template`import Images from './Images';${'languageImport'}
addTranslations({
${'languageList'}});
globalImages = {
  ...globalImages,
  ...Images,
};
export {};
`;
exports.handleLanguageCode = function (filePath, files) {
  let languageImport = '\n';
  let languageList = '';
  for (let i = 0; i < files.length; i++) {
    let languageName = getFileName(files[i]);
    languageImport += languageImportFmt(languageName);
    languageList += `  ${languageName},\n`;
  }
  fs.writeFile(
    fPath.join(filePath, 'res/index.ts'),
    languageResFmt({languageImport, languageList}),
    (err) => {},
  );
};

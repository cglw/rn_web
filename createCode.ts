const fs = require('fs');
const fPath = require('path'); //解析需要遍历的文件夹
//扩充format的
function template(strings, ...keys) {
  return function (...values) {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach(function (key, i) {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
}

function scanDir(filePath, callback) {
  fs.readdir(filePath, function (err, files) {
    if (!err) {
      callback(files);
    }
  });
}
function getFileName(file) {
  return file.substring(0, file.indexOf('.'));
}
function getDirNameByPath(file) {
  return file.substring(file.lastIndexOf('/') + 1, file.length);
}
function scanDirHandle(filePath, files, index, input = []) {
  if (index === files.length) {
    return;
  }
  let dirName = files[index];
  let resRoot = fPath.join(filePath, dirName);
  let fileInputArray = [];
  for (let i = 0; i < input.length; i++) {
    fileInputArray.push(fPath.join(resRoot, input[i].dir));
  }
  scanDirWithCallBack(fileInputArray, 0, (res) => {
    scanDirHandle(filePath, files, ++index, input);
    for (let i = 0; i < input.length; i++) {
      input[i].handle(resRoot, res[i]);
    }
  });
}
function scanDirWithCallBack(filePath = [], index = 0, callback, res = []) {
  if (index === filePath.length) {
    callback && callback(res);
    return;
  }
  fs.readdir(filePath[index], function (err, files) {
    if (!err) {
      res.push(files);
    }
    scanDirWithCallBack(filePath, ++index, callback, res);
  });
}
function handleImageCode(filePath, files) {
  let content = '';
  for (let i = 0; i < files.length; i++) {
    let image = files[i];
    content += imageListFmt(
      getDirNameByPath(filePath) + '_' + getFileName(image),
      image,
    );
  }
  fs.writeFile(
    fPath.join(filePath, 'res/Images.ts'),
    imageResFmt(content),
    (err) => {},
  );
}
function handleLanguageCode(filePath, files) {
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
}
const imageListFmt = template`  ${0}: require('./images/${1}'),\n`;
const imageResFmt = template`export default {\n${0}}`;
const languageImportFmt = template`import ${0} from './strings/${0}';\n`;
const languageResFmt = template`import Images from './Images';${'languageImport'}
addTranslations({
${'languageList'}});
globalImages = {
  ...globalImages,
  ...Images,
};
export {};
`;
const filePath = fPath.resolve('./src/module');
scanDir(filePath, (files) => {
  scanDirHandle(filePath, files, 0, [
    {
      dir: 'res/images',
      handle: handleImageCode,
    },
    {
      dir: 'res/strings',
      handle: handleLanguageCode,
    },
  ]);
});
console.info('complete');

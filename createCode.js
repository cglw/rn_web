let fileUtil = require('./script/FileUtil');
let imageImport = require('./script/ImageImport');
let languageImport = require('./script/LanguageImport');
const scanDir = fileUtil.scanDir;
const scanDirHandle = fileUtil.scanDirHandle;
const getWaitScanDirs = fileUtil.getWaitScanDirs;
const getDirNameByPath = fileUtil.getDirNameByPath;
const fPath = require('path'); //解析需要遍历的文件夹
const fs = require('fs'); //解析需要遍历的文件夹
const filePath = fPath.resolve('./src/module');
const input = [
  {
    dir: 'res/images',
    handle: imageImport.handleImageCode,
  },
  {
    dir: 'res/strings',
    handle: languageImport.handleLanguageCode,
  },
];
// scanDirHandle(filePath, scanDir(filePath), input);

let waitScanDirs = getWaitScanDirs(filePath, scanDir(filePath), input);
// console.info(waitScanDirs);

let watchDirs = [];
waitScanDirs.forEach((item, index) => {
  // console.info(item);
  watchDirs.push(...item.dir);
  // input[i].handle(getDirNameByPath(item),item);
});
// console.info(watchDirs);
console.info('start file change Listener');
for (let i = 0; i < watchDirs.length; i++) {
  fs.watchFile(watchDirs[i], (cur, prv) => {
    console.log(`file change`);
    scanDirHandle(filePath, scanDir(filePath), input);
  });
}

//
// console.info(waitScanDirs);

let fileUtil = require('./script/FileUtil');
let imageImport = require('./script/ImageImport');
let languageImport = require('./script/LanguageImport');
const scanDir = fileUtil.scanDir;
const scanDirHandle = fileUtil.scanDirHandle;
const getWaitScanDirs = fileUtil.getWaitScanDirs;
const getParentDirNameByPath = fileUtil.getParentDirNameByPath;
const fPath = require('path'); //解析需要遍历的文件夹
const fs = require('fs'); //解析需要遍历的文件夹
const filePath = fPath.resolve('./src/module');
const INPUT_JS = [
  {
    dir: 'res/images',
    handle: imageImport.handleImageCode,
  },
  {
    dir: 'res/strings',
    handle: languageImport.handleLanguageCode,
  },
];
scanDirHandle(filePath, scanDir(filePath), INPUT_JS);
let waitScanDirs = getWaitScanDirs(filePath, scanDir(filePath), INPUT_JS);
let watchDirs = [];
waitScanDirs.forEach((item, index) => {
  watchDirs.push(...item.dir);
});
console.info('start file change Listener');
for (let i = 0; i < watchDirs.length; i++) {
  let watchDir = fs.existsSync(watchDirs[i])
    ? watchDirs[i]
    : getParentDirNameByPath(watchDirs[i]);
  fs.watchFile(watchDir, (cur, prv) => {
    console.log('file change');
    scanDirHandle(filePath, scanDir(filePath), INPUT_JS);
  });
}

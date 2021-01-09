const fs = require('fs');
const path = require('path'); //解析需要遍历的文件夹

//扩充format的
exports.template = function (strings, ...keys) {
  return function (...values) {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach(function (key, i) {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
};

exports.getFileName = function (file) {
  return file.substring(0, file.indexOf('.'));
};
const scanDirFunc = function (filePath) {
  return fs.readdirSync(filePath);
};
exports.scanDir = scanDirFunc;
exports.getDirNameByPath = function (file) {
  return file.substring(file.lastIndexOf('/') + 1, file.length);
};
exports.getParentDirNameByPath = function (file) {
  return file.substring(0, file.lastIndexOf('/'));
};

exports.scanDirHandle = function (rootPath, dirs, input = []) {
  //扫描文件夹
  dirs.forEach(file => {
    let resRoot = path.join(rootPath, file);
    for (let i = 0; i < input.length; i++) {
      //拼接等待扫描的文件夹
      let handleFileDir = path.join(resRoot, input[i].dir);

      if (fs.existsSync(handleFileDir)) {
        input[i].handle(resRoot, scanDirFunc(handleFileDir));
      } else {
      }
      // fs.watch()
    }
  });
};
exports.getWaitScanDirs = function (rootPath, dirs, input = []) {
  let waitScanDir = [];
  //扫描文件夹
  dirs.forEach(file => {
    let resRoot = path.join(rootPath, file);
    let tmpArray = [];

    let item = {
      root: resRoot,
      dir: tmpArray,
    };

    for (let i = 0; i < input.length; i++) {
      tmpArray.push(path.join(resRoot, input[i].dir));
      //扫描结果处理
    }
    waitScanDir.push(item);
  });
  return waitScanDir;
};

const deleteFolderRecursive = function (url) {
  let files = [];
  //判断给定的路径是否存在
  if (fs.existsSync(url)) {
    //返回文件和子目录的数组
    files = fs.readdirSync(url);

    files.forEach(function (file, index) {
      // var curPath = url + "/" + file;
      let curPath = path.join(url, file);
      //fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);

        // 是文件delete file
      } else {
        fs.unlinkSync(curPath);
      }
    });
    //清除文件夹
    fs.rmdirSync(url);
  } else {
    console.log('给定的路径不存在，请给出正确的路径');
  }
};

exports.deleteFolderRecursive = deleteFolderRecursive;

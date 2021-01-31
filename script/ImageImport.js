let fileUtil = require('./FileUtil');
let template = fileUtil.template;
let getDirNameByPath = fileUtil.getDirNameByPath;
let getFileName = fileUtil.getFileName;
const fs = require('fs');
const fPath = require('path'); //解析需要遍历的文件夹

const imageListFmt = template`  ${0}: require('./images/${1}'),\n`;
const imageResFmt = template`export default {\n${0}};\n`;
exports.handleImageCode = function (filePath, files) {
  let content = '';
  for (let i = 0; i < files.length; i++) {
    let image = files[i];
    let fileName = getFileName(image);
    fileName = fileName
      .replace('@1x', '')
      .replace('@2x', '')
      .replace('@3x', '');
    if (!fileName.endsWith('.ts')) {
      content += imageListFmt(
        getDirNameByPath(filePath) + '_' + fileName,
        image,
      );
    }
  }
  fs.writeFile(
    fPath.join(filePath, 'res/Images.ts'),
    imageResFmt(content),
    err => {},
  );
};

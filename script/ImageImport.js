let fileUtil = require('./FileUtil');
let template = fileUtil.template;
let getDirNameByPath = fileUtil.getDirNameByPath;
let getFileName = fileUtil.getFileName;
const fs = require('fs');
const fPath = require('path'); //解析需要遍历的文件夹

const imageListFmt = template`  ${0}: require('./images/${1}'),\n`;
const imageResFmt = template`export default {\n${0}}`;
exports.handleImageCode = function (filePath, files) {
  let content = '';
  for (let i = 0; i < files.length; i++) {
    let image = files[i];
    let fileName = getFileName(image);
    if (!fileName.endsWith('.ts')) {
      content += imageListFmt(
        getDirNameByPath(filePath) + '_' + getFileName(image),
        image,
      );
    }
  }
  fs.writeFile(
    fPath.join(filePath, 'res/Images.ts'),
    imageResFmt(content),
    (err) => {},
  );
};

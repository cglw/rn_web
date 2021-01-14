const fs = require('fs'); //解析需要遍历的文件夹
const path = require('path'); //解析需要遍历的文件夹
let fileUtil = require('./script/FileUtil');
const INIT_FIRST_MODULE = 'module_common';
const ORIGIN_MODULE = './src/module';
const ROOT_INDEX_FILE = './src/index.js';
const ROOT_ROUTER_FILE = './src/router/RouterConfig.ts';
const MODULE_INDEX_STR = "import './res/index';\nexport {};\n";
const MODULE_ROOT_REGISTER_FMT = fileUtil.template`import './module/${0}/index';\n`;
const EXPORT_DEFAULT_STR = 'export default {};\n';
const ROUTER_TEMPLATE_FMT = fileUtil.template`import ${0} from '../module/${1}/router/Router';\n`;
const DIR_DEFAULT_FILE = fileUtil.template`export class ${0} {}\n`;
const AUTO_CREATE_CLASS_END_INDEX = 4;
const MODULE_CHILD = [
  'api',
  'bean',
  'component',
  'constants',
  'screen',
  'res',
  'res/images',
  'res/strings',
  'res/strings/zh.ts',
  'res/index.js',
  'router',
  'router/Router.ts',
  'index.js',
];
// const CREATE_TS_ARRAY = ['api', 'bean', 'constants'];
const CREATE_TSX_ARRAY = ['component', 'screen'];

function upStrFirst(str) {
  str = str.toLowerCase();
  const strArr = str.split(' ');
  let result = '';
  for (const i in strArr) {
    result +=
      strArr[i].substring(0, 1).toUpperCase() + strArr[i].substring(1) + '';
  }
  return result;
}
function getModuleRealName(moduleName) {
  return upStrFirst(moduleName.replace('module_', ''));
}

const arguments = process.argv.splice(2);
if (arguments.length < 1) {
  console.info('please input module_name: node createTemplate.js module_xxx');
  console.info(
    'if you want delete module,Please add -d at end: node createTemplate.js module_xxx -d',
  );
  return;
}
let moduleName = arguments[0].toLowerCase();
let isNeedDelete = arguments.length > 1 && arguments[1] === '-d';

if (!moduleName.startsWith('module_')) {
  console.info("module name must be start with 'module_'");
  return;
}
let moduleDir = fileUtil.scanDir(ORIGIN_MODULE);

let isModuleExist = moduleDir.indexOf(moduleName) > -1;
if (isNeedDelete) {
  if (!isModuleExist) {
    console.info(moduleName + ' not exist');
    return;
  }
} else {
  if (isModuleExist) {
    console.info(moduleName + ' has exist');
    return;
  }
}

function mkModuleDir(moduleName) {
  //创建文件夹
  fs.mkdirSync(path.join(ORIGIN_MODULE, moduleName));
  MODULE_CHILD.forEach((dir, index) => {
    let targetDir = path.join(ORIGIN_MODULE, moduleName, dir);
    if (dir.indexOf('.') === -1) {
      fs.mkdirSync(targetDir);
    } else if (dir === 'index.js') {
      fs.writeFileSync(targetDir, MODULE_INDEX_STR);
    } else {
      fs.writeFileSync(targetDir, EXPORT_DEFAULT_STR);
    }
    if (index <= AUTO_CREATE_CLASS_END_INDEX) {
      let createFileName = `${getModuleRealName(moduleName)}${upStrFirst(dir)}`;
      const endSuffix = CREATE_TSX_ARRAY.indexOf(dir) > -1 ? '.tsx' : '.ts';
      fs.writeFileSync(
        path.join(targetDir, createFileName) + endSuffix,
        DIR_DEFAULT_FILE(createFileName),
      );
    }
  });
}
function syncRouter(moduleDir = []) {
  fs.writeFileSync(ROOT_ROUTER_FILE, '');
  let routerResult = 'export default {\n};\n';
  moduleDir.forEach(moduleName => {
    if (
      fs.existsSync(path.join(ORIGIN_MODULE, moduleName, 'Router', 'Router.ts'))
    ) {
      // //修改Router文件
      routerResult = routerResult.replace(
        'export default {',
        `export default {\n  ...${getModuleRealName(moduleName)},`,
      );
      routerResult =
        ROUTER_TEMPLATE_FMT(getModuleRealName(moduleName), moduleName) +
        routerResult;
    }
  });
  fs.writeFileSync(ROOT_ROUTER_FILE, routerResult);
}
function syncRootIndex(moduleDir = []) {
  fs.writeFileSync(ROOT_INDEX_FILE, '');
  moduleDir.forEach(name => {
    //导入根的index
    fs.appendFileSync(ROOT_INDEX_FILE, MODULE_ROOT_REGISTER_FMT(name));
  });
}

let newModuleDir = [...moduleDir];
let index = newModuleDir.indexOf(INIT_FIRST_MODULE);
if (index > -1 && index !== 0) {
  newModuleDir[index] = newModuleDir[0];
  newModuleDir[0] = INIT_FIRST_MODULE;
}
if (isNeedDelete) {
  newModuleDir.splice(newModuleDir.indexOf(moduleName), 1);
  let deleteDir = path.join(ORIGIN_MODULE, moduleName);
  //删除文件夹
  fileUtil.deleteFolderRecursive(deleteDir);
  console.info('delete complete');
} else {
  mkModuleDir(moduleName);
  newModuleDir = [...newModuleDir, moduleName];
}

syncRouter(newModuleDir);
syncRootIndex(newModuleDir);

console.info('sync complete');

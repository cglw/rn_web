const fs = require('fs'); //解析需要遍历的文件夹
const path = require('path'); //解析需要遍历的文件夹
let fileUtil = require('./script/FileUtil');
const ORIGIN_MODULE = './src/module';
const ROOT_INDEX_FILE = './src/index.ts';
const ROOT_ROUTER_FILE = './src/router/RouterConfig.ts';
const MODULE_INDEX_STR = `import './res/index';\nexport {};`;
const MODULE_ROOT_REGISTER_FMT = fileUtil.template`import './module/${0}/index';\n`;
const EXPORT_DEFAULT_STR = `export default {};`;
const ROUTER_TEMPLATE_FMT = fileUtil.template`import ${0} from '../module/${1}/router/Router';\n`;
// const EXPORT_DEFAULT_STR_FMT = fileUtil.template`export default {\n};`;

const DIR_DEFAULT_FILE = fileUtil.template`export class ${0} {}`;
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
  'res/index.ts',
  'router',
  'router/Router.ts',
  'index.ts',
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
  console.info('please input module_name');
  return;
}
let moduleName = arguments[0].toLowerCase();
if (!moduleName.startsWith('module_')) {
  console.info("module name must be start with 'module_'");
  return;
}
let moduleDir = fileUtil.scanDir(ORIGIN_MODULE);
if (moduleDir.indexOf(moduleName) > -1) {
  console.info('module has exist');
  return;
}

//创建文件夹
fs.mkdirSync(path.join(ORIGIN_MODULE, moduleName));
MODULE_CHILD.forEach((dir, index) => {
  let targetDir = path.join(ORIGIN_MODULE, moduleName, dir);
  if (dir.indexOf('.') === -1) {
    fs.mkdirSync(targetDir);
  } else if (dir === 'index.ts') {
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

let newModuleDir = [...moduleDir, moduleName];

fs.writeFileSync(ROOT_ROUTER_FILE, '');
let routerResult = `export default {\n};`;
newModuleDir.forEach((moduleName) => {
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

fs.writeFileSync(ROOT_INDEX_FILE, '');
newModuleDir.forEach((moduleName) => {
  //导入根的index
  fs.appendFileSync(ROOT_INDEX_FILE, MODULE_ROOT_REGISTER_FMT(moduleName));
});

console.info('complete');

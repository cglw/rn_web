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

const MODULE_CHILD = [
  'api',
  'bean',
  'component',
  'constants',
  'res',
  'res/images',
  'res/strings',
  'res/strings/zh.ts',
  'res/index.ts',
  'router',
  'router/Router.ts',
  'screen',
  'index.ts',
];

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
function getModuleName(moduleName) {
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
MODULE_CHILD.forEach((dir) => {
  if (dir.indexOf('.') === -1) {
    fs.mkdirSync(path.join(ORIGIN_MODULE, moduleName, dir));
  } else if (dir === 'index.ts') {
    fs.writeFileSync(
      path.join(ORIGIN_MODULE, moduleName, dir),
      MODULE_INDEX_STR,
    );
  } else {
    fs.writeFileSync(
      path.join(ORIGIN_MODULE, moduleName, dir),
      EXPORT_DEFAULT_STR,
    );
  }
});
//导入根的index
fs.appendFileSync(ROOT_INDEX_FILE, MODULE_ROOT_REGISTER_FMT(moduleName));

//修改Router文件
let text = fs.readFileSync(ROOT_ROUTER_FILE, 'utf-8');
let routerResult = text.replace(
  'export default {',
  `export default {\n  ...${getModuleName(moduleName)},`,
);
routerResult =
  ROUTER_TEMPLATE_FMT(getModuleName(moduleName), moduleName) + routerResult;
fs.writeFileSync(ROOT_ROUTER_FILE, routerResult);

console.info('complete');

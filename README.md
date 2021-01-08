# 百家云网校 手机端RN(安卓+iOS+H5)


### 相关地址
- RN中文官网：https://reactnative.cn/
- RN英文官网：https://reactnative.dev/
- RN的web端实现：https://github.com/necolas/react-native-web
- UI组件库Ant Design Mobile RN: https://rn.mobile.ant.design/docs/react/introduce-cn
- React中文官网：https://zh-hans.reactjs.org/
- npm第三方库：https://www.npmjs.com/

代码格式化插件
prettier


### 命名规范
1.基本规范
- 全局的模型类/ui类/function Ui组件 统一大小开头 驼峰
- 除了例如index js项目通用的 这样的可以小写
- 函数名、方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格   组件function 需要大写开头需要注意
- 图片资源  控件描述_控件状态限定词  导出名称：模块名_业务功能描述_控件描述_控件状态限定词 module_login_btn_pressed
- 所有页面维度的组件命名xxxScreen 业务逻辑组件xxxView 公共组件不限制
- string 资源 模块名_逻辑名称 module_login_tips
- 常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚，不要嫌名字长



### UI库地址
https://rn.mobile.ant.design/docs/react/introduce-cn


assets 全局静态资源可以存储一些json 音频文件等
module 业务模块
    module_common 业务公共逻辑层
router 全局路由管理
sdk 无关业务的一些库(切记不要加业务代码)
style 全局样式
typings 全局扩展以及全局变量定义
utils 无关业务的工具类(切记不要加业务代码)
application app的启动路由注册
service 各模块互相访问接口，模块间不允许直接通信，只能通过接口
index app入口


module 下的文件夹说明
    公有的一些
    bean      数据模型
    component 组件 如果过多可以再新建文件夹进去区分
    constants 模块静态变量或者枚举文件夹 单个文件的话可以直接创建constants 文件
    helper 统一的业务处理，尽可能不在ui页面直接操作业务，比如根据组合状态值以及逻辑计算返回一个文本。公用逻辑存放处，避免重复代码
    res 资源文件夹 图片资源跟 字符串资源


    特殊的一些
    store 全部的store，可以拿到全局的变量
    extensions 扩展的一些实现以及全局变量的一些初始化
    native 存放移动端的方法接口
    service 服务接口的实现，挂载在globalService,需要在当前的index.ts注册，




遇到3端不统一的组件或者业务，需要在当前目录新建platform文件夹
例如新建xxx.ts  xxx.web.ts  至少是2个 一个是默认实现 一个是对应平台实现
android/ios/web
导包的时候请勿导带有平台后缀，去掉后缀即可



### Http 请求 2种请求形式可选
1. 链式调用的
//originResponse 开启代表拿到完整的结果 所以这时候T 要写完整的模型，
Http.load('api/app/nav')
      .originResponse()
      .get<T>()
      .then((res) => {
        console.info(res);
      })
      .catch((err) => {});
2. 普通传参调用 不支持直接设置originResponse  可以在options参数设置{originResponse:true}开启拿到完整请求
这里的T 为的data模型
Http.get<T>(xx,xx,xx).then.catch


### typings/global.d.ts
全局的资源访问
  let globalStyles: any;
  let globalColors: any;
  let globalDimes: any;
  let globalI18n: any;
  let globalImages: any;





### 新增模块
1.注册路由到最外层router
2.检查最外层index包含新建模块index

### 脚本使用
1. 注意事项
createCode //开启后请勿关闭，会监听图片跟字符串ts文件变化 自动导入相关代码，
createTemplate //脚本每次会重置src/index.js  src/router/index.js 所以这两个文件不要写别的
               后面跟一个参数模块名称
2. 使用例子
node createCode.js
node createTemplate.js module_test


### 如何运行项目
1. npm install
2. 运行
web端：npm run web
移动端：npm run android/ios

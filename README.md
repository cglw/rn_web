# 百家云网校 手机端RN(安卓+iOS+H5)


### 相关地址
- RN中文官网：https://reactnative.cn/
- RN英文官网：https://reactnative.dev/
- RN路由框架 https://reactnavigation.org/docs/getting-started
- RN的web端实现：https://github.com/necolas/react-native-web
  文档 https://necolas.github.io/react-native-web/docs/?path=/docs/overview-getting-started--page
- UI组件库Ant Design Mobile RN: https://rn.mobile.ant.design/docs/react/introduce-cn
- React中文官网：https://zh-hans.reactjs.org/
- npm第三方库：https://www.npmjs.com/
- ts中文文档 https://www.tslang.cn/docs/home.html
- mobx（状态管理框架）官网 https://mobx.js.org/observable-state.html

### UI库地址
https://rn.mobile.ant.design/docs/react/introduce-cn



### 目录
- assets 全局静态资源可以存储一些json 音频文件等
- module 业务模块
    module_common 业务公共逻辑层
- router 全局路由配置
- sdk 无关业务的一些库(切记不要加业务代码)
- style 全局样式
- typings 全局扩展以及全局变量，方法定义
- utils 无关业务的工具类(切记不要加业务代码)
- application app的启动,路由注册
- service 各模块互相访问接口，模块间不允许直接通信，只能通过接口
- index app入口


#### module 下的文件夹说明
1. 公有的一些
- bean      数据模型
- component 组件 如果过多可以再新建文件夹进去区分
- constants 模块静态变量或者枚举文件夹 单个文件的话可以直接创建constants 文件
- helper 统一的业务处理，尽可能不在ui页面直接操作业务，比如根据组合状态值以及逻辑计算返回一个文本。公用逻辑存放处，避免重复代码
- res资源文件夹  images图片资源跟  strings字符串资源 文字引用都需要用key访问


2. 特殊的一些
- store 全部的store，可以拿到全局的变量
- extensions 扩展的一些实现以及全局变量的一些初始化
- native 存放移动端的方法接口
- service 服务接口的实现，挂载在globalService,需要在当前的index.ts注册，

### 多端适配
- 文件后缀 .(android/ios/web).ts

```
遇到3端不统一的组件或者业务，需要在当前目录新建platform文件夹
例如新建xxx.ts  xxx.web.ts  至少是2个 一个是默认实现 一个是对应平台实现
注意:导包的时候请勿导带有平台后缀，去掉后缀即可
```

- 工具类判断执行不同业务逻辑

```
Platform.OS === 'web'
或者使用DeviceUtils工具类
isIOS() isWeb() isIOS()
```

- 样式适配

```
const containerStyles = {
  flex: 1,
  ...Platform.select({
    android: {
      backgroundColor: 'blue'
    },
    ios: {
      backgroundColor: 'red'
    },
    web: {
      backgroundColor: 'green'
    }
  })
});
```



### Http api请求
1. 初始化

添加拦截器，每一个对网络请求的结果处理都是通过拦截器 处理是一个U型执行，可以自定义拦截器，处理业务

```
HttpClient.getInstance().addInterceptors(new TimeCalibrationInterceptor());
HttpClient.getInstance().addInterceptors(new CommonInterceptors());
HttpClient.getInstance().addInterceptors(new DataHandleInterceptors());
```
2. 使用介绍

接口请求需要在对应模块文件夹下面的api的xxxApi 类进行编写api,请勿在模块中直接使用

- 新建返回模型 例如:TabWrapperBean

    - WebStrorm 可以安装JsonToTypeScript插件 根据Json一键生成模型
复制json Alt+T
    - VsCode 安装Json To Ts插件

- 新建api方法 例如

```
static testApi() {
     return Http.get<TabWrapperBean>('api/app/nav/bottom');
}
```

- 使用

1. 链式调用的

originResponse 开启代表拿到完整的结果 所以这时候T 要写完整的模型，

```
Http.load('api/app/nav')
      .originResponse()
      .get<T>()
      .then((res) => {
        console.info(res);
      })
      .catch((err) => {});
```

2. 普通传参调用

不支持直接设置originResponse  可以在options参数设置{originResponse:true}开启拿到完整请求
这里的T 为的data模型

```
Http.get<T>(xx,xx,xx).then(res=>{}).catch()
//res 就是范型T的类型
res就是服务器返回的data字段

Http.get<T>(xx,xx,{originResponse:true}).then(res=>{}).catch()
//res 就是范型T的类型
拿到data需要res.data

```


### typings/global.d.ts
全局的资源访问

```
let globalStyles: any;
let globalColors: any;
let globalDimes: any;
let globalI18n: any;
let globalImages: any;
let globalRouter:any;
```

例子：

```
 title_container: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
    ...globalStyles.center,
  },

   title_style: {
    color: globalColors.titleColor,
    fontSize: 18,
  },


```


### 脚本使用
1. 介绍
- createCode

监听监听图片跟字符串ts文件变化 自动导入相关代码，建议项目启动后手动开启
- createTemplate

创建模块模版,这里会自动更新src/index.ts和src/router/RouterConfig.ts
就是模块自动注册到程序最外层的index入口，不用担心module_common注册顺序，会始终放在第一个注册进去

2. 使用例子

```
npm run res 或 node createCode.js 开启资源变化监听，注意资源只能写在固定的res文件夹
node createTemplate.js module_test 新建模块
node createTemplate.js module_test -d 删除模块
```

### 已经封装的基础组件
- ListView

列表组件支持二级列表对FlatList/SectionList的封装，
支持刷新，加载更多，翻页，到底，
- LoadDataContainerView

加载容器，加载显示loading,显示加载错误，加载完成
- Touchable 点击控件 处理多次点击
- HeaderView

页面的头部封装

### 全部的状态管理框架mobx

简单可扩展的状态管理框架
1. 可作为全局的数据仓库store，以及全局状态管理
2. 可以作为组件的状态管理



### 如何运行项目
1. npm install
2. 运行

```
web端：npm run web
移动端：npm run android/ios
```

### 代码规范
1. 开启eslint

配置在项目根目录下的.eslintrc.js
2. 安装代码格式化插件prettier

配置在项目根目录下的.prettierrc.js

### 命名规范
- 全局的模型类/ui类/function Ui组件 统一大小开头 驼峰
- 除了例如index js项目通用的 这样的可以小写
- 函数名、方法名、参数名、成员变量、局部变量都统一使用 lowerCamelCase 风格   组件function 需要大写开头需要注意
- 图片资源  控件描述_控件状态限定词  导出名称：模块名_业务功能描述_控件描述_控件状态限定词 module_login_btn_pressed
- 所有页面维度的组件命名xxxScreen 业务逻辑组件xxxView 公共组件不限制
- string 资源 模块名_逻辑名称 module_login_tips
- 常量命名全部大写，单词间用下划线隔开，力求语义表达完整清楚，不要嫌名字长
- 带有boolean结果的变量，用isXxx 去表示如isOpen
- style样式需要用小写的单词用_隔开 业务描述_控件描述  cover_img:{ } bottom_container:{}

### 开发注意及使用
1. 禁止修改项
请勿修改src/BetterBanner.js 和src/router/RouterConfig.ts
这两个文件为统一模块入口和注册入口，
2. 模块初始化的东西在对应模块的index文件进行注册
3. createCode 推荐在启动项目后手动开启，如果不涉及到资源变化也可以不开启，已经在package.json配置
4. module之间不推荐直接访问，除了直接依赖module_common访问
如module_a 调用module_b
    - 在公共service写接口方法testInterface
    - 在module_b的service写实现testInterface，并在当前模块index进行注册实现
    - 这时候module_a通过如globalService.xxx可以调用module_b
5. app开发中禁止在业务中直接写魔法值 如直接type=== 1，需要在constants写相应的静态变量，
如果是简单的，可以在模型类里面方法 isOpen(){return is_open === 1};
6. 禁用行内样式，一律用StyleSheet创建，动态计算的，需要对number进行适配处理 默认对StyleSheet创建的样式进行了设计图宽度适配，




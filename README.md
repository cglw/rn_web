# bjy_wap

百家云网校 手机端RN(安卓+iOS+H5)


全局的模型类/ui类/function Ui组件 统一大小开头 驼峰
其他的文件名可以用小写，不推荐小写开头的驼峰

变量名 一律用驼峰式
静态值或枚举 全部大写

assets 全局静态资源可以存储一些json 音频文件等
module 业务模块
    module_common 业务公共逻辑层
router 全局路由管理
sdk 无关业务的一些库(切记不要加业务代码)
style 全局样式
typings 全局扩展以及全局变量定义
utils 无关业务的工具类(切记不要加业务代码)
application app的启动路由注册
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



遇到3端不统一的组件或者业务，需要在当前目录新建platform文件夹
例如新建xxx.ts  xxx.web.ts  至少是2个 一个是默认实现 一个是对应平台实现
android/ios/web
导包的时候请勿导带有平台后缀，去掉后缀即可


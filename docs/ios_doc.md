集成到已有iOS应用中
===

####  Quick Start 

正式版【收银类业务线上版本】

pod 'Hummer', git: 'git@github.com:didi/hummer.git', tag: '201907291934'

最新版【最近两端对齐版本】

pod 'Hummer', git: 'git@github.com:didi/hummer.git', branch: 'feature/Unify\_iOS\_Android'

####  启动

> Hummer组件包含用户自定义组件初始化

```
 [Hummer startEngine:null];
```

####  执行脚本入口

```
[Hummer evaluateScript:script fileName:self.URL inRootView:self.view]; 
```

#### 插件开发

> 支持自定义功能注入到Hummer，注入后可在TS脚本中使用该功能

1 . 导出类使用宏 HM\_EXPORT\_CLASS(jsclass,occlass)

eg

```
oc中

HM_EXPORT_CLASS(UPNetwork, UPNetwork)

js中

let network = new UPNetwork()

```



2 . 导出方法 HM\_EXPORT\_METHOD(jsmethod,ocmethod)

eg

```
oc中

HM_EXPORT_METHOD(get, __Get:successBlock:failedBlock:)

js中

network.get('https://www.baidu.com',(response)=>{
},(error)=>{
})


```

3 . 导出属性 HM\_EXPORT\_PROPERTY(jsproperty, ocsetter,ocgetter)

eg


```
oc中

HM_EXPORT_PROPERTY(text, __text, __setText:)

js中

let button = new Button()
button.text = 'xxxx'
console.log(button.text);

```
通过上述方式可自由定制功能注入Hummer。


####  单页面推荐实践

> 系收银台支付页面搭建方式，目前已线上稳定运行

文档

代码

#### CLI

`Hummer create xxx01` 创建工程

`Hummer build iOS ` 编译

`Hummer run  iOS ` 脚本在模拟器或真机上执行

`Hummer doctor`  诊断
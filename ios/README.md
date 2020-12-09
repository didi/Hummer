集成到已有iOS应用中
===

###  Quick Start

pod 'Hummer', :git => 'git@github.com:didi/Hummer.git', :branch => 'master'，可以更换为最新的 tag

###  启动

> Hummer组件包含用户自定义组件初始化

```
[Hummer startEngine:nil];
```

### 实现自定义 Hummer 容器页面（可直接继承 HMViewController）

```
HMViewController *hummerViewController = [[HMViewController alloc] init];
hummerViewController.URL = info.url;
hummerViewController.params = info.params;
hummerViewController.hm_dismissBlock = info.callback;
```

### HMViewController 内部执行脚本入口（如果 url 确实已经是 js 文件，则可以忽略这一步）

```
[Hummer evaluateScript:script fileName:self.URL inRootView:self.view]; 
```

### 自定义导出类

HM_EXPORT_CLASS(jsClassName, objcClass)
HM_EXPORT_METHOD(jsMethodName, sel)
HM_EXPORT_PROPERTY(jsPropertyName, getter, setter)

### CLI 文档
- Hummer CLI 脚手架使用，请参考 [CLI 使用教程](https://hummer.didi.cn/doc#/zh-CN/cli_doc)。
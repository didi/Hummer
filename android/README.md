集成到已有Android应用中
===

### 1. 添加 Hummer SDK 依赖
``` gradle
dependencies {
  implementation 'io.github.didi.hummer:hummer:0.4.4'
}
```

### 2. 初始化 Hummer SDK
在 `Application` 的 `onCreate` 中初始化 Hummer SDK。
```java
Hummer.init(this);
```

### 3. 实现 Hummer 容器
实现单页面 Hummer 容器。
```java
public class HummerSinglePageActivity extends HummerActivity {
    @Override
    protected NavPage getPageInfo() {
        // URL来源一：通过Intent传入
        // return super.getPageInfo();

        // URL来源二：assets文件路径
        // return new NavPage("HelloWorld.js");

        // URL来源三：手机设备文件路径
        // return new NavPage("/sdcard/HelloWorld.js");

        // URL来源四：网络url
        return new NavPage("http://x.x.x.x:8000/index.js");
    }
}
```

### 4. 启动本地服务
通过 Hummer CLI 启动本地服务。想了解更多关于 Hummer CLI 的相关知识，请参考 [Hummer CLI 使用教程](https://hummer.didi.cn/doc#/zh-CN/cli_doc)。
```
hummer dev
```

### 5. 混淆规则
```java
## Hummer
-keep @interface com.didi.hummer.annotation.*
-keep @com.didi.hummer.annotation.Component class * {*;}
-keep @com.didi.hummer.annotation.Module class * {*;}
-keep class com.didi.hummer.core.engine.jsc.jni.** {*;}
-keep class com.didi.hummer.core.engine.napi.** {*;}
-keep class com.didi.hummer.core.exception.JSException {*;}
-keep class com.didi.hummer.render.component.anim.AnimViewWrapper {*;}
-keep class com.facebook.yoga.** {*;}
-keep class com.facebook.jni.** {*;}
```

### 6. 进阶用法
Android 其他进阶用法请参考 [官网文档 - Android 进阶](https://hummer.didi.cn/doc#/zh-CN/android_doc_advanced)。

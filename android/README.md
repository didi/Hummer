# Hummer 动态化跨端框架（Android端）

## 简介
Hummer（原名NativeJS）项目是由普惠泛前端团队和R-Lab泛前端团队共同建设的高性能高可用的轻量级动态化跨端解决方案。历时一年多的打磨，目前已经在聚合收银台、代驾跑腿、596等业务上进行了大规模落地，同时在代驾司机端和两轮车业务的部分场景上进行尝试。正如Hummer的名字一样，既像“蜂鸟”般小巧轻盈，又像“悍马”一样动力强劲。

## 特点
- **轻量级：** 当前Hummer整体编译后只有几百KB的大小，能非常便捷地接入到各App中，并大大缓解各App的包体积压力；
- **高可用：** 团队自研属性，使得我们对于问题的解决和性能的优化，做到了极速响应，造就了当前低于 0.1‰的crash率；
- **跨端性：** 基于JSEngine的导出机制，提供统一API，抹平平台差异，实现一套js代码跨三端执行；
- **动态化：** 通过JS引擎的动态执行能力和JS Bundle的远程下发设施，实现了Hummer的动态更新能力；
- **高性能：** 得利于原生风格的API设计和基于原生的布局和渲染能力，大大减少了跨域通信损耗，使得Hummer发挥出接近原生的性能体验；
- **易上手：** 足够简单的架构设计，不到4000行的核心代码，以及偏向原生的开发体验，使得客户端同学的上手难度和维护成本都降至最低；

## 开始体验

### 一、创建一个全新应用
##### 1. 安装 Hummer CLI
```
sudo npm install @didi/hummer-cli -g
```
##### 2. 创建项目工程
```
hummer create hummer-demo
```
##### 3. 安装工程依赖
```
cd hummer-demo
sudo npm i
```
##### 4. 运行
```
hummer run android/ios/web
```

### 二、集成到已有Android应用中
##### 1. 引入 Hummer SDK 依赖包
```java
implementation 'com.didi.hummer:hummer:0.2.33'
```

##### 2. Application 中初始化
```java
HummerConfig config = new HummerConfig.Builder()
        .setJSLogger((level, msg) -> Log.d("HummerJS", msg))
        .setExceptionCallback(e -> {
            Log.e("zdf", "Hummer Exception", e);
            Toast.makeText(this, e.toString(), Toast.LENGTH_SHORT).show();
        }).builder();
Hummer.init(this, config);
```

##### 3. 继承 HummerActivity 实现自己的 Hummer 页面
```java
public class MyHummerActivity extends HummerActivity {
    @Override
    protected void renderHummer() {
         hmRender.renderWithUrl("http://localhost:9292/HelloWorld.js");
    }
}
```

##### 4. 添加混淆规则
```java
## Hummer
-keep @interface com.didi.hummer.annotation.*
-keep @com.didi.hummer.annotation.Component class * {*;}
-keep @com.didi.hummer.annotation.Module class * {*;}
-keep class com.didi.hummer.core.engine.jsc.jni.** {*;}
-keep class com.didi.hummer.render.component.view.BackgroundHelper {
    public void setBackgroundColor(int);
    public int getBackgroundColor();
}
-keep class com.facebook.yoga.** {*;}
```

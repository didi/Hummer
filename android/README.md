集成到已有Android应用中
===

### 添加 Hummer SDK 依赖
```java
implementation 'com.didi.hummer:hummer:0.3.11'
```

### Application 中初始化 Hummer
```java
HummerConfig config = new HummerConfig.Builder()
        .setJSLogger((level, msg) -> Log.d("HummerJS", msg))
        .setExceptionCallback(e -> Log.e("HummerException", "Hummer Exception", e))
        .builder();
Hummer.init(this, config);
```

### 实现自定义 Hummer 容器页面（可直接继承 HummerActivity）
```java
public class MyHummerActivity extends HummerActivity {

    @Override
    protected void initHummerRegister(HummerContext context) {
        super.initHummerRegister(context);
        // 注册自己项目中的导出组件（如果有自定义导出类的话，否则可以去掉这一段）
        HummerRegister$$hummer_demo_app.init(context);
    }

    @Override
    protected void renderHummer() {
        // 渲染JS页面
        hmRender.renderWithUrl("http://xxx.xxx.xxx.xxx:8000/index.js");
    }
}
```

### 自定义导出类
##### 1. 在Module的gradle中加上ModuleName配置
```java
android {
    defaultConfig {
        ...
        javaCompileOptions {
            annotationProcessorOptions {
                arguments = [HUMMER_MODULE_NAME: project.getName()]
            }
        }
    }
}
```

##### 2. 在Module的gradle中添加编译时注解依赖
```java
annotationProcessor 'com.didi.hummer:hummer-compiler:0.2.16'
```

##### 3. 自定义导出类，看下面例子
```java
@Component("TestExportModel")
public class TestExportModel {
 
    // 可以只注解属性，不实现set和get方法
    @JsProperty("stringValue")
    public String stringValue;
 
    // 也可以注解属性，并实现set或者get方法
    @JsProperty("floatValue")
    public float floatValue;
    public void setFloatValue(float value) {
        floatValue = value;
    }
    public float getFloatValue() {
        return floatValue;
    }
 
    // 注解Map类型的属性
    @JsProperty("mapValue")
    private Map<String, Object> mapValue;
    public void setMapValue(Map<String, Object> value) {
        mapValue = value;
    }
    public Map<String, Object> getMapValue() {
        return mapValue;
    }
 
    // 注解List类型的属性
    @JsProperty("listValue")
    private List<String> listValue;
    public void setListValue(List<String> value) {
        listValue = value;
    }
    public List<String> getListValue() {
        return listValue;
    }
 
    // 注解方法
    @JsMethod("doFunc")
    public String doFunc(int intValue, float floatValue, HashMap<String, String> mapValue, ArrayList<Object> listValue) {
        return "[doFunc] intValue: " + intValue + ", floatValue: " + floatValue + ", mapValue: " + mapValue + ", listValue: " + listValue;
    }
}
```

##### 4. Hummer页面初始化时调用组件注册方法
```java
HummerRegister$$hummer_demo_app.init(hmContext);
```

### Bridge用法
##### 1. Native向JS静态类注册方法
```java
HummerContext hmContext = hmRender.getHummerContext();
hmContext.registerJSFunction("Test.nativeFunc", new ICallback() {
    @Override
    public Object call(Object... params) {
        return "result";
    }
});
```
> JS中用法：`Test.nativeFunc(111, 222);`

##### 2. Native向JS对象注册方法（只能在渲染页面结束后才能使用）
```java
HummerContext hmContext = hmRender.getHummerContext();
JSValue jsPage = hmContext.getJsPage();
if (jsPage != null) {
    hmContext.registerJSFunction(jsPage, "nativeFunc", new ICallback() {
        @Override
        public Object call(Object... params) {
            return "result";
        }
    });
}
```
> JS中用法：在RootView中调用 `this.nativeFunc(111, 222);`

##### 3. Native调用JS的全局方法（只能在渲染页面结束后才能使用）
```java
HummerContext hmContext = hmRender.getHummerContext();
hmContext.getJsContext().callFunction("onTest", 111, 222.22, true, "ttt");
```
> JS中定义全局方法：`function onTest(a, b, c, d) {};`

##### 4. Native调用JS的Hummer域下的方法（只能在渲染页面结束后才能使用）
```java
HummerContext hmContext = hmRender.getHummerContext();
hmContext.getJsContext().callFunction("Hummer.onTest", 111, 222.22, true, "ttt");
```
> JS中定义Hummer域下的方法：`Hummer.onTest = (a, b, c, d) => {};`

##### 5. Native调用JS某个对象的方法（只能在渲染页面结束后才能使用）
```java
HummerContext hmContext = hmRender.getHummerContext();
JSValue jsPage = hmContext.getJsPage();
if (jsPage != null) {
    jsPage.callFunction("onTest", 111, 222.22, true, "ttt");
}
```
> JS中在RootView中定义方法：`onTest(a, b, c, d) {};`

### 混淆规则
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
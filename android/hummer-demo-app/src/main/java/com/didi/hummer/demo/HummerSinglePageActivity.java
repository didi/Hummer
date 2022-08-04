package com.didi.hummer.demo;

import android.support.annotation.NonNull;
import android.util.Log;

import com.didi.hummer.HummerActivity;
import com.didi.hummer.adapter.navigator.NavPage;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.register.HummerRegister$$hummer_demo_app;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Hummer单页面示例
 *
 * Created by XiaoFeng on 2020-01-02.
 */
public class HummerSinglePageActivity extends HummerActivity {

    /**
     * 设置该页面对应的namespace，用于做业务隔离（可选）
     */
//    @Override
//    protected String getNamespace() {
//        return "test_namespace";
//    }

    /**
     * 初始化Hummer注册内容（原生侧向JS侧注册的类、全局变量和全局方法）
     */
    @Override
    protected void initHummerRegister(HummerContext context) {
        super.initHummerRegister(context);
        HummerRegister$$hummer_demo_app.init(context);

        Map<String, Object> data = new HashMap<>();
        data.put("dddd", 11111);
        data.put("eeee", 22222);
        hmRender.setNativeDataToHummer("nativeData", data);

        // Native向JS静态类注册回调方法（可选）
        // js中调用：Test.nativeFunc(111, 222);
        hmRender.getHummerContext().registerJSFunction("Test.nativeFunc", params -> {
            Log.v("zdf", "Test.nativeFunc, params = " + Arrays.toString(params));
            if (params.length > 4) {
                ((JSCallback) params[4]).call(12.34, true);
            }
            return "result1";
        });
    }

    /**
     * 渲染方式一：通过URL来源构造PageInfo信息，来渲染JS页面（推荐）
     */
    @Override
    protected NavPage getPageInfo() {
        // URL来源一：通过Intent传入
        return super.getPageInfo();

        // URL来源二：assets文件路径
        // return new NavPage("HelloWorld.js");

        // URL来源三：手机设备文件路径
        // return new NavPage("/sdcard/HelloWorld.js");

        // URL来源四：网络url
        // return new NavPage("http://x.x.x.x:8000/index.js");
    }

    /**
     * 渲染方式二：直接通过JS来源渲染JS页面（此方式会丢失页面的PageInfo，不推荐）
     */
    @Override
    protected void renderHummer() {
        // JS来源一：通过Intent传入url
        super.renderHummer();

        // JS来源二：assets文件
        // hmRender.renderWithAssets("HelloWorld.js");

        // JS来源三：手机设备文件
        // hmRender.renderWithFile("/sdcard/HelloWorld.js");

        // JS来源四：网络url
        // hmRender.renderWithUrl("http://x.x.x.x:8000/index.js");

        // JS来源五：JS文本内容
        // String jsContent = "let a = 1;";
        // hmRender.render(jsContent);
    }

    /**
     * 页面渲染成功的回调
     */
    @Override
    protected void onPageRenderSucceed(@NonNull HummerContext hmContext, @NonNull JSValue jsPage) {
        Log.d("zdf", "onPageRenderSucceed");
        Map<String, String> map = new HashMap<>();
        map.put("aaa", "1111");
        map.put("bbb", "2222");
        List<String> list = new ArrayList<>();
        list.add("qqq");
        list.add("www");

        // Native调用JS的全局方法（可选）
        hmContext.getJsContext().callFunction("onTestBase", 111, 222.22, true, "ttt");
        hmContext.getJsContext().callFunction("onTestCollection", map, list);

        // Native调用JS某个对象的方法（可选）
        jsPage.callFunction("onTestBase", 111, 222.22, true, "ttt");
        jsPage.callFunction("onTestCollection", map, list);

        // Native向JS对象注册回调方法（可选）
        // js中调用：this.nativeFunc(111, 222);
        hmContext.registerJSFunction(jsPage, "nativeFunc", params -> {
            Log.v("zdf", "this.nativeFunc, params = " + Arrays.toString(params));
            return "result2";
        });

        // NotifyCenter全局通知消息
//        NotifyCenter.addEventListener("testEvent", new NotifyCallback(this) {
//            @Override
//            public void onNotify(Object event) {
//                Log.v("zdf", "onNotify, event = " + event);
//            }
//        });
//
//        Map<String, Object> value = new HashMap<>();
//        value.put("testkey", 2222);
//        NotifyCenter.triggerEvent("testEvent", null);
//        NotifyCenter.triggerEvent("testEvent", 111);
//        NotifyCenter.triggerEvent("testEvent", value);
    }

    /**
     * 页面渲染失败的回调
     */
    @Override
    protected void onPageRenderFailed(@NonNull Exception e) {
        Log.e("zdf", "onPageRenderFailed, " + Log.getStackTraceString(e));
    }
}

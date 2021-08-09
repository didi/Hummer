package com.didi.hummer.context.jsc;

import android.content.Context;
import android.os.Looper;
import android.support.test.InstrumentationRegistry;
import android.support.test.runner.AndroidJUnit4;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.context.napi.NAPIHummerContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.render.style.HummerLayout;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.assertEquals;

/**
 * Created by XiaoFeng on 2021/7/5.
 */
@RunWith(AndroidJUnit4.class)
public class HummerContextTest {

    static {
        System.loadLibrary("hummer-qjs");
    }

    private static Context appContext;
    private HummerContext hmContext;

    @BeforeClass
    public static void staticInit() {
        appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        HummerSDK.setJsEngine(HummerSDK.JsEngine.QUICK_JS);
        HummerSDK.init(appContext);
        Looper.prepare();
    }

    @Before
    public void init() {
        hmContext = new JSCHummerContext(new HummerLayout(appContext), null);
    }

    @After
    public void release() {
        hmContext.onDestroy();
    }

    @Test
    public void console() {
        hmContext.evaluateJavaScript("console.log('Hello Hummer');");
    }

    /**
     * JS 调用 Native 注册的全局方法
     */
    @Test
    public void jsCallNativeGlobalFunction() {
        hmContext.registerJSFunction("Test.nativeFunc", params -> params[0]);
        hmContext.evaluateJavaScript("var ret = Test.nativeFunc(12.34);");
        double ret = hmContext.getJsContext().getDouble("ret");
        assertEquals(12.34, ret, 0);
    }

    /**
     * JS 调用 Native 注册的对象方法
     */
    @Test
    public void jsCallNativeObjectFunction() {
        String script = "class Test {};" +
                "var t = new Test();";
        hmContext.evaluateJavaScript(script);
        JSValue t = hmContext.getJsContext().getJSValue("t");
        hmContext.registerJSFunction(t, "nativeFunc", params -> params[0]);
        hmContext.evaluateJavaScript("var ret = t.nativeFunc(12.34);");
        double ret = hmContext.getJsContext().getDouble("ret");
        assertEquals(12.34, ret, 0);
    }
}
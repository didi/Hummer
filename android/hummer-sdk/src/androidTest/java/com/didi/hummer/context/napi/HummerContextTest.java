package com.didi.hummer.context.napi;

import android.content.Context;
import android.os.Looper;
import android.support.test.InstrumentationRegistry;
import android.support.test.runner.AndroidJUnit4;
import android.util.Log;

import com.didi.hummer.HummerSDK;
import com.didi.hummer.context.HummerContext;
import com.didi.hummer.context.jsc.JSCHummerContext;
import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.engine.base.ICallback;
import com.didi.hummer.core.engine.napi.NAPIContext;
import com.didi.hummer.core.engine.napi.jni.JSEngine;
import com.didi.hummer.render.style.HummerLayout;
import com.facebook.soloader.SoLoader;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

/**
 * Created by XiaoFeng on 2021/7/5.
 */
@RunWith(AndroidJUnit4.class)
public class HummerContextTest {

    static {
        System.loadLibrary("hummer-napi");
    }

    private static Context appContext;
    private HummerContext hmContext;

    @BeforeClass
    public static void staticInit() {
        appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();
        HummerSDK.setJsEngine(HummerSDK.JsEngine.NAPI_QJS);
        HummerSDK.init(appContext);
        Looper.prepare();
    }

    @Before
    public void init() {
        hmContext = new NAPIHummerContext(new HummerLayout(appContext), null);
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
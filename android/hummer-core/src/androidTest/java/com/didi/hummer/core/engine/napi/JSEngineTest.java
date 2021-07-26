package com.didi.hummer.core.engine.napi;

import android.support.test.runner.AndroidJUnit4;
import android.util.Log;

import com.didi.hummer.core.engine.JSCallback;
import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.JSValue;
import com.didi.hummer.core.engine.napi.jni.JSEngine;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

/**
 * Created by XiaoFeng on 2021/7/5.
 */
@RunWith(AndroidJUnit4.class)
public class JSEngineTest {

    static {
        System.loadLibrary("hummer-napi");
    }

    private JSContext context;

    @Before
    public void init() {
        context = NAPIContext.wrapper(JSEngine.createJSContext());
    }

    @After
    public void release() {
        context.release();
    }

    @Test
    public void isValid() {
        context.evaluateJavaScript("var a = {};");
        JSValue a = context.getJSValue("a");
        assertTrue(a.isValid());

        context.evaluateJavaScript("var b;");
        JSValue b = context.getJSValue("b");
        assertNull(b);

        context.evaluateJavaScript("var c = null;");
        JSValue c = context.getJSValue("c");
        assertNull(c);

        assertTrue(context.isValid());
        context.release();
        assertFalse(context.isValid());
    }

    @Test
    public void getValue() {
        String script = "var v = {" +
                "   a: 11," +
                "   b: 111111111111111," +
                "   c: 12.34," +
                "   d: true," +
                "   e: 'Hello Hummer'," +
                "   f: { aa: 11}," +
                "   g: () => {}," +
                "}; v;";
        context.evaluateJavaScript(script);
        JSValue v = context.getJSValue("v");
        assertEquals(11, v.getInt("a"), 0);
        assertEquals(111111111111111L, v.getLong("b"), 0);
        assertEquals(12.34, v.getDouble("c"), 0);
        assertTrue(v.getBoolean("d"));
        assertEquals("Hello Hummer", v.getString("e"));
        assertNotNull(v.getJSValue("f"));
        assertTrue(v.getJSValue("g") instanceof JSCallback);
        assertNull(v.getJSValue("z"));
    }

    @Test
    public void setValue() {
        String script = "var v = {};";
        context.evaluateJavaScript(script);
        JSValue v = context.getJSValue("v");
        v.set("a", 11);
        v.set("b", 111111111111111L);
        v.set("c", 12.34);
        v.set("d", true);
        v.set("e", "Hello Hummer");
        v.set("f", context.evaluateJavaScript("{ aa: 11};"));
        v.set("g", context.evaluateJavaScript("() => {};"));
        assertEquals("{\"a\":11,\"b\":111111111111111,\"c\":12.34,\"d\":true,\"e\":\"Hello Hummer\",\"f\":11}", context.evaluateJavaScript("JSON.stringify(v)").toString());
    }

    /**
     * Native 调用 JS 全局方法
     */
    @Test
    public void nativeCallJSGlobalFunction() {
        String script = "var func = (p) => {" +
                "   return p;" +
                "};";
        context.evaluateJavaScript(script);
        JSCallback func = (JSCallback) context.getJSValue("func");
        Object ret = func.call(12.34);
        assertEquals(12.34, (double) ret, 0);

        // 旧方式，将被废弃
        ret = context.callFunction("func", 12.34);
        assertEquals(12.34, (double) ret, 0);
    }

    /**
     * Native 调用 JS 对象方法
     */
    @Test
    public void nativeCallJSObjectFunction() {
        String script = "var a = {};" +
                "a.func = (p) => {" +
                "   return p;" +
                "};";
        context.evaluateJavaScript(script);
        JSCallback func = (JSCallback) context.getJSValue("a").getJSValue("func");
        Object ret = func.call(12.34);
        assertEquals(12.34, (double) ret, 0);

        // 旧方式，将被废弃
        ret = context.getJSValue("a").callFunction("func", 12.34);
        assertEquals(12.34, (double) ret, 0);
    }

    /**
     * JS 调用 Native 注册的全局方法
     */
    @Test
    public void jsCallNativeGlobalFunction() {
        // 由于之前 Native 注册方法写在了 HummerContext 层，所以这里暂时无法写单元测试
    }

    /**
     * JS 调用 Native 注册的对象方法
     */
    @Test
    public void jsCallNativeObjectFunction() {
        // 由于之前 Native 注册方法写在了 HummerContext 层，所以这里暂时无法写单元测试
    }
}
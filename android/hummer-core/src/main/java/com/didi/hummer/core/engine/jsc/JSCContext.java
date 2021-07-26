package com.didi.hummer.core.engine.jsc;

import android.text.TextUtils;

import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.jsc.jni.JavaScriptRuntime;
import com.didi.hummer.core.engine.jsc.jni.TypeConvertor;

/**
 * JS全局环境
 *
 * Created by XiaoFeng on 2019-09-25.
 */
public class JSCContext extends JSCValue implements JSContext {

    public static JSCContext create() {
        return wrapper(JavaScriptRuntime.createJSContext());
    }

    public static JSCContext wrapper(long context) {
        return new JSCContext(context);
    }

    private JSCContext(long context) {
        super(context, -1);
    }

    @Override
    public Object evaluateJavaScript(String script) {
        return evaluateJavaScript(script, "");
    }

    @Override
    public Object evaluateJavaScript(String script, String scriptId) {
        if (TextUtils.isEmpty(script)) {
            return null;
        }
        if (scriptId == null) {
            scriptId = "";
        }
        long jsValue = JavaScriptRuntime.evaluateJavaScript(context, script, scriptId);
        return JSCUtils.jsValueToObject(context, jsValue);
    }

    @Override
    public long getIdentify() {
        return context;
    }

    @Override
    public void release() {
        JavaScriptRuntime.destroyJSContext(context);
    }

    @Override
    public boolean isValid() {
        return TypeConvertor.isJSContextValid(context);
    }
}

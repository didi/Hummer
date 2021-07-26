package com.didi.hummer.core.engine.napi;

import android.text.TextUtils;

import com.didi.hummer.core.engine.JSContext;
import com.didi.hummer.core.engine.napi.jni.JSEngine;

/**
 * Created by XiaoFeng on 2021/6/29.
 */
public class NAPIContext extends NAPIValue implements JSContext {

    public static NAPIContext create() {
        return wrapper(JSEngine.createJSContext());
    }

    public static NAPIContext wrapper(long context) {
        return new NAPIContext(context);
    }

    private NAPIContext(long context) {
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
        return JSEngine.evaluateJavaScript(context, script, scriptId);
    }

    @Override
    public long getIdentify() {
        return context;
    }

    @Override
    public void release() {
        JSEngine.destroyJSContext(context);
    }

    @Override
    public boolean isValid() {
        return JSEngine.isJSContextValid(context);
    }
}

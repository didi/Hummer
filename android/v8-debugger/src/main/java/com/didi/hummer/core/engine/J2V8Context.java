package com.didi.hummer.core.engine;

import android.text.TextUtils;

import com.didi.hummer.core.engine.jsc.jni.HummerException;
import com.eclipsesource.v8.V8;
import com.eclipsesource.v8.V8Object;

/**
 * Created by XiaoFeng on 2019-11-01.
 */
public class J2V8Context extends J2V8Value implements JSContext {

    public static J2V8Context create() {
        return wrapper(V8.createV8Runtime());
    }

    public static J2V8Context wrapper(V8 v8) {
        return new J2V8Context(v8);
    }

    protected J2V8Context(V8 v8) {
        super();
        context = this;
        v8Object = v8;
    }

    public V8Object registerJavaMethod(Object object, String methodName, String jsFunctionName, Class<?>[] parameterTypes) {
        return getV8().registerJavaMethod(object, methodName, jsFunctionName, parameterTypes);
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
        try {
            Object ret = getV8().executeScript(script, scriptId, 0);
            return J2V8Utils.objectToJ2V8Object(this, ret);
        } catch (Exception e) {
            HummerException.nativeException(this, e);
        }
        return null;
    }

    @Override
    public void release() {
        try {
            getV8().close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

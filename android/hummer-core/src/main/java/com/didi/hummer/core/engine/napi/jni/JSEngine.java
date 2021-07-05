package com.didi.hummer.core.engine.napi.jni;

/**
 * Created by XiaoFeng on 2021/6/29.
 */
public class JSEngine {

    public static native long createJSContext();

    public static native void destroyJSContext(long jsContext);

    public static native Object evaluateJavaScript(long jsContext, String script, String scriptId);

    public static native void setProperty(long jsContext, long object, String key, Object value);

    public static native Object getProperty(long jsContext, long object, String key);

    public static native boolean delProperty(long jsContext, long object, String key);

    public static native Object callFunction(long jsContext, long thisObj, long funcObj, Object... params);

    public static native boolean isJSContextValid(long jsContext);

    public static native boolean isJSValueValid(long jsContext, long jsValue);

    public static native void protect(long jsContext, long jsValue);

    public static native void unProtect(long jsContext, long jsValue);
}

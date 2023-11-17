package com.didi.hummer2.core.engine.jsc.jni;

public class TypeConvertor {

    public static native long makeNumber(long jsContext, double value);

    public static native long makeBoolean(long jsContext, boolean value);

    public static native long makeString(long jsContext, String string);

    public static native long makeFromJsonString(long jsContext, String jsonString);

    public static native double JSValue2Double(long jsContext, long jsValue);

    public static native boolean JSValue2Boolean(long jsContext, long jsValue);

    public static native String JSValue2String(long jsContext, long jsValue);

    public static native boolean isJSNumber(long jsContext, long jsValue);

    public static native boolean isJSBoolean(long jsContext, long jsValue);

    public static native boolean isJSString(long jsContext, long jsValue);

    public static native boolean isJSNull(long jsContext, long jsValue);

    public static native boolean isJSUndefined(long jsContext, long jsValue);

    public static native boolean isJSFunction(long jsContext, long jsValue);

    public static native boolean isJSContextValid(long jsContext);

    public static native boolean isJSValueValid(long jsContext, long jsValue);

    public static native long JSFunctionCall(long jsContext, long thisObj, long funcObj, long... jsValuePointers);

    public static native void JSValueSetProperty(long jsContext, long object, String key, long jsValue);

    public static native long JSValueGetProperty(long jsContext, long object, String key);

    public static native boolean JSValueDelProperty(long jsContext, long object, String key);

    public static native void JSValueProtect(long jsContext, long jsValue);

    public static native void JSValueUnProtect(long jsContext, long jsValue);
}

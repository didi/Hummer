package com.didi.hummer.core.engine.jsc.jni;

public final class JavaScriptRuntime {

    public static long createJSContext() {
        return createJSContextNative();
    }

    public static void destroyJSContext(long jsContext) {
        destroyJSContextNative(jsContext);
    }

    public static long evaluateJavaScript(long jsContext, String script) {
        return evaluateJavaScriptNative(jsContext, script, "");
    }

    public static long evaluateJavaScript(long jsContext, String script, String scriptId) {
        return evaluateJavaScriptNative(jsContext, script, scriptId);
    }

    private static native long createJSContextNative();

    private static native void destroyJSContextNative(long jsContext);

    private static native long evaluateJavaScriptNative(long jsContext, String script, String scriptId);
}

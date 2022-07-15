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

    public static byte[] compileJavaScript(long jsContext, String script, String scriptId) {
        return compileJavaScriptNative(jsContext, script, scriptId);
    }

    public static long evaluateBytecode(long jsContext, byte[] bytecode) {
        return evaluateBytecodeNative(jsContext, bytecode);
    }

    private static native long createJSContextNative();

    private static native void destroyJSContextNative(long jsContext);

    private static native long evaluateJavaScriptNative(long jsContext, String script, String scriptId);

    private static native byte[] compileJavaScriptNative(long jsContext, String script, String scriptId);

    private static native long evaluateBytecodeNative(long jsContext, byte[] bytecode);
}

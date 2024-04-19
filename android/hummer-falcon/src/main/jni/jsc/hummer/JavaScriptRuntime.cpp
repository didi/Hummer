//
// Created by maxiee on 2019-08-05.
//
#include <jni.h>
#include "../JavaScriptCore/include/JavaScript.h"
#include "HummerJNI.h"
#include "TypeConvertor.h"
#include "JSCCache.h"

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_createJSContextNative(JNIEnv *env, jclass clazz) {
    JSGlobalContextRef jsContextRef = JSGlobalContextCreate(nullptr);

    // 加入缓存
    JSCCache::addJsContextRef(jsContextRef);

    // 还未真正实现Recycler类注入，临时先这么写
    JSStringRef jsScript = JSStringCreateWithUTF8CString("class Recycler {}");
    JSEvaluateScript(jsContextRef, jsScript, nullptr, nullptr, 0, nullptr);

    return reinterpret_cast<jlong>(jsContextRef);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_destroyJSContextNative(JNIEnv *env, jclass clazz, jlong jsContext) {
    auto jsContextRef = reinterpret_cast<JSGlobalContextRef>(jsContext);

    // 删除缓存（用于标记已释放）
    JSCCache::removeJsContextRef(jsContextRef);

    JSGlobalContextRelease(jsContextRef);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_evaluateJavaScriptNative(JNIEnv *env, jclass clazz, jlong js_context, jstring script, jstring scriptId) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    if (jsContext == nullptr) {
        return -1;
    }

    const char* charScript = env->GetStringUTFChars(script, nullptr);
    const char* charScriptId = env->GetStringUTFChars(scriptId, nullptr);
    JSStringRef jsScript = JSStringCreateWithUTF8CString(charScript);
    JSStringRef jsScriptId = JSStringCreateWithUTF8CString(charScriptId);

    long ret = 0;
    JSValueRef exception = nullptr;
    if (JSCheckScriptSyntax(jsContext, jsScript, nullptr, 0, &exception)) {
        ret = (long) JSEvaluateScript(
                jsContext,
                jsScript,
                nullptr, jsScriptId, 0, &exception);
    }
    if (exception) reportException(jsContext, exception);

    env->ReleaseStringUTFChars(script, charScript);
    env->ReleaseStringUTFChars(scriptId, charScriptId);
    JSStringRelease(jsScript);
    JSStringRelease(jsScriptId);
    return ret;
}

extern "C"
JNIEXPORT jbyteArray JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_compileJavaScriptNative(JNIEnv *env, jclass clazz, jlong js_context, jstring script, jstring scriptId) {
    return nullptr;
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_evaluateBytecodeNative(JNIEnv *env, jclass clazz, jlong js_context, jbyteArray bytecode) {
    return -1;
}
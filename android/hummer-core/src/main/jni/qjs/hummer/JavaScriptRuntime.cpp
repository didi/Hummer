//
// Created by maxiee on 2019-08-05.
//
#include <jni.h>
#include <TypeConvertor.h>
#include <QuickJSCache.h>
#include <PromiseProcessor.h>
#include <HummerJNI.h>
#include <quickjs.h>
#include <JSException.h>
#include <HummerClassRegister.h>

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_createJSContextNative(JNIEnv *env, jclass clazz) {
    JSRuntime *rt = JS_NewRuntime();
    JSContext *ctx = JS_NewContext(rt);
    // 在创建完JSRuntime后第一时间注册自定义Class，是为了使所有JSRuntime公用一个classId，不被相互覆盖
    HummerClassRegister::init(rt, ctx);
    return QJS_CONTEXT_ID(ctx);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_destroyJSContextNative(JNIEnv *env, jclass clazz, jlong js_context) {
    auto context = QJS_CONTEXT(js_context);
    QJS_CONTEXT_REMOVE(js_context);
    if (context != nullptr) {
        JSRuntime *rt = JS_GetRuntime(context);
        JS_FreeContext(context);
        JS_RunGC(rt);
    }
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_evaluateJavaScriptNative(JNIEnv *env, jclass clazz, jlong js_context, jstring script, jstring scriptId) {
    auto jsContext = QJS_CONTEXT(js_context);
    if (jsContext == nullptr) {
        return -1;
    }

    const char* charScript = env->GetStringUTFChars(script, nullptr);
    const char* charScriptId = env->GetStringUTFChars(scriptId, nullptr);

    JSValue value = JS_Eval(
            jsContext,
            charScript, strlen(charScript),
            charScriptId, JS_EVAL_TYPE_GLOBAL);

    // 处理Promise等异步任务的消息队列
    processJsAsyncTasksLoop(jsContext);

    env->ReleaseStringUTFChars(script, charScript);
    env->ReleaseStringUTFChars(script, charScriptId);

    reportExceptionIfNeed(jsContext);

    return QJS_VALUE_PTR(value);
}
//
// Created by maxiee on 2019-08-05.
//
#include <jni.h>
#include <quickjs.h>
#include "TypeConvertor.h"
#include "QuickJSCache.h"
#include "PromiseProcessor.h"
#include "HummerJNI.h"
#include "JSException.h"
#include "HummerClassRegister.h"

// 单线程共用
thread_local JSRuntime *runtime;
thread_local int ctxCount = 0;

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_createJSContextNative(JNIEnv *env, jclass clazz) {
    if (ctxCount == 0) {
        runtime = JS_NewRuntime();
    }
    JSContext *ctx = JS_NewContext(runtime);
    // 在创建完JSRuntime后第一时间注册自定义Class，是为了使所有JSRuntime公用一个classId，不被相互覆盖
    HummerClassRegister::init(runtime, ctx);
    ctxCount++;
    return QJS_CONTEXT_ID(ctx);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_destroyJSContextNative(JNIEnv *env, jclass clazz, jlong js_context) {
    auto context = QJS_CONTEXT(js_context);
    QJS_CONTEXT_REMOVE(js_context);
    if (context != nullptr) {
        JS_FreeContext(context);
    }
    if (ctxCount > 0) {
        ctxCount--;
        if (ctxCount == 0) {
            JS_FreeRuntime(runtime);
        }
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

extern "C"
JNIEXPORT jbyteArray JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_compileJavaScriptNative(JNIEnv *env, jclass clazz, jlong js_context, jstring script, jstring scriptId) {
    auto jsContext = QJS_CONTEXT(js_context);
    if (jsContext == nullptr) {
        return nullptr;
    }

    const char* charScript = env->GetStringUTFChars(script, nullptr);
    const char* charScriptId = env->GetStringUTFChars(scriptId, nullptr);

    JSValue value = JS_Eval(
            jsContext,
            charScript, strlen(charScript),
            charScriptId, JS_EVAL_FLAG_COMPILE_ONLY);

    size_t out_buf_len;
    uint8_t *out_buf = JS_WriteObject(jsContext, &out_buf_len, value, JS_WRITE_OBJ_BYTECODE);

    env->ReleaseStringUTFChars(script, charScript);
    env->ReleaseStringUTFChars(script, charScriptId);

    reportExceptionIfNeed(jsContext);

    if (!out_buf) {
        return nullptr;
    }

    jbyteArray ret = env->NewByteArray((jsize) out_buf_len);
    env->SetByteArrayRegion(ret, 0, (jsize) out_buf_len, reinterpret_cast<const jbyte*>(out_buf));
    js_free(jsContext, out_buf);

    return ret;
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_evaluateBytecodeNative(JNIEnv *env, jclass clazz, jlong js_context, jbyteArray bytecode) {
    auto jsContext = QJS_CONTEXT(js_context);
    if (jsContext == nullptr) {
        return -1;
    }

    jsize buf_len = env->GetArrayLength(bytecode);
    auto *buf = (jbyte *) malloc(sizeof(jbyte) * buf_len);
    memset(buf, 0, sizeof(jbyte) * buf_len);

    env->GetByteArrayRegion(bytecode, 0, buf_len, buf);

    JSValue jsValue = JS_ReadObject(jsContext, (uint8_t *) buf, buf_len, JS_READ_OBJ_BYTECODE);

    free(buf);

    JSValue ret = JS_EvalFunction(jsContext, jsValue);

    // 处理Promise等异步任务的消息队列
    processJsAsyncTasksLoop(jsContext);

    reportExceptionIfNeed(jsContext);

    return QJS_VALUE_PTR(ret);
}
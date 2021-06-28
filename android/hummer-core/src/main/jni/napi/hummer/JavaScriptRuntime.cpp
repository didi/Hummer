//
// Created by XiaoFeng on 2021/6/22.
//

#include <jni.h>
#include <HummerJNI.h>
#include <JSUtils.h>
#include <JSException.h>
#include <js_native_api.h>
#include <HummerClassRegister.h>

NAPIHandleScope handleScope;

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_createJSContextNative(JNIEnv *env, jclass clazz) {
    NAPIEnv globalEnv;
    NAPIStatus status = NAPICreateEnv(&globalEnv);

    napi_open_handle_scope(globalEnv, &handleScope);

    // 在创建完JSRuntime后第一时间注册自定义Class，是为了使所有JSRuntime公用一个classId，不被相互覆盖
    HummerClassRegister::init(globalEnv);

    return JSUtils::toJsContextPtr(globalEnv);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_destroyJSContextNative(JNIEnv *env, jclass clazz, jlong js_context) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    JSUtils::removeJSContext(js_context);
    napi_close_handle_scope(globalEnv, handleScope);
    NAPIFreeEnv(globalEnv);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_evaluateJavaScriptNative(JNIEnv *env, jclass clazz, jlong js_context, jstring script, jstring scriptId) {
    const char* charScript = env->GetStringUTFChars(script, nullptr);
    const char* charScriptId = env->GetStringUTFChars(scriptId, nullptr);

    auto globalEnv = JSUtils::toJsContext(js_context);

    NAPIValue result;
    NAPIStatus status = NAPIRunScript(globalEnv, charScript, charScriptId, &result);
    LOGD("eval status: %d", status);

    if (status == NAPIPendingException) {
        reportExceptionIfNeed(globalEnv);
    }

    env->ReleaseStringUTFChars(script, charScript);
    env->ReleaseStringUTFChars(script, charScriptId);

    return JSUtils::toJsValuePtr(globalEnv, result);
}
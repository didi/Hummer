//
// Created by XiaoFeng on 2020-08-11.
//
#include <jni.h>
#include "HummerJNI.h"
#include "HermesCache.h"
#include "JSException.h"
#include <RuntimeConfig.h>
#include <hermes.h>
#include <jsi.h>
#include <memory>

using namespace facebook::hermes;
using namespace facebook::hermes::debugger;
using namespace facebook::jsi;

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_createJSContextNative(JNIEnv *env, jclass clazz) {
    std::shared_ptr<HermesRuntime> runtime = makeHermesRuntime();
    return RUNTIME_ID(runtime);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_destroyJSContextNative(JNIEnv *env, jclass clazz, jlong runtimeId) {
    RUNTIME_REMOVE(runtimeId);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_JavaScriptRuntime_evaluateJavaScriptNative(JNIEnv *env, jclass clazz, jlong runtimeId, jstring script, jstring scriptId) {
    auto runtime = RUNTIME(runtimeId);
    if (runtime == nullptr) {
        return -1;
    }

    const char* charScript = env->GetStringUTFChars(script, nullptr);
    const char* charScriptId = env->GetStringUTFChars(scriptId, nullptr);

    Value ret;
    try {
        ret = runtime->evaluateJavaScript(std::make_unique<StringBuffer>(charScript), charScriptId);
    } catch (const facebook::jsi::JSIException &err) {
        reportException(runtime, err.what());
    } catch (const JSError &error) {
        reportException(runtime, error.what());
    } catch (const std::exception &ex) {
        reportException(runtime, ex.what());
    }

    env->ReleaseStringUTFChars(script, charScript);
    env->ReleaseStringUTFChars(script, charScriptId);

    return VALUE_ID(ret);
}
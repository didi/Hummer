//
// Created by XiaoFeng on 2021/6/22.
//

#include <jni.h>
#include "../include/HummerJNI.h"
#include "../include/JSUtils.h"
#include "../include/JSException.h"

jobject callback;

void reportExceptionIfNeed(NAPIEnv globalEnv) {
    std::string strErr;

    NAPIValue error;
    auto status1 = napi_get_and_clear_last_exception(globalEnv, &error);
    if (status1 != NAPIErrorOK) {
        return;
    }

    const char *err = nullptr;
    NAPIValue errValue;
    auto status2 = napi_coerce_to_string(globalEnv, error, &errValue);
    if (status2 == NAPIExceptionOK) {
        err = JSUtils::toCString(globalEnv, errValue);
    }
    if (err) {
        strErr.append(err);
    }

    const char *stack = nullptr;
    NAPIValue stackValue;
    auto status3 = napi_get_named_property(globalEnv, error, "stack", &stackValue);
    if (status3 == NAPIExceptionOK) {
        stack = JSUtils::toCString(globalEnv, stackValue);
    }
    if (stack) {
        strErr.append("\n").append(stack);
    }

    if (strErr.length() > 0 && callback) {
        JNIEnv *env = JNI_GetEnv();
        jclass javaClass = env->GetObjectClass(callback);
        jmethodID onException = env->GetMethodID(
                javaClass,
                "onException",
                "(JLjava/lang/String;)V");

        jstring errMsg = env->NewStringUTF(strErr.c_str());
        env->CallVoidMethod(callback, onException, JSUtils::toJsContextPtr(globalEnv), errMsg);

        env->DeleteLocalRef(errMsg);
        env->DeleteLocalRef(javaClass);
        JNI_DetachEnv();
    }

    JSUtils::freeCString(globalEnv, err);
    JSUtils::freeCString(globalEnv, stack);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSException_init(JNIEnv *env, jclass clazz, jobject jcallback) {
    //生成一个全局引用，回调的时候findclass才不会为null
    callback = env->NewGlobalRef(jcallback);
}
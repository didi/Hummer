//
// Created by XiaoFeng on 2021/6/22.
//

#include <jni.h>
#include <HummerJNI.h>
#include <JSUtils.h>
#include <JSException.h>

jobject callback;

void reportExceptionIfNeed(NAPIEnv globalEnv) {
    std::string strErr;

    NAPIValue error;
    NAPIStatus status = napi_get_and_clear_last_exception(globalEnv, &error);
    if (status != NAPIOK) {
        return;
    }

    const char *err = nullptr;
    NAPIValue errValue;
    status = napi_coerce_to_string(globalEnv, error, &errValue);
    if (status == NAPIOK) {
        err = JSUtils::toCString(globalEnv, errValue);
    }
    if (err) {
        strErr.append(err);
    }

    const char *stack = nullptr;
    NAPIValue stackValue;
    status = napi_get_named_property(globalEnv, error, "stack", &stackValue);
    if (status == NAPIOK) {
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
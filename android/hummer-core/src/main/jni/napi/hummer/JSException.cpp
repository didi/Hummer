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
    napi_get_and_clear_last_exception(globalEnv, &error);
    NAPIValue errValue;
    napi_coerce_to_string(globalEnv, error, &errValue);
    const char *err = JSUtils::toCString(globalEnv, errValue);
    LOGE("eval error: %s", err);
    if (err) {
        strErr.append(err);
    }

    NAPIValue stackValue;
    napi_get_named_property(globalEnv, error, "stack", &stackValue);
    const char *stack = JSUtils::toCString(globalEnv, stackValue);
    LOGE("eval stack: %s", stack);
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
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerException_initJSException(JNIEnv *env, jclass clazz, jobject jcallback) {
    //生成一个全局引用，回调的时候findclass才不会为null
//    callback = env->NewGlobalRef(jcallback);
}
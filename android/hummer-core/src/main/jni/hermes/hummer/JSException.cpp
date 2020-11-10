//
// Created by XiaoFeng on 2020-08-21.
//

#include "JSException.h"
#include "HermesCache.h"

jobject callback;

void reportException(std::shared_ptr<HermesRuntime> runtime, const char* exception) {
    if (exception && callback) {
        JNIEnv *env = JNI_GetEnv();
        jclass javaClass = env->GetObjectClass(callback);
        jmethodID onException = env->GetMethodID(
                javaClass,
                "onException",
                "(JLjava/lang/String;)V");

        std::string e;
        e.assign(exception).append("\n");

        jstring errMsg = env->NewStringUTF(e.c_str());
        env->CallVoidMethod(callback, onException, (jlong) RUNTIME_ID(runtime), errMsg);

        env->DeleteLocalRef(errMsg);
        env->DeleteLocalRef(javaClass);
        JNI_DetachEnv();
    }
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerException_initJSException(JNIEnv *env, jclass clazz, jobject jcallback) {
    //生成一个全局引用，回调的时候findclass才不会为null
    callback = env->NewGlobalRef(jcallback);
}
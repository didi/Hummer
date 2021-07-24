//
// Created by XiaoFeng on 2019-09-26.
//

#include <JSException.h>
#include <QuickJSCache.h>

jobject callback;

void reportExceptionIfNeed(JSContext *context) {
    std::string strErr;
    JSValue exceptions = JS_GetException(context);
    if (JS_IsError(context, exceptions)) {
        const char* err = JS_ToCString(context, exceptions);
        if (err) {
            strErr.append(err);
        }
        auto stack = JS_GetPropertyStr(context, exceptions, "stack");
        if (JS_IsString(stack)) {
            const char* st = JS_ToCString(context, stack);
            if (st) {
                strErr.append("\n").append(st);
            }
        }
    }

    if (strErr.length() > 0 && callback) {
        JNIEnv *env = JNI_GetEnv();
        jclass javaClass = env->GetObjectClass(callback);
        jmethodID onException = env->GetMethodID(
                javaClass,
                "onException",
                "(JLjava/lang/String;)V");

        jstring errMsg = env->NewStringUTF(strErr.c_str());
        env->CallVoidMethod(callback, onException, (jlong) QJS_CONTEXT_ID(context), errMsg);

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
//
// Created by didi on 2024/4/11.
//

#include <jni.h>
#include "FalconEngine.h"
#include "FalconContext.h"
#include "HummerBridge.h"
#include "falcon/logger.h"


static jclass J_FalconContext;
static jmethodID J_MethodID_printNativeLog;
static jmethodID J_MethodID_printJsLog;
static jmethodID J_MethodID_onCatchJsException;
static jmethodID J_MethodID_onTraceEvent;
static jmethodID J_MethodID_onContextStateChanged;
static jmethodID J_MethodID_onReceivePageLifeCycle;
static jmethodID J_MethodID_onJavaScriptCallback;

void FalconContext::init(JavaVM *vm, JNIEnv *env) {

    J_FalconContext = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/falcon/FalconContext"));

    J_MethodID_printNativeLog = env->GetMethodID(J_FalconContext, "printNativeLog", "(ILjava/lang/String;)V");
    J_MethodID_printJsLog = env->GetMethodID(J_FalconContext, "printJsLog", "(ILjava/lang/String;)V");
    J_MethodID_onCatchJsException = env->GetMethodID(J_FalconContext, "onCatchJsException", "(Ljava/lang/String;)V");
    J_MethodID_onTraceEvent = env->GetMethodID(J_FalconContext, "onTraceEvent", "(Ljava/lang/String;Ljava/lang/Object;)V");
    J_MethodID_onContextStateChanged = env->GetMethodID(J_FalconContext, "onContextStateChanged", "(I)V");
    J_MethodID_onReceivePageLifeCycle = env->GetMethodID(J_FalconContext, "onReceivePageLifeCycle", "(I)V");
    J_MethodID_onJavaScriptCallback = env->GetMethodID(J_FalconContext, "onJavaScriptCallback", "(JILjava/lang/String;Ljava/lang/Object;)V");
}


void FalconContext::printNativeLog(jobject context, int level, string value) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jstring msg = jniEnv->NewStringUTF(value.c_str());
    jniEnv->CallVoidMethod(context, J_MethodID_printNativeLog, level, msg);
    jniEnv->DeleteLocalRef(msg);
    clearException(jniEnv);
}

void FalconContext::printJsLog(jobject context, int level, string value) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jstring msg = jniEnv->NewStringUTF(value.c_str());
    jniEnv->CallVoidMethod(context, J_MethodID_printJsLog, level, msg);
    jniEnv->DeleteLocalRef(msg);
    clearException(jniEnv);
}

void FalconContext::onCatchJsException(jobject context, string value) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jstring msg = jniEnv->NewStringUTF(value.c_str());
    jniEnv->CallVoidMethod(context, J_MethodID_onCatchJsException, msg);
    jniEnv->DeleteLocalRef(msg);
    clearException(jniEnv);
}

void FalconContext::onTraceEvent(jobject context, string event, JsiValue *value) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jstring msg = jniEnv->NewStringUTF(event.c_str());
    jniEnv->CallVoidMethod(context, J_MethodID_onTraceEvent, msg, value2JObject(jniEnv, value));
    jniEnv->DeleteLocalRef(msg);
    clearException(jniEnv);
}

void FalconContext::onContextStateChanged(jobject context, jint state) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jniEnv->CallVoidMethod(context, J_MethodID_onContextStateChanged, state);
    clearException(jniEnv);

}

void FalconContext::onContextRelease(jobject context) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jniEnv->DeleteGlobalRef(context);
}

void FalconContext::onReceivePageLifeCycle(jobject context, jint event) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jniEnv->CallVoidMethod(context, J_MethodID_onReceivePageLifeCycle, event);
    clearException(jniEnv);
}

void FalconContext::onJavaScriptCallback(jobject context, jlong callbackId, int status, string const &message, JsiValue *jsiValue) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jstring msg = jniEnv->NewStringUTF(message.c_str());
    jniEnv->CallVoidMethod(context, J_MethodID_onJavaScriptCallback, callbackId, status, msg, value2JObject(jniEnv, jsiValue));
    jniEnv->DeleteLocalRef(msg);
    clearException(jniEnv);
}

void FalconContext::clearException(JNIEnv *env) {
    // 检查并处理异常
    jthrowable exception = env->ExceptionOccurred();
    if (exception != NULL) {
        env->ExceptionDescribe();
        env->ExceptionClear(); // 清除异常
        warn("FalconEngine:: %s", "已清除异常");
    }
}


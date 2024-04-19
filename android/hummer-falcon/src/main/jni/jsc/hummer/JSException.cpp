//
// Created by XiaoFeng on 2019-09-26.
//

#include "JSException.h"

jobject callback;

void reportException(JSContextRef jsContext, JSValueRef exception) {
    if (exception == nullptr) return;

    JSStringRef strMsgRef = JSValueToStringCopy(jsContext, exception, nullptr);
    char* message = TypeConvertor::JSString2CharArray(jsContext, strMsgRef);

    JSObjectRef exceptionObj = const_cast<JSObjectRef>(exception);

    JSStringRef stackKey = JSStringCreateWithUTF8CString("stack");
    JSValueRef stackRef = JSObjectGetProperty(jsContext, exceptionObj, stackKey, nullptr);
    JSStringRef strStackRef = JSValueToStringCopy(jsContext, stackRef, nullptr);
    char* stack = TypeConvertor::JSString2CharArray(jsContext, strStackRef);

    JSStringRef lineKey = JSStringCreateWithUTF8CString("line");
    JSValueRef lineRef = JSObjectGetProperty(jsContext, exceptionObj, lineKey, nullptr);
    JSStringRef strLineRef = JSValueToStringCopy(jsContext, lineRef, nullptr);
    char* line = TypeConvertor::JSString2CharArray(jsContext, strLineRef);

    JSStringRef columnKey = JSStringCreateWithUTF8CString("column");
    JSValueRef columnRef = JSObjectGetProperty(jsContext, exceptionObj, columnKey, nullptr);
    JSStringRef strColumnRef = JSValueToStringCopy(jsContext, columnRef, nullptr);
    char* column = TypeConvertor::JSString2CharArray(jsContext, strColumnRef);

    std::string e;
    e.assign(message).append("\n");
    e.append(stack).append("\n");
    e.append("at line: ").append(line).append(", column: ").append(column).append("\n");
//    LOGE("[JSException]: %s", e.c_str());

    if (callback) {
        JNIEnv *env = JNI_GetEnv();
        jclass javaClass = env->GetObjectClass(callback);
        jmethodID onException = env->GetMethodID(
                javaClass,
                "onException",
                "(JLjava/lang/String;)V");

        JSStringRef errRef = JSStringCreateWithUTF8CString(e.c_str());
        jstring errMsg = TypeConvertor::JSString2JavaString(jsContext, errRef);
        env->CallVoidMethod(callback, onException, (jlong) jsContext, errMsg);

        JSStringRelease(errRef);
        env->DeleteLocalRef(errMsg);
        env->DeleteLocalRef(javaClass);
        JNI_DetachEnv();
    }

    JSStringRelease(stackKey);
    JSStringRelease(lineKey);
    JSStringRelease(columnKey);
    JSStringRelease(strMsgRef);
    JSStringRelease(strStackRef);
    JSStringRelease(strLineRef);
    JSStringRelease(strColumnRef);
    delete[] message;
    delete[] stack;
    delete[] column;
    delete[] line;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerException_initJSException(JNIEnv *env, jclass clazz, jobject jcallback) {
    //生成一个全局引用，回调的时候findclass才不会为null
    callback = env->NewGlobalRef(jcallback);
}
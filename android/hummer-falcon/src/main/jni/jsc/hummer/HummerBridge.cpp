//
// Created by maxiee on 2019-08-05.
//

#include <jni.h>
#include <map>
#include "../JavaScriptCore/include/JavaScript.h"
#include "HummerJNI.h"
#include "TypeConvertor.h"

static std::map<long, jobject> HUMMER_BRIDGE_MAP;
static jmethodID HUMMER_BRIDGE_INVOKE_ID = nullptr;

static int INDEX_CLASS_NAME = 0;
static int INDEX_OBJECT_ID = 1;
static int INDEX_METHOD_NAME = 2;
static JSValueRef invoke(JSContextRef ctx, JSObjectRef function, JSObjectRef thisObject,
        size_t argumentCount, const JSValueRef arguments[], JSValueRef* exception) {

    if (exception) reportException(ctx, *exception);

    JSGlobalContextRef ctxRef = JSContextGetGlobalContext(ctx);
    jobject bridge = HUMMER_BRIDGE_MAP[(long) ctxRef];
    if (bridge == nullptr) return nullptr;

    JNIEnv* env = JNI_GetEnv();

    jlongArray params = nullptr;
    if (argumentCount > 3) {
        int methodParamsCount = argumentCount - 3;
        params = env->NewLongArray(methodParamsCount);
        jlong paramsC[methodParamsCount];
        for (int i = 3; i < argumentCount; i++) {
            paramsC[i - 3] = (jlong) arguments[i];
        }
        env->SetLongArrayRegion(params, 0, methodParamsCount, paramsC);
    }

    jstring className = TypeConvertor::JSString2JavaString(ctx,JSValueToStringCopy(ctx, arguments[INDEX_CLASS_NAME], nullptr));
    jstring methodName = TypeConvertor::JSString2JavaString(ctx, JSValueToStringCopy(ctx, arguments[INDEX_METHOD_NAME], nullptr));
    jlong objId = (jlong) JSValueToNumber(ctx, arguments[INDEX_OBJECT_ID], nullptr);

    jlong ret = env->CallLongMethod(
        bridge, HUMMER_BRIDGE_INVOKE_ID,
        className,
        objId,
        methodName,
        params);

    env->DeleteLocalRef(className);
    env->DeleteLocalRef(methodName);
    env->DeleteLocalRef(params);

    JNI_DetachEnv();

    if (ret == -1) return nullptr;

    return reinterpret_cast<JSValueRef>(ret);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerBridge_initHummerBridge(JNIEnv *env, jobject thiz, jlong js_context) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    jobject bridge = env->NewGlobalRef(thiz);

    JSGlobalContextRef ctxRef = JSContextGetGlobalContext(jsContext);
    HUMMER_BRIDGE_MAP[(long) ctxRef] = bridge;

    jclass javaClass = env->GetObjectClass(thiz);
    HUMMER_BRIDGE_INVOKE_ID = env->GetMethodID(
            javaClass,
            "invoke",
            "(Ljava/lang/String;JLjava/lang/String;[J)J");

    JSStringRef name = JSStringCreateWithUTF8CString("invoke");
    auto invokeFunc = JSObjectMakeFunctionWithCallback(jsContext, name, invoke);

    JSValueRef exception = nullptr;
    JSStringRef propertyName = JSStringCreateWithUTF8CString("invoke");
    JSObjectSetProperty(
            jsContext,
            JSContextGetGlobalObject(jsContext),
            propertyName,
            invokeFunc,
            0, &exception);
    if (exception) reportException(jsContext, exception);

    JSStringRelease(name);
    JSStringRelease(propertyName);
    env->DeleteLocalRef(javaClass);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerBridge_releaseHummerBridge(JNIEnv *env, jobject thiz, jlong js_context) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    JSGlobalContextRef ctxRef = JSContextGetGlobalContext(jsContext);
    HUMMER_BRIDGE_MAP.erase((long) ctxRef);
}
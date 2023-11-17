//
// Created by XiaoFeng on 2021/6/24.
//

#ifndef ANDROID_JSUTILS_H
#define ANDROID_JSUTILS_H

#include <jni.h>
#include <map>
#include <js_native_api.h>

class JSUtils {

public:
    static jclass numberCls;
    static jclass doubleCls;
    static jclass booleanCls;
    static jclass stringCls;
    static jclass objectCls;
    static jmethodID doubleInitMethodID;
    static jmethodID booleanInitMethodID;
    static jmethodID doubleValueMethodID;
    static jmethodID booleanValueMethodID;

    static jclass jsValueCls;
    static jclass jsCallbackCls;
    static jmethodID jsValueInitMethodID;
    static jmethodID jsCallbackInitMethodID;
    static jfieldID js_value_ptr;

    static jclass jsExceptionCls;
    static jmethodID jsExceptionInitMethodID;

    static jclass jsEngineCls;
    static jmethodID toJsonStringMethodID;
    static jmethodID callJavaCallbackMethodID;
    static jmethodID callJavaRecyclerMethodID;

    static void init(JNIEnv *env);

    static NAPIEnv toJsContext(int64_t envPtr);
    static int64_t toJsContextPtr(NAPIEnv env);
    static void removeJSContext(int64_t envPtr);

    static void addHandleScope(int64_t envPtr, NAPIHandleScope scope);
    static NAPIHandleScope getHandleScope(int64_t envPtr);
    static void removeHandleScope(int64_t envPtr);

    static NAPIRef toJsValueRef(int64_t valuePtr);
    static int64_t toJsValuePtr(NAPIRef valueRef);
    static int64_t toJsValuePtr(NAPIEnv env, NAPIValue value);
    static int64_t toJsValuePtr(NAPIEnv env, NAPIValue value, bool isStrongRef);
    static NAPIValue toJsValue(NAPIEnv env, int64_t valuePtr);
    static NAPIValue getJsValueFromRef(NAPIEnv env, NAPIRef valueRef);
    static NAPIRef createJsValueRef(NAPIEnv env, NAPIValue value, bool isStrongRef);

    static const char *toCString(NAPIEnv env, NAPIValue value);
    static void freeCString(NAPIEnv env, const char *cString);
    static jstring toJavaString(NAPIEnv env, NAPIValue value);

    static NAPIValue createJsGlobal(NAPIEnv env);
    static NAPIValue createJsNull(NAPIEnv env);
    static NAPIValue createJsUndefined(NAPIEnv env);

    static jobject JsValueToJavaObject(NAPIEnv env, NAPIValue value);
    static jobject JsValueToJavaObject(NAPIEnv env, NAPIValue value, bool isStrongRef);
    static NAPIValue JavaObjectToJsValue(NAPIEnv globalEnv, jobject value);

    static bool isJSValueValid(NAPIEnv env, NAPIValue value);
    static bool isJSValueValid(NAPIEnv env, NAPIRef valueRef);
    static bool isJSValueEqual(NAPIEnv env, NAPIValue valueLeft, NAPIValue valueRight);
    static bool isJSValueEqual(NAPIEnv env, NAPIRef valueRefLeft, NAPIRef valueRight);

    static void printDumpReferenceTables(JNIEnv *env);

private:
    static int64_t jsContextId;
    static std::map<int64_t, NAPIEnv> jsContextIdMap;
    static std::map<int64_t, NAPIHandleScope> handleScopeMap;
};


#endif //ANDROID_JSUTILS_H

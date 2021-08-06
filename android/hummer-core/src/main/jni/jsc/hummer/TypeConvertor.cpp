//
// Created by maxiee on 2019-08-05.
//

#include "TypeConvertor.h"

jstring TypeConvertor::JSString2JavaString(JSContextRef ctx, JSStringRef value) {
    size_t len = JSStringGetMaximumUTF8CStringSize(value);
    auto chars = new char[len];
    JNIEnv* env = JNI_GetEnv();
    JSStringGetUTF8CString(value, chars, len);
    jstring ret = env->NewStringUTF(chars);
    delete[] chars;
    return ret;
}

char *TypeConvertor::JSString2CharArray(JSContextRef ctx, JSStringRef value) {
    size_t len = JSStringGetMaximumUTF8CStringSize(value);
    auto chars = new char[len];
    JSStringGetUTF8CString(value, chars, len);
    return chars;
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeNumber(JNIEnv *env, jclass clazz, jlong js_context, jdouble value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    return (long) JSValueMakeNumber(jsContext, value);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeBoolean(JNIEnv *env, jclass clazz, jlong js_context, jboolean value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    return (long) JSValueMakeBoolean(jsContext, value);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeString(JNIEnv *env, jclass clazz, jlong js_context, jstring string) {
    if (string == nullptr) {
        return 0;
    }

    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    const char *cString = env->GetStringUTFChars(string, nullptr);
    JSStringRef keyRef = JSStringCreateWithUTF8CString(cString);

    JSValueRef ret = JSValueMakeString(jsContext, keyRef);

    JSStringRelease(keyRef);
    env->ReleaseStringUTFChars(string, cString);
    return (long) ret;
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeFromJsonString(JNIEnv *env, jclass clazz, jlong js_context, jstring json_string) {
    if (json_string == nullptr) {
        return 0;
    }

    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    const char *cString = env->GetStringUTFChars(json_string, nullptr);
    JSStringRef jsonString = JSStringCreateWithUTF8CString(cString);

    JSValueRef ret = JSValueMakeFromJSONString(jsContext, jsonString);

    env->ReleaseStringUTFChars(json_string, cString);
    JSStringRelease(jsonString);

    return (long) ret;
}

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2Double(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSValueRef>(js_value);

    JSValueRef exception = nullptr;
    double ret = JSValueToNumber(jsContext, jsValue, &exception);
    if (exception) reportException(jsContext, exception);

    return ret;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2Boolean(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSValueRef>(js_value);
    return static_cast<jboolean>(JSValueToBoolean(jsContext, jsValue));
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2String(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSValueRef>(js_value);

    JSValueRef exception = nullptr;
    JSStringRef strRef = JSValueToStringCopy(jsContext, jsValue, &exception);
    jstring str = TypeConvertor::JSString2JavaString(jsContext, strRef);
    if (exception) reportException(jsContext, exception);

    JSStringRelease(strRef);
    return str;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSNumber(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSValueRef>(js_value);
    return (jboolean) (jsContext != nullptr && JSValueIsNumber(jsContext, jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSBoolean(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSValueRef>(js_value);
    return (jboolean) (jsContext != nullptr && JSValueIsBoolean(jsContext, jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSString(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSValueRef>(js_value);
    return (jboolean) (jsContext != nullptr && JSValueIsString(jsContext, jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSFunction(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSObjectRef>(js_value);
    return (jboolean) (jsContext != nullptr && JSObjectIsFunction(jsContext, jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSNull(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSObjectRef>(js_value);
    return (jboolean) (jsContext == nullptr || JSValueIsNull(jsContext, jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSUndefined(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSObjectRef>(js_value);
    return (jboolean) (jsContext == nullptr || JSValueIsUndefined(jsContext, jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSContextValid(JNIEnv *env, jclass clazz, jlong js_context) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    return JSCCache::findJSContextRef(jsContext) && static_cast<jboolean>(jsContext != nullptr);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSValueValid(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSObjectRef>(js_value);
    return JSCCache::findJSContextRef(jsContext) && static_cast<jboolean>(jsContext != nullptr && !JSValueIsNull(jsContext, jsValue) && !JSValueIsUndefined(jsContext, jsValue));
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSFunctionCall(JNIEnv *env, jclass clazz, jlong js_context, jlong thisObj, jlong funcObj, jlongArray js_value_pointers) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsThisObj = thisObj == -1 ? nullptr : reinterpret_cast<JSObjectRef>(thisObj);
    auto jsFuncObj = funcObj == -1 ? nullptr : reinterpret_cast<JSObjectRef>(funcObj);
    auto paramsCount = static_cast<size_t>(env->GetArrayLength(js_value_pointers));

    if (jsContext == nullptr || JSValueIsUndefined(jsContext, jsFuncObj) || JSValueIsNull(jsContext, jsFuncObj)) {
        return 0;
    }

    auto paramsPointers = env->GetLongArrayElements(js_value_pointers, nullptr);
    auto params = new JSValueRef[paramsCount];
    for (int i = 0; i < paramsCount; i++) {
        params[i] = paramsPointers[i] == -1 ? nullptr : reinterpret_cast<JSValueRef>(paramsPointers[i]);
    }
    JSValueRef exception = nullptr;
    JSValueRef ret = JSObjectCallAsFunction(
            jsContext, jsFuncObj, jsThisObj,
            paramsCount, params, &exception);
    if (exception) reportException(jsContext, exception);

    env->ReleaseLongArrayElements(js_value_pointers, paramsPointers, 0);
    return (long) ret;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueSetProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key, jlong valuePointer) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto object = js_object == -1 ? nullptr : reinterpret_cast<JSObjectRef>(js_object);
    auto value = reinterpret_cast<JSValueRef>(valuePointer);

    // 如果object为空，说明是全局Context下的属性
    if (object == nullptr) {
        object = JSContextGetGlobalObject(jsContext);
    }

    const char *cString = env->GetStringUTFChars(key, nullptr);
    JSStringRef keyRef = JSStringCreateWithUTF8CString(cString);

    JSValueRef exception = nullptr;
    JSObjectSetProperty(jsContext, object, keyRef, value, 0, &exception);
    if (exception) reportException(jsContext, exception);

    JSStringRelease(keyRef);
    env->ReleaseStringUTFChars(key, cString);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueGetProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto object = js_object == -1 ? nullptr : reinterpret_cast<JSObjectRef>(js_object);

    // 如果object为空，说明是全局Context下的属性
    if (object == nullptr) {
        object = JSContextGetGlobalObject(jsContext);
    }

    const char *cString = env->GetStringUTFChars(key, nullptr);
    JSStringRef keyRef = JSStringCreateWithUTF8CString(cString);

    JSValueRef exception = nullptr;
    long ret = (long)JSObjectGetProperty(jsContext, object, keyRef, &exception);
    if (exception) reportException(jsContext, exception);

    JSStringRelease(keyRef);
    env->ReleaseStringUTFChars(key, cString);
    return ret;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueDelProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto object = js_object == -1 ? nullptr : reinterpret_cast<JSObjectRef>(js_object);

    // 如果object为空，说明是全局Context下的属性
    if (object == nullptr) {
        object = JSContextGetGlobalObject(jsContext);
    }

    const char *cString = env->GetStringUTFChars(key, nullptr);
    JSStringRef keyRef = JSStringCreateWithUTF8CString(cString);

    JSValueRef exception = nullptr;
    auto ret = (jboolean) JSObjectDeleteProperty(jsContext, object, keyRef, &exception);
    if (exception) reportException(jsContext, exception);

    JSStringRelease(keyRef);
    env->ReleaseStringUTFChars(key, cString);
    return ret;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueProtect(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    auto jsValue = reinterpret_cast<JSValueRef>(js_value);
    JSValueProtect(jsContext, jsValue);
}


extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueUnProtect(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = reinterpret_cast<JSContextRef>(js_context);
    if (!JSCCache::findJSContextRef(jsContext)) {
        return;
    }
    auto jsValue = reinterpret_cast<JSValueRef>(js_value);
    JSValueUnprotect(jsContext, jsValue);
}

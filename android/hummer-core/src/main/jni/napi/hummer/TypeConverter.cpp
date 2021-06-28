//
// Created by XiaoFeng on 2021/6/22.
//

#include <jni.h>
#include <JSUtils.h>
#include <HummerJNI.h>
#include <JSException.h>

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeNumber(JNIEnv *env, jclass clazz, jlong js_context, jdouble value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    NAPIValue ret;
    napi_create_double(globalEnv, value, &ret);
    return JSUtils::toJsValuePtr(globalEnv, ret);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeBoolean(JNIEnv *env, jclass clazz, jlong js_context, jboolean value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    NAPIValue ret;
    napi_get_boolean(globalEnv, value, &ret);
    return JSUtils::toJsValuePtr(globalEnv, ret);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeString(JNIEnv *env, jclass clazz, jlong js_context, jstring java_string) {
    if (java_string == nullptr) {
        return -1;
    }
    auto globalEnv = JSUtils::toJsContext(js_context);
    const char *cString = env->GetStringUTFChars(java_string, nullptr);
    NAPIValue ret;
    napi_create_string_utf8(globalEnv, cString, NAPI_AUTO_LENGTH, &ret);
    env->ReleaseStringUTFChars(java_string, cString);
    return JSUtils::toJsValuePtr(globalEnv, ret);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeFromJsonString(JNIEnv *env, jclass clazz, jlong js_context, jstring json_string) {
    if (json_string == nullptr) {
        return -1;
    }

    // TODO: jsonString咋实现？
    auto globalEnv = JSUtils::toJsContext(js_context);
    const char *cString = env->GetStringUTFChars(json_string, nullptr);
    NAPIValue ret;
    napi_create_string_utf8(globalEnv, cString, NAPI_AUTO_LENGTH, &ret);
    env->ReleaseStringUTFChars(json_string, cString);
    return JSUtils::toJsValuePtr(globalEnv, ret);
}

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2Double(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    double ret;
    napi_get_value_double(globalEnv, value, &ret);
    return ret;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2Boolean(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    bool ret;
    napi_get_value_bool(globalEnv, value, &ret);
    return ret;
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2String(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    jstring ret = JSUtils::toJavaString(globalEnv, value);
    return ret;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSNumber(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    NAPIValueType type;
    napi_typeof(globalEnv, value, &type);
    return type == NAPINumber;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSBoolean(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    NAPIValueType type;
    napi_typeof(globalEnv, value, &type);
    return type == NAPIBoolean;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSString(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    // value可能会被回收，回收就会变成null
    if (value == nullptr) {
        return false;
    }
    NAPIValueType type;
    napi_typeof(globalEnv, value, &type);
    return type == NAPIString;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSFunction(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    NAPIValueType type;
    napi_typeof(globalEnv, value, &type);
    return type == NAPIFunction;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSNull(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    if (value == nullptr){
        return true;
    }
    NAPIValueType type;
    napi_typeof(globalEnv, value, &type);
    return type == NAPINull;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSUndefined(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    if (value == nullptr){
        return true;
    }
    NAPIValueType type;
    napi_typeof(globalEnv, value, &type);
    return type == NAPIUndefined;
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSFunctionCall(JNIEnv *env, jclass clazz, jlong js_context, jlong thisObj, jlong funcObj, jlongArray js_values) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    NAPIValue jsThisObj = JSUtils::toJsValue(globalEnv, thisObj);
    LOGD("JSFunctionCall, jsThisObj = %p", jsThisObj);
    NAPIValue jsFuncObj = JSUtils::toJsValue(globalEnv, funcObj);
    LOGD("JSFunctionCall, jsFuncObj = %p", jsFuncObj);
    auto paramsCount = static_cast<int>(env->GetArrayLength(js_values));
    LOGD("JSFunctionCall, paramsCount = %d", paramsCount);

    auto paramsPtr = env->GetLongArrayElements(js_values, nullptr);
    auto params = new NAPIValue[paramsCount];
    for (int i = 0; i < paramsCount; i++) {
        params[i] = JSUtils::toJsValue(globalEnv, (long) paramsPtr[i]);
    }
    env->ReleaseLongArrayElements(js_values, paramsPtr, 0);

    // TODO: JSUtils::toJsValue 中直接变为 undefined
    if (jsThisObj == nullptr) {
        jsThisObj = JSUtils::createJsUndefined(globalEnv);
    }

    NAPIValue result;
    NAPIStatus status = napi_call_function(globalEnv, jsThisObj, jsFuncObj, paramsCount, params, &result);
    LOGD("JSFunctionCall, status = %d", status);
    LOGD("JSFunctionCall, result = %p", result);

    if (status == NAPIPendingException) {
        reportExceptionIfNeed(globalEnv);
    }

    if (status != NAPIOK) {
        return JSUtils::toJsValuePtr(globalEnv, JSUtils::createJsUndefined(globalEnv));
    }
    return JSUtils::toJsValuePtr(globalEnv, result);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSContextValid(JNIEnv *env, jclass clazz, jlong js_context) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    return static_cast<jboolean>(globalEnv != nullptr);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSValueValid(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    NAPIValueType type;
    napi_typeof(globalEnv, value, &type);
    return type != NAPIUndefined && type != NAPINull;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueSetProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    auto object = JSUtils::toJsValue(globalEnv, js_object);
    // 如果object为空，说明是全局Context下的属性
    if (object == nullptr) {
        napi_get_global(globalEnv, &object);
    }

    const char *cKey = env->GetStringUTFChars(key, nullptr);
    LOGD("JSValueSetProperty, key = %s", cKey);

    napi_set_named_property(globalEnv, object, cKey, value);

    env->ReleaseStringUTFChars(key, cKey);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueGetProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto object = JSUtils::toJsValue(globalEnv, js_object);
    // 如果object为空，说明是全局Context下的属性
    if (object == nullptr) {
        napi_get_global(globalEnv, &object);
    }

    const char *cKey = env->GetStringUTFChars(key, nullptr);
    LOGD("JSValueGetProperty, key = %s", cKey);

    NAPIValue ret;
    napi_get_named_property(globalEnv, object, cKey, &ret);

    env->ReleaseStringUTFChars(key, cKey);
    return JSUtils::toJsValuePtr(globalEnv, ret);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueDelProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto object = JSUtils::toJsValue(globalEnv, js_object);
    // 如果object为空，说明是全局Context下的属性
    if (object == nullptr) {
        napi_get_global(globalEnv, &object);
    }

    const char *cKey = env->GetStringUTFChars(key, nullptr);
    NAPIValue jsKey;
    napi_create_string_utf8(globalEnv, cKey, sizeof(cKey), &jsKey);

    bool ret;
    napi_delete_property(globalEnv, object, jsKey, &ret);

    env->ReleaseStringUTFChars(key, cKey);
    return ret;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueProtect(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto valueRef = JSUtils::toJsValueRef(js_value);
    napi_reference_ref(globalEnv, valueRef, nullptr);
}


extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueUnProtect(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    if (globalEnv == nullptr) {
        return;
    }
    auto valueRef = JSUtils::toJsValueRef(js_value);
    napi_delete_reference(globalEnv, valueRef);
}
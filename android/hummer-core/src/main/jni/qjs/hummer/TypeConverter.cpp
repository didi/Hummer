#include <jni.h>
#include <TypeConvertor.h>
#include <HummerJNI.h>
#include <QuickJSCache.h>
#include <JSException.h>
#include <PromiseProcessor.h>
#include <quickjs.h>
#include <cutils.h>


jstring TypeConvertor::JSString2JavaString(JSContext* ctx, JSValue value) {
    JNIEnv* env = JNI_GetEnv();
    if (JS_IsNull(value) || JS_IsUndefined(value)) {
        return env->NewStringUTF("");
    }
    jstring ret;
    const char* string = JS_ToCString(ctx, value);
    ret = env->NewStringUTF(string);
    JS_FreeCString(ctx, string);
    JNI_DetachEnv();
    return ret;
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeNumber(JNIEnv *env, jclass clazz, jlong js_context, jdouble value) {
    auto jsContext = QJS_CONTEXT(js_context);
    JSValue ret = JS_NewFloat64(jsContext, value);
    return QJS_VALUE_PTR(ret);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeBoolean(JNIEnv *env, jclass clazz, jlong js_context, jboolean value) {
    auto jsContext = QJS_CONTEXT(js_context);
    JSValue ret = JS_NewBool(jsContext, value);
    return QJS_VALUE_PTR(ret);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeString(JNIEnv *env, jclass clazz, jlong js_context, jstring java_string) {
    if (java_string == nullptr) {
        return -1;
    }
    auto jsContext = QJS_CONTEXT(js_context);
    const char *cString = env->GetStringUTFChars(java_string, nullptr);
    JSValue ret = JS_NewString(jsContext, cString);
    env->ReleaseStringUTFChars(java_string, cString);
    return QJS_VALUE_PTR(ret);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeFromJsonString(JNIEnv *env, jclass clazz, jlong js_context, jstring json_string) {
    if (json_string == nullptr) {
        return -1;
    }
    auto jsContext = QJS_CONTEXT(js_context);
    const char *cString = env->GetStringUTFChars(json_string, nullptr);
    JSValue ret = JS_ParseJSON(jsContext, cString, strlen(cString), "");
    env->ReleaseStringUTFChars(json_string, cString);
    return QJS_VALUE_PTR(ret);
}

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2Double(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = QJS_CONTEXT(js_context);
    auto jsValue = QJS_VALUE(js_value);
    double value;
    JS_ToFloat64(jsContext, &value, jsValue);
    return value;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2Boolean(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = QJS_CONTEXT(js_context);
    auto jsValue = QJS_VALUE(js_value);
    return static_cast<jboolean>(JS_ToBool(jsContext, jsValue));
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2String(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = QJS_CONTEXT(js_context);
    auto jsValue = QJS_VALUE(js_value);
    const char* string = JS_ToCString(jsContext, jsValue);
    jstring ret = env->NewStringUTF(string);
    JS_FreeCString(jsContext, string);
    return ret;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSNumber(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsValue = QJS_VALUE(js_value);
    return static_cast<jboolean>(JS_IsNumber(jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSBoolean(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsValue = QJS_VALUE(js_value);
    return static_cast<jboolean>(JS_IsBool(jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSString(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsValue = QJS_VALUE(js_value);
    return static_cast<jboolean>(JS_IsString(jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSFunction(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = QJS_CONTEXT(js_context);
    auto jsValue = QJS_VALUE(js_value);
    return static_cast<jboolean>(JS_IsFunction(jsContext, jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSNull(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsValue = QJS_VALUE(js_value);
    return static_cast<jboolean>(JS_IsNull(jsValue));
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSUndefined(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsValue = QJS_VALUE(js_value);
    return static_cast<jboolean>(JS_IsUndefined(jsValue));
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSFunctionCall(JNIEnv *env, jclass clazz, jlong js_context, jlong thisObj, jlong funcObj, jlongArray js_values) {
    auto jsContext = QJS_CONTEXT(js_context);
    auto jsThisObj = QJS_VALUE(thisObj);
    auto jsFuncObj = QJS_VALUE(funcObj);
    auto paramsCount = static_cast<int>(env->GetArrayLength(js_values));
    LOGD("JSFunctionCall, paramsCount = %d", paramsCount);

    if (jsContext == nullptr) {
        LOGD("JSFunctionCall, jsContext is null");
        return -1;
    }

    if (JS_IsUndefined(jsFuncObj) || JS_IsNull(jsFuncObj)) {
        LOGD("JSFunctionCall, jsFuncObj is undefined");
        return -1;
    }

    auto paramsPointers = env->GetLongArrayElements(js_values, nullptr);
    auto params = new JSValue[paramsCount];
    for (int i = 0; i < paramsCount; i++) {
        params[i] = QJS_VALUE(paramsPointers[i]);
    }
    JSValue ret = JS_Call(jsContext, jsFuncObj, jsThisObj, paramsCount, params);
    reportExceptionIfNeed(jsContext);

    // 处理Promise等异步任务的消息队列
    processJsAsyncTasksLoop(jsContext);

    env->ReleaseLongArrayElements(js_values, paramsPointers, 0);
    return QJS_VALUE_PTR(ret);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSContextValid(JNIEnv *env, jclass clazz, jlong js_context) {
    auto jsContext = QJS_CONTEXT(js_context);
    return static_cast<jboolean>(jsContext != nullptr);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSValueValid(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = QJS_CONTEXT(js_context);
    auto jsValue = QJS_VALUE(js_value);
    return static_cast<jboolean>(jsContext != nullptr && !JS_IsNull(jsValue) && !JS_IsUndefined(jsValue));
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueSetProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key, jlong js_value) {
    const char *cKey = env->GetStringUTFChars(key, nullptr);
    LOGD("JSValueSetProperty, key = %s", cKey);

    auto jsContext = QJS_CONTEXT(js_context);
    auto object = QJS_VALUE(js_object);
    auto value = QJS_VALUE(js_value);

    // 如果object为空，说明是全局Context下的属性
    if (JS_IsUndefined(object) || JS_IsNull(object)) {
        object = JS_GetGlobalObject(jsContext);
    }

    JS_SetPropertyStr(jsContext, object, cKey, value);

    env->ReleaseStringUTFChars(key, cKey);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueGetProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key) {
    const char *cKey = env->GetStringUTFChars(key, nullptr);
    LOGD("JSValueGetProperty, key = %s", cKey);

    auto jsContext = QJS_CONTEXT(js_context);
    auto object = QJS_VALUE(js_object);

    // 如果object为空，说明是全局Context下的属性
    if (JS_IsUndefined(object) || JS_IsNull(object)) {
        object = JS_GetGlobalObject(jsContext);
    }

    JSValue ret = JS_GetPropertyStr(jsContext, object, cKey);
    if (JS_IsUndefined(ret) || JS_IsNull(ret)) {
        LOGD("JSValueGetProperty, ret is undefined");
        return -1;
    }

    env->ReleaseStringUTFChars(key, cKey);

    return QJS_VALUE_PTR(ret);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueDelProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key) {
    auto jsContext = QJS_CONTEXT(js_context);
    auto object = QJS_VALUE(js_object);

    // 如果object为空，说明是全局Context下的属性
    if (JS_IsUndefined(object) || JS_IsNull(object)) {
        object = JS_GetGlobalObject(jsContext);
    }

    const char *cKey = env->GetStringUTFChars(key, nullptr);
    JSAtom atom = JS_NewAtom(jsContext, cKey);
    int ret = JS_DeleteProperty(jsContext, object, atom, 0);
    if (ret == -1) {
        reportExceptionIfNeed(jsContext);
    }

    JS_FreeAtom(jsContext, atom);
    env->ReleaseStringUTFChars(key, cKey);

    return (jboolean) (ret == TRUE);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueProtect(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = QJS_CONTEXT(js_context);
    auto jsValue = QJS_VALUE(js_value);
    JS_DupValue(jsContext, jsValue);
}


extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueUnProtect(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto jsContext = QJS_CONTEXT(js_context);
    auto jsValue = QJS_VALUE(js_value);
    if (jsContext != nullptr) {
        JS_FreeValue(jsContext, jsValue);
    }
}
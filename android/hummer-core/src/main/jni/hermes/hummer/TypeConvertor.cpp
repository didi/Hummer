//
// Created by XiaoFeng on 2020-08-21.
//

#include "TypeConvertor.h"

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeNumber(JNIEnv *env, jclass clazz, jlong runtimeId, jdouble value) {
    Value ret = Value(value);
    return VALUE_ID(ret);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeBoolean(JNIEnv *env, jclass clazz, jlong runtimeId, jboolean value) {
    Value ret = Value((bool) value);
    return VALUE_ID(ret);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeString(JNIEnv *env, jclass clazz, jlong runtimeId, jstring java_string) {
    if (java_string == nullptr) {
        return -1;
    }
    auto runtime = RUNTIME(runtimeId);
    const char *cString = env->GetStringUTFChars(java_string, nullptr);
    Value ret = String::createFromAscii(*runtime, cString);
    env->ReleaseStringUTFChars(java_string, cString);
    return VALUE_ID(ret);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_makeFromJsonString(JNIEnv *env, jclass clazz, jlong runtimeId, jstring json_string) {
    if (json_string == nullptr) {
        return -1;
    }
    auto runtime = RUNTIME(runtimeId);
    const char *cString = env->GetStringUTFChars(json_string, nullptr);
    const auto* uStr = reinterpret_cast<const uint8_t*>(cString);
    Value ret = Value::createFromJsonUtf8(*runtime, uStr, strlen(cString));
    env->ReleaseStringUTFChars(json_string, cString);
    return VALUE_ID(ret);
}

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2Double(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    auto runtime = RUNTIME(runtimeId);
    auto jsValue = VALUE(*runtime, js_value);
    jdouble value = jsValue.getNumber();
    return value;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2Boolean(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    auto runtime = RUNTIME(runtimeId);
    auto jsValue = VALUE(*runtime, js_value);
    jboolean value = jsValue.getBool();
    return value;
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValue2String(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    auto runtime = RUNTIME(runtimeId);
    auto jsValue = VALUE(*runtime, js_value);
    const char* string = jsValue.getString(*runtime).utf8(*runtime).c_str();
    jstring ret = env->NewStringUTF(string);
    return ret;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSNumber(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    auto runtime = RUNTIME(runtimeId);
    auto jsValue = VALUE(*runtime, js_value);
    return jsValue.isNumber();
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSBoolean(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    auto runtime = RUNTIME(runtimeId);
    auto jsValue = VALUE(*runtime, js_value);
    return jsValue.isBool();
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSString(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    auto runtime = RUNTIME(runtimeId);
    auto jsValue = VALUE(*runtime, js_value);
    return jsValue.isString();
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSFunction(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    auto runtime = RUNTIME(runtimeId);
    auto jsValue = VALUE(*runtime, js_value);
    if (!jsValue.isObject()) {
        return false;
    }
    return jsValue.getObject(*runtime).isFunction(*runtime);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSNull(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    auto runtime = RUNTIME(runtimeId);
    auto jsValue = VALUE(*runtime, js_value);
    return jsValue.isNull();
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSUndefined(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    auto runtime = RUNTIME(runtimeId);
    auto jsValue = VALUE(*runtime, js_value);
    return jsValue.isUndefined();
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSFunctionCall(JNIEnv *env, jclass clazz, jlong runtimeId, jlong thisObj, jlong funcObj, jlongArray js_values) {
    auto runtime = RUNTIME(runtimeId);
    auto jsThisObj = VALUE(*runtime, thisObj);
    auto jsFuncObj = VALUE(*runtime, funcObj);
    auto paramsCount = static_cast<int>(env->GetArrayLength(js_values));
    LOGD("JSFunctionCall, paramsCount = %d", paramsCount);

    if (runtime == nullptr) {
        LOGD("JSFunctionCall, jsContext is null");
        return -1;
    }

    if (jsFuncObj.isUndefined() || jsFuncObj.isNull() ) {
        LOGD("JSFunctionCall, jsFuncObj is undefined");
        return -1;
    }

    std::vector<Value> args;
    args.reserve(paramsCount);
    auto paramsPointers = env->GetLongArrayElements(js_values, nullptr);
    for (int i = 0; i < paramsCount; i++) {
        args.emplace_back(VALUE(*runtime, paramsPointers[i]));
    }
    const Value *params = args.data();

    Value ret = Value();
    try {
        if (jsThisObj.isObject()) {
            ret = jsFuncObj.getObject(*runtime).getFunction(*runtime).callWithThis(*runtime, jsThisObj.getObject(*runtime), params, args.size());
        } else {
            ret = jsFuncObj.getObject(*runtime).getFunction(*runtime).call(*runtime, params, args.size());
        }
    } catch (const facebook::jsi::JSIException &err) {
        reportException(runtime, err.what());
    } catch (const JSError &error) {
        reportException(runtime, error.what());
    } catch (const std::exception &ex) {
        reportException(runtime, ex.what());
    }

    env->ReleaseLongArrayElements(js_values, paramsPointers, 0);
    return VALUE_ID(ret);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSContextValid(JNIEnv *env, jclass clazz, jlong runtimeId) {
    auto runtime = RUNTIME(runtimeId);
    return static_cast<jboolean>(runtime != nullptr);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_isJSValueValid(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    auto runtime = RUNTIME(runtimeId);
    if (runtime == nullptr) {
        return false;
    }
    auto jsValue = VALUE(*runtime, js_value);
    return static_cast<jboolean>(!jsValue.isNull() && !jsValue.isUndefined());
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueSetProperty(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_object, jstring key, jlong js_value) {
    const char *cKey = env->GetStringUTFChars(key, nullptr);
    LOGD("JSValueSetProperty, key = %s", cKey);

    auto runtime = RUNTIME(runtimeId);
    auto object = VALUE(*runtime, js_object);
    auto value = VALUE(*runtime, js_value);

    try {
        // 如果object为空，说明是全局Context下的属性
        if (object.isObject()) {
            object.getObject(*runtime).setProperty(*runtime, cKey, value);
        } else {
            runtime->global().setProperty(*runtime, cKey, value);
        }
    } catch (const facebook::jsi::JSIException &err) {
        reportException(runtime, err.what());
    } catch (const JSError &error) {
        reportException(runtime, error.what());
    } catch (const std::exception &ex) {
        reportException(runtime, ex.what());
    }

    env->ReleaseStringUTFChars(key, cKey);
}

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueGetProperty(JNIEnv *env, jclass clazz, jlong runtineId, jlong js_object, jstring key) {
    const char *cKey = env->GetStringUTFChars(key, nullptr);
    LOGD("JSValueGetProperty, key = %s", cKey);

    auto runtime = RUNTIME(runtineId);
    auto object = VALUE(*runtime, js_object);

    Value ret = Value();
    try {
        // 如果object为空，说明是全局Context下的属性
        if (object.isObject()) {
            Object obj = object.getObject(*runtime);
            if (obj.hasProperty(*runtime, cKey)) {
                ret = obj.getProperty(*runtime, cKey);
            }
        } else {
            if (runtime->global().hasProperty(*runtime, cKey)) {
                ret = runtime->global().getProperty(*runtime, cKey);
            }
        }
    } catch (const facebook::jsi::JSIException &err) {
        reportException(runtime, err.what());
    } catch (const JSError &error) {
        reportException(runtime, error.what());
    } catch (const std::exception &ex) {
        reportException(runtime, ex.what());
    }

    return VALUE_ID(ret);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueDelProperty(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_object, jstring key) {
    // TODO: 没有对应方法
    return true;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueProtect(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    // TODO: 没有对应方法
}


extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_TypeConvertor_JSValueUnProtect(JNIEnv *env, jclass clazz, jlong runtimeId, jlong js_value) {
    // TODO: 没有对应方法
}
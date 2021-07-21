//
// Created by XiaoFeng on 2021/6/29.
//

#include <jni.h>
#include <HummerJNI.h>
#include <JSUtils.h>
#include <JSException.h>
#include <JSClassRegister.h>
#include <js_native_api.h>

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_createJSContext(JNIEnv *env, jclass clazz) {
    JSUtils::init(env);

    NAPIEnv globalEnv;
    NAPICreateEnv(&globalEnv);

    NAPIHandleScope handleScope;
    napi_open_handle_scope(globalEnv, &handleScope);

    // 在创建完JSRuntime后第一时间注册自定义Class，是为了使所有JSRuntime公用一个classId，不被相互覆盖
    JSClassRegister::init(globalEnv);

    int64_t ctxPtr = JSUtils::toJsContextPtr(globalEnv);
    JSUtils::addHandleScope(ctxPtr, handleScope);
    return ctxPtr;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_destroyJSContext(JNIEnv *env, jclass clazz, jlong js_context) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    JSUtils::removeJSContext(js_context);

    NAPIHandleScope handleScope = JSUtils::getHandleScope(js_context);
    if (handleScope != nullptr) {
        napi_close_handle_scope(globalEnv, nullptr);
    }

    NAPIFreeEnv(globalEnv);
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_evaluateJavaScript(JNIEnv *env, jclass clazz, jlong js_context, jstring script, jstring scriptId) {
    const char *charScript = env->GetStringUTFChars(script, nullptr);
    const char *charScriptId = env->GetStringUTFChars(scriptId, nullptr);

    auto globalEnv = JSUtils::toJsContext(js_context);

    NAPIValue result;
    NAPIStatus status = NAPIRunScript(globalEnv, charScript, charScriptId, &result);
    LOGD("eval status: %d", status);

    env->ReleaseStringUTFChars(script, charScript);
    env->ReleaseStringUTFChars(script, charScriptId);

    if (status == NAPIPendingException) {
        reportExceptionIfNeed(globalEnv);
        jstring msg = env->NewStringUTF("JavaScript evaluate exception");
        jobject obj = env->NewObject(JSUtils::jsExceptionCls, JSUtils::jsExceptionInitMethodID, msg);
        env->DeleteLocalRef(msg);
        return obj;
    }

    return JSUtils::JsValueToJavaObject(globalEnv, result);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_setProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key, jobject value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto object = JSUtils::toJsValue(globalEnv, js_object);
    // 如果object为空，说明是全局Context下的属性
    if (object == nullptr) {
        napi_get_global(globalEnv, &object);
    }

    const char *cKey = env->GetStringUTFChars(key, nullptr);
    LOGD("setProperty, key = %s", cKey);

    napi_set_named_property(globalEnv, object, cKey, JSUtils::JavaObjectToJsValue(globalEnv, value));

    env->ReleaseStringUTFChars(key, cKey);
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_getProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto object = JSUtils::toJsValue(globalEnv, js_object);
    // 如果object为空，说明是全局Context下的属性
    if (object == nullptr) {
        napi_get_global(globalEnv, &object);
    }

    const char *cKey = env->GetStringUTFChars(key, nullptr);
    LOGD("getProperty, key = %s", cKey);

    NAPIValue ret;
    NAPIStatus status = napi_get_named_property(globalEnv, object, cKey, &ret);
    if (status != NAPIOK) {
        return nullptr;
    }

    env->ReleaseStringUTFChars(key, cKey);
    return JSUtils::JsValueToJavaObject(globalEnv, ret);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_delProperty(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring key) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto object = JSUtils::toJsValue(globalEnv, js_object);
    // 如果object为空，说明是全局Context下的属性
    if (object == nullptr) {
        napi_get_global(globalEnv, &object);
    }

    const char *cKey = env->GetStringUTFChars(key, nullptr);
    NAPIValue jsKey;
    NAPIStatus status = napi_create_string_utf8(globalEnv, cKey, &jsKey);
    if (status != NAPIOK) {
        env->ReleaseStringUTFChars(key, cKey);
        return false;
    }

    bool ret;
    napi_delete_property(globalEnv, object, jsKey, &ret);

    env->ReleaseStringUTFChars(key, cKey);
    return ret;
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_callFunction(JNIEnv *env, jclass clazz, jlong js_context, jlong thisObj, jlong funcObj, jobjectArray params) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    NAPIValue jsThisObj = JSUtils::toJsValue(globalEnv, thisObj);
    NAPIValue jsFuncObj = JSUtils::toJsValue(globalEnv, funcObj);
    auto paramsCount = static_cast<int>(env->GetArrayLength(params));
    LOGD("JSFunctionCall, paramsCount = %d", paramsCount);

    auto values = new NAPIValue[paramsCount];
    for (int i = 0; i < paramsCount; i++) {
        jobject obj = env->GetObjectArrayElement(params, i);
        values[i] = JSUtils::JavaObjectToJsValue(globalEnv, obj);
        env->DeleteLocalRef(obj);
    }

    if (jsThisObj == nullptr) {
        jsThisObj = JSUtils::createJsUndefined(globalEnv);
    }

    NAPIValue result;
    NAPIStatus status = napi_call_function(globalEnv, jsThisObj, jsFuncObj, paramsCount, values, &result);

    if (status == NAPIPendingException) {
        reportExceptionIfNeed(globalEnv);
        return nullptr;
    }

    return JSUtils::JsValueToJavaObject(globalEnv, result);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_isJSContextValid(JNIEnv *env, jclass clazz, jlong js_context) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    return static_cast<jboolean>(globalEnv != nullptr);
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_isJSValueValid(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    if (globalEnv == nullptr) {
        return false;
    }
    auto value = JSUtils::toJsValue(globalEnv, js_value);
    NAPIValueType type;
    NAPIStatus status = napi_typeof(globalEnv, value, &type);
    if (status != NAPIOK) {
        return false;
    }
    return type != NAPIUndefined && type != NAPINull;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_protect(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto valueRef = JSUtils::toJsValueRef(js_value);
    napi_reference_ref(globalEnv, valueRef, nullptr);
}


extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_unProtect(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    if (globalEnv == nullptr) {
        return;
    }
    auto valueRef = JSUtils::toJsValueRef(js_value);
    napi_reference_unref(globalEnv, valueRef, nullptr);
}
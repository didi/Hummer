//
// Created by XiaoFeng on 2021/6/29.
//

#include <jni.h>
#include <js_native_api.h>
#include "HummerJNI.h"
#include "JSUtils.h"
#include "JSException.h"
#include "JSRecycler.h"

static NAPIValue invoke(NAPIEnv globalEnv, NAPICallbackInfo info) {
    size_t argc;
    napi_get_cb_info(globalEnv, info, &argc, nullptr, nullptr, nullptr);
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(globalEnv, info, &argc, argv, nullptr, &data);
    int32_t callbackId = (int32_t) (size_t) data;

    JNIEnv* env = JNI_GetEnv();
    jobjectArray params = nullptr;
    if (argc > 0) {
        params = env->NewObjectArray(argc, JSUtils::objectCls, nullptr);
        for (int i = 0; i < argc; i++) {
            jobject p = JSUtils::JsValueToJavaObject(globalEnv, argv[i]);
            env->SetObjectArrayElement(params, i, p);
            env->DeleteLocalRef(p);
        }
    }

    int64_t ctxPtr = JSUtils::toJsContextPtr(globalEnv);
    jobject ret = env->CallStaticObjectMethod(JSUtils::jsEngineCls, JSUtils::callJavaCallbackMethodID, ctxPtr, callbackId, params);

    env->DeleteLocalRef(params);
    JNI_DetachEnv();

    return JSUtils::JavaObjectToJsValue(globalEnv, ret);
}

// 单线程共用
thread_local NAPIRuntime runtime;
thread_local int ctxCount = 0;

extern "C"
JNIEXPORT jlong JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_createJSContext(JNIEnv *env, jclass clazz) {
    if (ctxCount == 0) {
        NAPICreateRuntime(&runtime);
    }
    NAPIEnv globalEnv;
    NAPICreateEnv(&globalEnv, runtime);

    NAPIHandleScope handleScope;
    napi_open_handle_scope(globalEnv, &handleScope);

    JSRecycler::registerClass(globalEnv);

    int64_t ctxPtr = JSUtils::toJsContextPtr(globalEnv);
    JSUtils::addHandleScope(ctxPtr, handleScope);

    ctxCount++;
    return ctxPtr;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_destroyJSContext(JNIEnv *env, jclass clazz, jlong js_context) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    JSUtils::removeJSContext(js_context);

    NAPIHandleScope handleScope = JSUtils::getHandleScope(js_context);
    if (handleScope != nullptr) {
        napi_close_handle_scope(globalEnv, handleScope);
        JSUtils::removeHandleScope(js_context);
    }

    NAPIFreeEnv(globalEnv);

    if (ctxCount > 0) {
        ctxCount--;
        if (ctxCount == 0) {
            NAPIFreeRuntime(runtime);
        }
    }
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_evaluateJavaScript(JNIEnv *env, jclass clazz, jlong js_context, jstring script, jstring scriptId) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    const char *charScript = env->GetStringUTFChars(script, nullptr);
    const char *charScriptId = env->GetStringUTFChars(scriptId, nullptr);

    NAPIValue result;
    auto status = NAPIRunScript(globalEnv, charScript, charScriptId, &result);
    LOGD("eval status: %d", status);

    env->ReleaseStringUTFChars(script, charScript);
    env->ReleaseStringUTFChars(script, charScriptId);

    if (status == NAPIExceptionPendingException) {
        reportExceptionIfNeed(globalEnv);
        jstring msg = env->NewStringUTF("JavaScript evaluate exception");
        jobject obj = env->NewObject(JSUtils::jsExceptionCls, JSUtils::jsExceptionInitMethodID, msg);
        env->DeleteLocalRef(msg);
        return obj;
    }

    return JSUtils::JsValueToJavaObject(globalEnv, result);
}

extern "C"
JNIEXPORT jbyteArray JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_compileJavaScript(JNIEnv *env, jclass clazz, jlong js_context, jstring script, jstring scriptId) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    const char *charScript = env->GetStringUTFChars(script, nullptr);
    const char *charScriptId = env->GetStringUTFChars(scriptId, nullptr);

    const uint8_t *byteBuffer;
    size_t bufferSize;
    auto status = NAPICompileToByteBuffer(globalEnv, charScript, charScriptId, &byteBuffer, &bufferSize);
    LOGD("compile bytecode status: %d", status);

    env->ReleaseStringUTFChars(script, charScript);
    env->ReleaseStringUTFChars(script, charScriptId);

    if (status == NAPIExceptionPendingException) {
        reportExceptionIfNeed(globalEnv);
        return nullptr;
    }

    jbyteArray ret = env->NewByteArray((jsize) bufferSize);
    env->SetByteArrayRegion(ret, 0, (jsize) bufferSize, reinterpret_cast<const jbyte*>(byteBuffer));
    NAPIFreeByteBuffer(globalEnv, byteBuffer);

    return ret;
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_evaluateBytecode(JNIEnv *env, jclass clazz, jlong js_context, jbyteArray bytecode) {
    auto globalEnv = JSUtils::toJsContext(js_context);

    jsize bufferSize = env->GetArrayLength(bytecode);
    auto *byteBuffer = (jbyte *) malloc(sizeof(jbyte) * bufferSize);
    memset(byteBuffer, 0, sizeof(jbyte) * bufferSize);

    env->GetByteArrayRegion(bytecode, 0, bufferSize, byteBuffer);

    NAPIValue result;
    auto status = NAPIRunByteBuffer(globalEnv, (uint8_t *) byteBuffer, bufferSize, &result);
    LOGD("run bytecode status: %d", status);

    free(byteBuffer);

    if (status == NAPIExceptionPendingException) {
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
        object = JSUtils::createJsGlobal(globalEnv);
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
        object = JSUtils::createJsGlobal(globalEnv);
    }

    const char *cKey = env->GetStringUTFChars(key, nullptr);
    LOGD("getProperty, key = %s", cKey);

    NAPIValue ret;
    auto status = napi_get_named_property(globalEnv, object, cKey, &ret);
    if (status != NAPIExceptionOK) {
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
        object = JSUtils::createJsGlobal(globalEnv);
    }

    const char *cKey = env->GetStringUTFChars(key, nullptr);
    NAPIValue jsKey;
    auto status = napi_create_string_utf8(globalEnv, cKey, &jsKey);
    if (status != NAPIExceptionOK) {
        env->ReleaseStringUTFChars(key, cKey);
        return false;
    }

    bool ret;
    napi_delete_property(globalEnv, object, jsKey, &ret);

    env->ReleaseStringUTFChars(key, cKey);
    return ret;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_registerFunction(JNIEnv *env, jclass clazz, jlong js_context, jlong js_object, jstring func_name, jint func_id) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    auto object = JSUtils::toJsValue(globalEnv, js_object);
    // 如果object为空，说明是全局Context下的属性
    if (object == nullptr) {
        object = JSUtils::createJsGlobal(globalEnv);
    }

    auto funcName = env->GetStringUTFChars(func_name, nullptr);
    NAPIValue func;
    napi_create_function(globalEnv, funcName, invoke, (void *) func_id, &func);
    napi_set_named_property(globalEnv, object, funcName, func);
    env->ReleaseStringUTFChars(func_name, funcName);
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_callFunction(JNIEnv *env, jclass clazz, jlong js_context, jlong thisObj, jlong funcObj, jobjectArray params) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    NAPIValue jsThisObj = JSUtils::toJsValue(globalEnv, thisObj);
    NAPIValue jsFuncObj = JSUtils::toJsValue(globalEnv, funcObj);
    auto paramsCount = static_cast<int>(env->GetArrayLength(params));
    LOGD("JSFunctionCall, paramsCount = %d", paramsCount);

    if (jsFuncObj == nullptr) {
        return nullptr;
    }

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
    auto status = napi_call_function(globalEnv, jsThisObj, jsFuncObj, paramsCount, values, &result);
    if (status == NAPIExceptionPendingException) {
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
    auto status = napi_typeof(globalEnv, value, &type);
    if (status != NAPICommonOK) {
        return false;
    }
    return type != NAPIUndefined && type != NAPINull;
}

extern "C"
JNIEXPORT jboolean JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_isJSValueEqual(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value_l, jlong js_value_r) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    if (globalEnv == nullptr) {
        return false;
    }
    auto valueLeft = JSUtils::toJsValue(globalEnv, js_value_l);
    auto valueRight = JSUtils::toJsValue(globalEnv, js_value_r);

    bool ret;
    auto status = napi_strict_equals(globalEnv, valueLeft, valueRight, &ret);
    if (status != NAPIExceptionOK) {
        return false;
    }
    return ret;
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
Java_com_didi_hummer_core_engine_napi_jni_JSEngine_unprotect(JNIEnv *env, jclass clazz, jlong js_context, jlong js_value) {
    auto globalEnv = JSUtils::toJsContext(js_context);
    if (globalEnv == nullptr) {
        return;
    }
    auto valueRef = JSUtils::toJsValueRef(js_value);
    napi_reference_unref(globalEnv, valueRef, nullptr);
}

//
// Created by XiaoFeng on 2021/6/24.
//

#include <JSUtils.h>
#include <HummerJNI.h>

jclass JSUtils::numberCls;
jclass JSUtils::doubleCls;
jclass JSUtils::booleanCls;
jclass JSUtils::stringCls;
jclass JSUtils::objectCls;
jclass JSUtils::jsValueCls;
jclass JSUtils::jsCallbackCls;
jclass JSUtils::jsExceptionCls;
jclass JSUtils::jsUtilsCls;
jmethodID JSUtils::doubleInitMethodID;
jmethodID JSUtils::booleanInitMethodID;
jmethodID JSUtils::jsValueInitMethodID;
jmethodID JSUtils::jsCallbackInitMethodID;
jmethodID JSUtils::jsExceptionInitMethodID;
jmethodID JSUtils::numberValueMethodID;
jmethodID JSUtils::doubleValueMethodID;
jmethodID JSUtils::booleanValueMethodID;
jmethodID JSUtils::toJsonStringMethodID;
jfieldID JSUtils::js_value_ptr;
jfieldID JSUtils::js_callback_ptr;

int64_t JSUtils::jsContextId = 0;
std::map<int64_t, NAPIEnv> JSUtils::jsContextIdMap;
std::map<int64_t, NAPIHandleScope> JSUtils::handleScopeMap;

void JSUtils::init(JNIEnv *env) {
    numberCls = (jclass) env->NewGlobalRef((env)->FindClass("java/lang/Number"));
    doubleCls = (jclass) env->NewGlobalRef((env)->FindClass("java/lang/Double"));
    booleanCls = (jclass) env->NewGlobalRef((env)->FindClass("java/lang/Boolean"));
    stringCls = (jclass) env->NewGlobalRef((env)->FindClass("java/lang/String"));
    objectCls = (jclass) env->NewGlobalRef((env)->FindClass("java/lang/Object"));
    doubleInitMethodID = env->GetMethodID(doubleCls, "<init>", "(D)V");
    booleanInitMethodID = env->GetMethodID(booleanCls, "<init>", "(Z)V");
    jsValueCls = (jclass) env->NewGlobalRef((env)->FindClass("com/didi/hummer/core/engine/napi/NAPIValue"));
    jsCallbackCls = (jclass) env->NewGlobalRef((env)->FindClass("com/didi/hummer/core/engine/napi/NAPICallback"));
    jsValueInitMethodID = env->GetStaticMethodID(jsValueCls, "wrapper","(JJ)Lcom/didi/hummer/core/engine/napi/NAPIValue;");
    jsCallbackInitMethodID = env->GetStaticMethodID(jsCallbackCls, "wrapper","(JJ)Lcom/didi/hummer/core/engine/napi/NAPICallback;");
    numberValueMethodID = env->GetMethodID(numberCls, "doubleValue", "()D");
    doubleValueMethodID = env->GetMethodID(doubleCls, "doubleValue", "()D");
    booleanValueMethodID = env->GetMethodID(booleanCls, "booleanValue", "()Z");
    js_value_ptr = env->GetFieldID(jsValueCls, "value", "J");
    js_callback_ptr = env->GetFieldID(jsCallbackCls, "value", "J");
    jsExceptionCls = (jclass) env->NewGlobalRef((env)->FindClass("com/didi/hummer/core/exception/JSException"));
    jsExceptionInitMethodID = env->GetMethodID(jsExceptionCls, "<init>","(Ljava/lang/String;)V");
    jsUtilsCls = (jclass) env->NewGlobalRef((env)->FindClass("com/didi/hummer/core/engine/napi/jni/JSUtils"));
    toJsonStringMethodID = env->GetStaticMethodID(jsUtilsCls, "toJsonString", "(Ljava/lang/Object;)Ljava/lang/String;");
}

NAPIEnv JSUtils::toJsContext(int64_t envPtr) {
    auto iter = jsContextIdMap.find(envPtr);
    if (iter != jsContextIdMap.end()) {
        return iter->second;
    }
    return nullptr;
}

int64_t JSUtils::toJsContextPtr(NAPIEnv env) {
    std::map<int64_t, NAPIEnv>::iterator it;
    for (it = jsContextIdMap.begin(); it != jsContextIdMap.end(); it++) {
        if (env == it->second) {
            return it->first;
        }
    }
    int64_t newId = ++jsContextId;
    jsContextIdMap.insert(std::make_pair(newId, env));
    return newId;
}

void JSUtils::removeJSContext(int64_t envPtr) {
    jsContextIdMap.erase(envPtr);
}

void JSUtils::addHandleScope(int64_t envPtr, NAPIHandleScope scope) {
    handleScopeMap.insert(std::make_pair(envPtr, scope));
}

NAPIHandleScope JSUtils::getHandleScope(int64_t envPtr) {
    auto iter = handleScopeMap.find(envPtr);
    if (iter != handleScopeMap.end()) {
        return iter->second;
    }
    return nullptr;
}

NAPIRef JSUtils::toJsValueRef(int64_t valuePtr) {
    if (valuePtr == -1) {
        return nullptr;
    }
    return reinterpret_cast<NAPIRef>(valuePtr);
}

int64_t JSUtils::toJsValuePtr(NAPIRef valueRef) {
    return reinterpret_cast<int64_t>(valueRef);
}

int64_t JSUtils::toJsValuePtr(NAPIEnv env, NAPIValue value) {
    return toJsValuePtr(createJsValueRef(env, value));
}

NAPIValue JSUtils::toJsValue(NAPIEnv env, int64_t valuePtr) {
    if (valuePtr == -1) {
        return nullptr;
    }
    NAPIRef valueRef = toJsValueRef(valuePtr);
    NAPIValue value = getJsValueFromRef(env, valueRef);
    return value;
}

NAPIValue JSUtils::getJsValueFromRef(NAPIEnv env, NAPIRef valueRef) {
    if (valueRef == nullptr) {
        return nullptr;
    }

    NAPIValue value;
    NAPIStatus status = napi_get_reference_value(env, valueRef, &value);
    if (status != NAPIOK) {
        return nullptr;
    }
    return value;
}

NAPIRef JSUtils::createJsValueRef(NAPIEnv env, NAPIValue value) {
    if (value == nullptr) {
        return nullptr;
    }

    NAPIRef valueRef;
    NAPIStatus status = napi_create_reference(env, value, 0, &valueRef);
    if (status != NAPIOK) {
        return nullptr;
    }
    return valueRef;
}

const char *JSUtils::toCString(NAPIEnv env, NAPIValue value) {
    if (value == nullptr) {
        return nullptr;
    }

    const char *cStr;
    NAPIStatus status = NAPIGetValueStringUTF8(env, value, &cStr);
    if (status != NAPIOK) {
        return nullptr;
    }

    return cStr;
}

void JSUtils::freeCString(NAPIEnv env, const char *cString) {
    if (cString == nullptr) {
        return;
    }
    NAPIFreeUTF8String(env, cString);
}

jstring JSUtils::toJavaString(NAPIEnv globalEnv, NAPIValue value) {
    if (value == nullptr) {
        return nullptr;
    }

    JNIEnv* env = JNI_GetEnv();
    const char *cStr = toCString(globalEnv, value);
    jstring ret = env->NewStringUTF(cStr);
    freeCString(globalEnv, cStr);

    JNI_DetachEnv();
    return ret;
}

NAPIValue JSUtils::createJsGlobal(NAPIEnv env) {
    NAPIValue ret;
    napi_get_global(env, &ret);
    return ret;
}

NAPIValue JSUtils::createJsNull(NAPIEnv env) {
    NAPIValue ret;
    napi_get_null(env, &ret);
    return ret;
}

NAPIValue JSUtils::createJsUndefined(NAPIEnv env) {
    NAPIValue ret;
    napi_get_undefined(env, &ret);
    return ret;
}

jobject JSUtils::JsValueToJavaObject(NAPIEnv globalEnv, NAPIValue value) {
    JNIEnv* env = JNI_GetEnv();
    NAPIValueType type;
    NAPIStatus status = napi_typeof(globalEnv, value, &type);
    if (status != NAPIOK) {
        return nullptr;
    }
    jobject obj;
    if (type == NAPIUndefined || type == NAPINull) {
        obj = nullptr;
    } else if (type == NAPINumber) {
        double ret;
        napi_get_value_double(globalEnv, value, &ret);
        obj = env->NewObject(doubleCls, doubleInitMethodID, ret);
    } else if (type == NAPIBoolean) {
        bool ret;
        napi_get_value_bool(globalEnv, value, &ret);
        obj = env->NewObject(booleanCls, booleanInitMethodID, ret);
    } else if (type == NAPIString) {
        obj = JSUtils::toJavaString(globalEnv, value);
    } else if (type == NAPIFunction) {
        jlong ctxPtr = JSUtils::toJsContextPtr(globalEnv);
        jlong valuePtr = JSUtils::toJsValuePtr(globalEnv, value);
        obj = env->CallStaticObjectMethod(jsCallbackCls, jsCallbackInitMethodID, ctxPtr, valuePtr);
    } else {
        jlong ctxPtr = JSUtils::toJsContextPtr(globalEnv);
        jlong valuePtr = JSUtils::toJsValuePtr(globalEnv, value);
        obj = env->CallStaticObjectMethod(jsValueCls, jsValueInitMethodID, ctxPtr, valuePtr);
    }

    JNI_DetachEnv();
    return obj;
}

NAPIValue JSUtils::JavaObjectToJsValue(NAPIEnv globalEnv, jobject value) {
    JNIEnv* env = JNI_GetEnv();
    NAPIValue val;

    if (value == nullptr) {
        val = JSUtils::createJsNull(globalEnv);
    } else if (env->IsInstanceOf(value, numberCls)) {
        jdouble v = env->CallDoubleMethod(value, numberValueMethodID);
        napi_create_double(globalEnv, v, &val);
    } else if (env->IsInstanceOf(value, booleanCls)) {
        jboolean v = env->CallBooleanMethod(value, booleanValueMethodID);
        napi_get_boolean(globalEnv, v, &val);
    } else if (env->IsInstanceOf(value, stringCls)) {
        const char *cString = env->GetStringUTFChars((jstring) value, nullptr);
        napi_create_string_utf8(globalEnv, cString, &val);
    } else if (env->IsInstanceOf(value, jsCallbackCls)) {
        jlong valuePtr = env->GetLongField(value, js_callback_ptr);
        val = JSUtils::toJsValue(globalEnv, valuePtr);
    } else if (env->IsInstanceOf(value, jsValueCls)) {
        jlong valuePtr = env->GetLongField(value, js_value_ptr);
        val = JSUtils::toJsValue(globalEnv, valuePtr);
    } else {
        jobject jstr = env->CallStaticObjectMethod(jsUtilsCls, toJsonStringMethodID, value);
        const char *cString = env->GetStringUTFChars((jstring) jstr, nullptr);
        NAPIParseUTF8JSONString(globalEnv, cString, &val);
    }

    JNI_DetachEnv();
    return val;
}
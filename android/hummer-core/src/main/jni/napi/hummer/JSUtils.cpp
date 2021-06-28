//
// Created by XiaoFeng on 2021/6/24.
//

#include <JSUtils.h>
#include <HummerJNI.h>

std::map<long, NAPIEnv> JSUtils::cachedJSContext;
long JSUtils::idCachedContext = 0;

NAPIEnv JSUtils::toJsContext(long envPtr) {
    auto iter = cachedJSContext.find(envPtr);
    if (iter != cachedJSContext.end()) {
        return iter->second;
    }
    return nullptr;
}

long JSUtils::toJsContextPtr(NAPIEnv env) {
    std::map<long, NAPIEnv>::iterator it;
    for (it = cachedJSContext.begin(); it != cachedJSContext.end(); it++) {
        if (env == it->second) {
            return it->first;
        }
    }
    long newId = ++idCachedContext;
    cachedJSContext.insert(std::make_pair(newId, env));
    return newId;
}

void JSUtils::removeJSContext(long envPtr) {
    cachedJSContext.erase(envPtr);
}

NAPIRef JSUtils::toJsValueRef(long valuePtr) {
    if (valuePtr == -1) {
        return nullptr;
    }
    return reinterpret_cast<NAPIRef>(valuePtr);
}

long JSUtils::toJsValuePtr(NAPIRef valueRef) {
    return reinterpret_cast<long>(valueRef);
}

long JSUtils::toJsValuePtr(NAPIEnv env, NAPIValue value) {
    NAPIValueType type;
    napi_typeof(env, value, &type);
    if (type == NAPIUndefined || type == NAPINull || type == NAPINumber || type == NAPIBoolean || type == NAPIString) {
        return toJsValuePtr(createJsValueRef(env, value, 1));
    } else {
        return toJsValuePtr(createJsValueRef(env, value));
    }
}

NAPIValue JSUtils::toJsValue(NAPIEnv env, long valuePtr) {
    if (valuePtr == -1) {
        return nullptr;
    }
    NAPIRef valueRef = toJsValueRef(valuePtr);
    LOGD("toJsValue, valueRef = %p", valueRef);
    NAPIValue value = getJsValueFromRef(env, valueRef);
    LOGD("toJsValue, value = %p", value);
    NAPIValueType type;
    napi_typeof(env, value, &type);
    if (type == NAPIUndefined || type == NAPINull || type == NAPINumber || type == NAPIBoolean || type == NAPIString) {
//        napi_reference_unref(env, valueRef, nullptr);
    }
    return value;
}

NAPIValue JSUtils::getJsValueFromRef(NAPIEnv env, NAPIRef valueRef) {
    LOGD("getJsValueFromRef, valueRef = %p", valueRef);
    if (valueRef == nullptr) {
        return nullptr;
    }

    NAPIValue value;
    NAPIStatus status = napi_get_reference_value(env, valueRef, &value);
    LOGD("getJsValueFromRef, status = %d", status);
    LOGD("getJsValueFromRef, value = %p", value);
    // TODO: 处理 status
    if (status != NAPIOK) {
        return nullptr;
    }
    return value;
}

NAPIRef JSUtils::createJsValueRef(NAPIEnv env, NAPIValue value) {
    return createJsValueRef(env, value, 0);
}

NAPIRef JSUtils::createJsValueRef(NAPIEnv env, NAPIValue value, long count) {
    LOGD("createJsValueRef, value = %p, count = %d", value, count);
    if (value == nullptr) {
        return nullptr;
    }

    NAPIRef valueRef;
    // TODO: 引用计数+1
    NAPIStatus status = napi_create_reference(env, value, count, &valueRef);
    LOGD("createJsValueRef, status = %d", status);
    LOGD("createJsValueRef, valueRef = %p", valueRef);
    // TODO: 处理 status
//    status = napi_reference_ref(env, valueRef, nullptr);
    return valueRef;
}

const char *JSUtils::toCString(NAPIEnv env, NAPIValue value) {
    if (value == nullptr) {
        return nullptr;
    }

    NAPIStatus status;
    NAPIValueType type;
    status = napi_typeof(env, value, &type);
    if (status != NAPIOK || type == NAPIUndefined || type == NAPINull) {
        return nullptr;
    }

    // 先获取count
    size_t count;
    status = napi_get_value_string_utf8(env, value, nullptr, 1, &count);
    if (status != NAPIOK) {
        return nullptr;
    }

    // 再转换string
    char *cStr = (char *)malloc(count + 1);
    status = napi_get_value_string_utf8(env, value, cStr, count + 1, nullptr);
    if (status != NAPIOK) {
        return nullptr;
    }

    return cStr;
}

jstring JSUtils::toJavaString(NAPIEnv globalEnv, NAPIValue value) {
    if (value == nullptr) {
        return nullptr;
    }

    JNIEnv* env = JNI_GetEnv();
    const char *cStr = toCString(globalEnv, value);
    jstring ret = env->NewStringUTF(cStr);
    free((void *) cStr);
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

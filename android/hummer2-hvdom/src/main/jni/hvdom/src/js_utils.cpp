//
// Created by didi on 2023/11/29.
//


#include "hvdom/js_utils.h"


const char *JSUtils::getJsCString(NAPIEnv *env, NAPIValue *value) {
    if (value == nullptr) {
        return nullptr;
    }
    const char *cStr;
    auto status = NAPIGetValueStringUTF8(*env, *value, &cStr);
    if (status != NAPIErrorOK) {
        return nullptr;
    }
    return cStr;
}

double JSUtils::getJsNumber(NAPIEnv *env, NAPIValue *value, double defaultValue) {
    if (value == nullptr) {
        return defaultValue;
    }
    double result;
    auto status = napi_get_value_double(*env, *value, &result);
    if (status != NAPIErrorOK) {
        return defaultValue;
    }
    return result;
}

const char *JSUtils::getPropertyToCString(NAPIEnv *env, NAPIValue *value, const char *name) {
    NAPIValue propertyValue;
    auto status = napi_get_named_property(*env, *value, name, &propertyValue);
    if (status != NAPIExceptionOK) {
        return nullptr;
    }
    const char *stack = getJsCString(env, &propertyValue);
    return stack;
}

const double JSUtils::getNumberProperty(NAPIEnv *env, NAPIValue *value, const char *name, double defaultValue) {
    NAPIValue propertyValue;
    auto status = napi_get_named_property(*env, *value, name, &propertyValue);
    if (status != NAPIExceptionOK) {
        return defaultValue;
    }
    return getJsNumber(env, &propertyValue, defaultValue);
}

NAPIValue JSUtils::getGlobal(NAPIEnv *env) {
    NAPIValue global;
    napi_get_global(*env, &global);
    return global;
}


NAPIExceptionStatus JSUtils::setProperty(NAPIEnv *env, NAPIValue *obj, const char *name, NAPIValue *value) {
    return napi_set_named_property(*env, *obj, name, *value);
}

NAPIExceptionStatus JSUtils::setNumberProperty(NAPIEnv *env, NAPIValue *obj, const char *name, double value) {
    NAPIValue number;
    napi_create_double(*env, value, &number);
    return setProperty(env, obj, name, &number);
}

NAPIExceptionStatus JSUtils::setGlobalProperty(NAPIEnv *env, const char *name, NAPIValue *value) {
    NAPIValue global;
    napi_get_global(*env, &global);
    return napi_set_named_property(*env, global, name, *value);
}

NAPIExceptionStatus JSUtils::createObject(NAPIEnv *env, NAPIValue *constructor, size_t argc, const NAPIValue *argv, NAPIValue *result) {
    return napi_new_instance(*env, *constructor, argc, argv, result);
}

NAPIExceptionStatus JSUtils::createObject(NAPIEnv *env, const char *clsName, size_t argc, const NAPIValue *argv, NAPIValue *result) {
    NAPIValue global;
    napi_get_global(*env, &global);

    NAPIValue constructor;
    napi_get_named_property(*env, global, clsName, &constructor);
    return napi_new_instance(*env, constructor, argc, argv, result);
}

list<char *> JSUtils::toStringArray(NAPIEnv *env, const NAPIValue *napiValue) {
    NAPIValue object;
    napi_get_named_property(*env, *napiValue, "length", &object);
    double length;
    napi_get_value_double(*env, object, &length);

    list<char *> keys;

    for (int i = 0; i < length; i++) {
        NAPIValue index;
        napi_create_double(*env, i, &index);
        NAPIValue value;
        napi_get_property(*env, *napiValue, index, &value);

        const char *keyString;
        NAPIGetValueStringUTF8(*env, value, &keyString);

        keys.push_back((char *) keyString);
    }
    return keys;
}

HMArray *JSUtils::toArray(NAPIEnv *env, const NAPIValue *napiValue) {
    NAPIValue object;
    napi_get_named_property(*env, *napiValue, "length", &object);
    double length;
    napi_get_value_double(*env, object, &length);

    HMArray *hmArray = new HMArray();

    for (int i = 0; i < length; i++) {
        NAPIValue index;
        napi_create_double(*env, i, &index);
        NAPIValue value;
        napi_get_property(*env, *napiValue, index, &value);
        HMValue *hmValue = toValue(env, &value);
        hmArray->addValue(hmValue);
    }
    return hmArray;
}

HMObject *JSUtils::toObject(NAPIEnv *env, const NAPIValue *napiValue) {
//    debug("JSUtils::toObject()");
    NAPIValue global;
    napi_get_global(*env, &global);
    NAPIValue object;
    napi_get_named_property(*env, global, "Object", &object);
    NAPIValue keysFunc;
    napi_get_named_property(*env, object, "keys", &keysFunc);

    size_t argc = 1;
    NAPIValue result;
    napi_call_function(*env, nullptr, keysFunc, argc, napiValue, &result);

    list<char *> keys = toStringArray(env, &result);
    HMObject *hmObject = new HMObject();
    for (auto it = keys.begin(); it != keys.end(); ++it) {
        char *key = *it;

//        debug("JSUtils::toObject() key=%s", key);

        NAPIValue result;
        napi_get_named_property(*env, *napiValue, key, &result);
        HMValue *value = toValue(env, &result);
//        debug("JSUtils::toObject() value=%s", value->toString().c_str());
        if (value != nullptr) {
//            info("JSUtils::toObject() hmObject->setValue:: key=%s,v=%s", key, value->toString().c_str());
            hmObject->setValue(key, value);
        }
    }
    return hmObject;
}


bool JSUtils::isFloatNumber(NAPIEnv *env, NAPIValue *napiValue) {
    NAPIValue global;
    napi_get_global(*env, &global);
    NAPIValue object;
    napi_get_named_property(*env, global, "Number", &object);
    NAPIValue isFiniteFunc;
    napi_get_named_property(*env, object, "isInteger", &isFiniteFunc);

    size_t argc = 1;
    NAPIValue result;
    napi_call_function(*env, nullptr, isFiniteFunc, argc, napiValue, &result);
    bool isFinite = false;
    napi_get_value_bool(*env, result, &isFinite);
    return !isFinite;
}


HMValue *JSUtils::toValue(NAPIEnv *env, NAPIValue *napiValue) {
    NAPIValueType valueType;
    napi_typeof(*env, *napiValue, &valueType);

    HMValue *hmValue = nullptr;
//    debug("JSUtils::toValue()");

    switch (valueType) {
        case NAPIBoolean:
            bool data;
            napi_get_value_bool(*env, *napiValue, &data);
            hmValue = new HMBoolean(data);
//            debug("JSUtils::toValue()  new HMBoolean(data)");
            break;
        case NAPIUndefined:
            hmValue = new HMValue(TYPE_NAPIUndefined);
//            debug("JSUtils::toValue() NAPIUndefined. ");
            break;
        case NAPINull:
            hmValue = new HMValue(TYPE_NULL);
//            debug("JSUtils::toValue() NAPINull. ");
            break;
        case NAPINumber:
            double dataNumber;
            bool isFloat;
            napi_get_value_double(*env, *napiValue, &dataNumber);
            isFloat = isFloatNumber(env, napiValue);
            hmValue = new HMNumber(dataNumber,isFloat);
//            debug("JSUtils::toValue()  new HMNumber(data) value=%f,float=%d", dataNumber, 1);
            break;
        case NAPIString:
            const char *valueString;
            NAPIGetValueStringUTF8(*env, *napiValue, &valueString);
            //需要copy数据

            hmValue = new HMString(valueString);
            NAPIFreeUTF8String(*env, valueString);
//            debug("JSUtils::toValue()  new HMString(data)");
            break;
        case NAPIObject:
            bool isArray;
            napi_is_array(*env, *napiValue, &isArray);
            if (isArray) {
                hmValue = (HMValue *) toArray(env, napiValue);
//                debug("JSUtils::toValue()  >> toArray(data)");
            } else {
                hmValue = (HMValue *) toObject(env, napiValue);
//                debug("JSUtils::toValue()  >> toObject(data)");
            }
            break;
        case NAPIFunction:
            hmValue = new HMValue(TYPE_NAPIFunction);
//            debug("JSUtils::toValue() NAPIFunction. ");
            break;
        case NAPIExternal:
            hmValue = new HMValue(TYPE_NAPIExternal);
//            debug("JSUtils::toValue() NAPIExternal. ");
            break;
        default:
            hmValue = new HMValue();
    }
    return hmValue;
}


void JSUtils::toJSValue(NAPIEnv *env, HMValue *hmValue, NAPIValue *napiValue) {
    if (hmValue == nullptr) {
        return;
    }
    NAPIExceptionStatus status;
    ValueType valueType = hmValue->getType();
    switch (valueType) {
        case TYPE_OBJECT: {
            HMObject *hmObject = (HMObject *) hmValue;
            status = JSUtils::createObject(env, "Object", 0, nullptr, napiValue);
            map<string, HMValue *> valueMap = hmObject->valueMap_;
            for (auto it = valueMap.begin(); it != valueMap.end(); it++) {
                string key = it->first;
                HMValue *value = it->second;
                NAPIValue jsValue;
                toJSValue(env, value, &jsValue);
                setProperty(env, napiValue, key.c_str(), &jsValue);
            }
        }
            break;
        case TYPE_ARRAY: {
            HMArray *hmArray = (HMArray *) hmValue;
            status = JSUtils::createObject(env, "Array", 0, nullptr, napiValue);
            list<HMValue *> valueList = hmArray->valueList;
            for (auto it = valueList.begin(); it != valueList.end(); it++) {
                HMValue *value = *it;
                NAPIValue jsValue;
                //TODO
                toJSValue(env, value, &jsValue);
//                setProperty(env, napiValue, key.c_str(), &jsValue);
            }
        }
            break;
        case TYPE_STRING: {
            HMString *hmString = (HMString *) hmValue;
            status = napi_create_string_utf8(*env, hmString->value_.c_str(), napiValue);
        }
            break;
        case TYPE_NUMBER: {
            HMNumber *value = (HMNumber *) hmValue;
            napi_create_double(*env, value->value_, napiValue);
        }
            break;
        case TYPE_BOOLEAN: {
            HMBoolean *hmBoolean = (HMBoolean *) hmValue;
            napi_get_boolean(*env, hmBoolean->value_, napiValue);
        }
            break;
        case TYPE_NAPIFunction: {
            HMFunction *hmBoolean = (HMFunction *) hmValue;

        }
            break;

    }

}

JSError *JSUtils::getAndClearLastError(NAPIEnv *env) {
    NAPIValue errorValue;
    auto status = napi_get_and_clear_last_exception(*env, &errorValue);
    if (status != NAPIErrorOK) {
        return nullptr;
    }
    JSError *jsError = new JSError();

    const char *name = getPropertyToCString(env, &errorValue, "name");
    const char *message = getPropertyToCString(env, &errorValue, "message");
    const char *stack = getPropertyToCString(env, &errorValue, "stack");

    jsError->name = string(name);
    jsError->message = string(message);
    jsError->stack = string(stack);

    return jsError;
}

void JSUtils::registerFunction(NAPIEnv *env, NAPIValue *target, const char *functionName, NAPICallback callback, void *data) {
    //createElement
    NAPIExceptionStatus status;
    NAPIValue createElementFunction;
    status = napi_create_function(*env, functionName, callback, data, &createElementFunction);
    if (status != NAPIExceptionOK) {
        error("JSUtils::registerFunction() napi_create_function error. %d", status);
    }

    info("JSUtils::registerFunction() functionName=%s data=%u", functionName, (uintptr_t) data);

    status = JSUtils::setProperty(env, target, functionName, &createElementFunction);
    if (status != NAPIExceptionOK) {
        error("JSUtils::registerFunction() setProperty error. %d", status);
    }
}

void JSUtils::openHandleScope(NAPIEnv *env, NAPIHandleScope *handleScope) {
    napi_open_handle_scope(*env, handleScope);
}

void JSUtils::closeHandleScope(NAPIEnv *env, NAPIHandleScope *handleScope) {
    napi_close_handle_scope(*env, *handleScope);
}








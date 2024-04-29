//
// Created by didi on 2023/11/29.
//


#include "jsi/jsi_utils.h"
#include "jsi/jsi.h"


NAPIErrorStatus JSUtils::createJsNumber(NAPIEnv *env, double value, NAPIValue *result) {
    return napi_create_double(*env, value, result);
}

NAPIExceptionStatus JSUtils::createJsString(NAPIEnv *env, const char *value, NAPIValue *result) {
    return napi_create_string_utf8(*env, value, result);
}

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

NAPIExceptionStatus JSUtils::deleteProperty(NAPIEnv *env, NAPIValue *obj, const char *name, bool *value) {
    NAPIValue property;
    napi_create_string_utf8(*env, name, &property);
    return napi_delete_property(*env, *obj, property, value);
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

NAPIExceptionStatus JSUtils::deleteGlobalProperty(NAPIEnv *env, const char *name, bool *value) {
    NAPIValue global;
    napi_get_global(*env, &global);
    NAPIValue property;
    napi_create_string_utf8(*env, name, &property);
    return napi_delete_property(*env, global, property, value);
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

NAPIExceptionStatus JSUtils::createExternal(NAPIEnv *env, void *finalizeData, JsiFinalize finalizeCB, void *finalizeHint, NAPIValue *result) {
    return napi_create_external(*env, finalizeData, finalizeCB, finalizeHint, result);
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

JsiArray *JSUtils::toArray(NAPIEnv *env, const NAPIValue *napiValue) {
    NAPIValue object;
    napi_get_named_property(*env, *napiValue, "length", &object);
    double length;
    napi_get_value_double(*env, object, &length);

    JsiArray *hmArray = new JsiArray();

    for (int i = 0; i < length; i++) {
        NAPIValue index;
        napi_create_double(*env, i, &index);
        NAPIValue value;
        napi_get_property(*env, *napiValue, index, &value);
        JsiValue *hmValue = toValue(env, &value);
        hmArray->pushValue(hmValue);
    }
    return hmArray;
}

JsiObject *JSUtils::toObject(NAPIEnv *env, const NAPIValue *napiValue) {
    NAPIValue global;
    napi_get_global(*env, &global);
    NAPIValue object;
    napi_get_named_property(*env, global, "Object", &object);
    NAPIValue keysFunc;
    napi_get_named_property(*env, object, "keys", &keysFunc);

    size_t argc = 1;
    NAPIValue keysValue;
    NAPIExceptionStatus status = napi_call_function(*env, nullptr, keysFunc, argc, napiValue, &keysValue);
    if (status != NAPIExceptionOK) {
        warn("JSUtils::toObject() call keys() function error. status=%u", status);
    }

    bool isElement = false;
    NAPIValue finalize;
    status = napi_get_named_property(*env, *napiValue, "__finalize__", &finalize);
    if (status != NAPIExceptionOK) {
        warn("JSUtils::toObject() get __finalize__ error. status=%u", status);
    } else {
        NAPIValueType valueType;
        NAPICommonStatus status = napi_typeof(*env, finalize, &valueType);
        //warn("JSUtils::toObject()  finalize  type=%u", valueType);
        if (valueType == NAPIExternal) {
            isElement = true;
        }
    }
    if (isElement) {
        JsiObject *hmObject = new JsiObject();
        NAPIValue result;
        napi_get_named_property(*env, *napiValue, "__finalize__", &result);
        JsiValue *value = toValue(env, &result);
        if (value != nullptr) {
            hmObject->setValue("__finalize__", value);
        }
        return hmObject;
    }

    list<char *> keys = toStringArray(env, &keysValue);

    JsiObject *hmObject = new JsiObject();
    for (auto it = keys.begin(); it != keys.end(); ++it) {
        char *key = *it;
        NAPIValue result;
        napi_get_named_property(*env, *napiValue, key, &result);
        JsiValue *value = toValue(env, &result);
        if (value != nullptr) {
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
    NAPIExceptionStatus status = napi_call_function(*env, nullptr, isFiniteFunc, argc, napiValue, &result);
    if (status != NAPIExceptionOK) {
        warn("JSUtils::isFloatNumber() call isInteger() function error. status=%u", status);
    }
    bool isInteger = false;
    napi_get_value_bool(*env, result, &isInteger);
    return !isInteger;
}


JsiValue *JSUtils::toValue(NAPIEnv *env, NAPIValue *value) {
    NAPIValueType valueType;
    if (*value == NULL) {
        error("JSUtils::toValue()  napi_typeof() error. status=%u", 100);
        return  new JsiValue();
    }
    NAPICommonStatus status = napi_typeof(*env, *value, &valueType);
    if (status != NAPICommonOK) {
        warn("JSUtils::toValue()  napi_typeof() error. status=%u", status);
    }

    JsiValue *jsiValue = nullptr;
    switch (valueType) {
        case NAPIBoolean: {
            bool data;
            napi_get_value_bool(*env, *value, &data);
            jsiValue = new JsiBoolean(data);
        }
            break;
        case NAPIUndefined: {
            jsiValue = new JsiValue(TYPE_NAPIUndefined);
        }
            break;
        case NAPINull: {
            jsiValue = new JsiValue(TYPE_NULL);
        }
            break;
        case NAPINumber: {
            double dataNumber;
            napi_get_value_double(*env, *value, &dataNumber);
//            bool isFloat;
//            isFloat = isFloatNumber(env, value);
//            hmValue = new JsiNumber(dataNumber, isFloat);
            jsiValue = new JsiNumber(dataNumber);
        }
            break;
        case NAPIString: {
            const char *valueString;
            NAPIGetValueStringUTF8(*env, *value, &valueString);
            //需要copy数据
            jsiValue = new JsiString(valueString);
            NAPIFreeUTF8String(*env, valueString);
        }
            break;
        case NAPIObject: {
            bool isArray;
            napi_is_array(*env, *value, &isArray);
            if (isArray) {
                jsiValue = (JsiValue *) toArray(env, value);
            } else {
                jsiValue = (JsiValue *) toObject(env, value);
            }
        }
            break;
        case NAPIFunction: {
            jsiValue = new JsiFunction(value, env);
        }
            break;
        case NAPIExternal: {
            //debug("JSUtils::toValue() NAPIExternal. ");
            NAPIValue finalizeValue;
            finalizeValue = *value;
            void *data = nullptr;
            if (finalizeValue != nullptr) {
                NAPIErrorStatus status = napi_get_value_external(*env, finalizeValue, &data);
                if (status != NAPIErrorOK) {
                    JsiError *error = getAndClearLastError(env);
                    warn("JSUtils::toValue() napi_get_value_external error. %s", error->toCString());
                    return nullptr;
                }
                JsiValueExt *jsiValueExt = new JsiValueExt(nullptr);
                jsiValueExt->data = data;
                jsiValue = jsiValueExt;
            }
        }
            break;
        default:
            jsiValue = new JsiValue();
    }
    return jsiValue;
}


/**
 * JsiValue转NAPIValue
 *
 * @param env
 * @param jsiValue
 * @param result
 */
void JSUtils::toJSValue(NAPIEnv *env, JsiValue *jsiValue, NAPIValue *result) {
    if (jsiValue == nullptr) {
        return;
    }
    ValueType valueType = jsiValue->getType();
    switch (valueType) {
        case TYPE_OBJECT: {
            JsiObject *hmObject = (JsiObject *) jsiValue;
            NAPIExceptionStatus status = JSUtils::createObject(env, "Object", 0, nullptr, result);
            if (status != NAPIExceptionOK) {
                JsiError *error = getAndClearLastError(env);
                warn("JSUtils::toJSValue() error. %s", error->toString().c_str());
            }
            map<string, JsiValue *> valueMap = hmObject->valueMap_;
            for (auto it = valueMap.begin(); it != valueMap.end(); it++) {
                string key = it->first;
                JsiValue *value = it->second;
                NAPIValue jsValue = nullptr;
                toJSValue(env, value, &jsValue);
                if (jsValue == nullptr) {
                    napi_get_undefined(*env, &jsValue);
                    warn("JSUtils::toJSValue() %s:%s can not to JSValue", key.c_str(), value->toString().c_str());
                }
                setProperty(env, result, key.c_str(), &jsValue);
            }
        }

            break;
        case TYPE_ARRAY: {
            JsiArray *hmArray = (JsiArray *) jsiValue;
            NAPIExceptionStatus status = JSUtils::createObject(env, "Array", 0, nullptr, result);
            if (status != NAPIExceptionOK) {
                JsiError *error = getAndClearLastError(env);
                warn("JSUtils::toJSValue() TYPE_ARRAY new Array() error. %s", error->toCString());
            }

            list<JsiValue *> valueList = hmArray->valueList;

            NAPIValue pushFunc;
            status = napi_get_named_property(*env, *result, "push", &pushFunc);
            if (status != NAPIExceptionOK) {
                JsiError *error = getAndClearLastError(env);
                warn("JSUtils::toJSValue() TYPE_ARRAY get push() error. %s", error->toCString());
            }

            for (auto it = valueList.begin(); it != valueList.end(); it++) {
                JsiValue *value = *it;
                NAPIValue jsValue;
                toJSValue(env, value, &jsValue);
//                setProperty(env, napiValue, key.c_str(), &jsValue);
                status = napi_call_function(*env, *result, pushFunc, 1, &jsValue, nullptr);
                if (status != NAPIExceptionOK) {
                    JsiError *error = getAndClearLastError(env);
                    warn("JSUtils::toJSValue() TYPE_ARRAY call push() error. %s", error->toCString());
                }
            }
        }
            break;
        case TYPE_STRING: {
            JsiString *hmString = (JsiString *) jsiValue;
            NAPIExceptionStatus status = napi_create_string_utf8(*env, hmString->value_.c_str(), result);
            if (status != NAPIExceptionOK) {
                JsiError *error = getAndClearLastError(env);
                warn("JSUtils::toJSValue() TYPE_STRING %s", error->toCString());
            }
        }
            break;
        case TYPE_NUMBER: {
            JsiNumber *value = (JsiNumber *) jsiValue;
            NAPIErrorStatus status = napi_create_double(*env, value->value_, result);
            if (status != NAPIExceptionOK) {
                JsiError *error = getAndClearLastError(env);
                warn("JSUtils::toJSValue() TYPE_NUMBER call error. %s", error->toCString());
            }
        }
            break;
        case TYPE_BOOLEAN: {
            JsiBoolean *hmBoolean = (JsiBoolean *) jsiValue;
            NAPIErrorStatus status = napi_get_boolean(*env, hmBoolean->value_, result);
            if (status != NAPIExceptionOK) {
                JsiError *error = getAndClearLastError(env);
                warn("JSUtils::toJSValue() TYPE_NUMBER call error. %s", error->toCString());
            }
        }
            break;
        case TYPE_NAPIFunction: {
            JsiFunction *jsiFunction = (JsiFunction *) jsiValue;
        }
            break;
        case TYPE_EXT: {
            //JsiValueExt内部持有的NAPIValue直接返回
            JsiValueExt *valueExt = (JsiValueExt *) jsiValue;
            valueExt->value_->toJsValue(result);
        }
            break;
        default: {
            result = nullptr;
        }
    }

}

JsiError *JSUtils::getAndClearLastError(NAPIEnv *env) {
    NAPIValue errorValue;
    auto status = napi_get_and_clear_last_exception(*env, &errorValue);
    if (status != NAPIErrorOK) {
        return nullptr;
    }
    JsiError *jsError = new JsiError();

    const char *name = getPropertyToCString(env, &errorValue, "name");
    const char *message = getPropertyToCString(env, &errorValue, "message");
    const char *stack = getPropertyToCString(env, &errorValue, "stack");

    jsError->name = string(name);
    jsError->message = string(message);
    jsError->stack = string(stack != NULL ? stack : "");

    return jsError;
}

void JSUtils::registerFunction(NAPIEnv *env, NAPIValue *target, const char *functionName, NAPICallback callback, void *data) {
    //registerFunction
    NAPIExceptionStatus status;
    NAPIValue targetFunction;
    status = napi_create_function(*env, functionName, callback, data, &targetFunction);
    if (status != NAPIExceptionOK) {
        error("JSUtils::registerFunction() napi_create_function error. %d", status);
    }

//    info("JSUtils::registerFunction() functionName=%s data=%u", functionName, (uintptr_t) data);

    status = JSUtils::setProperty(env, target, functionName, &targetFunction);
    if (status != NAPIExceptionOK) {
        error("JSUtils::registerFunction() setProperty error. status=%d", status);
        JsiError *jsiError = getAndClearLastError(env);
        if (jsiError != nullptr) {
            error("JSUtils::registerFunction() setProperty error. %s", jsiError->toString().c_str());
        }
    }
}

void JSUtils::openHandleScope(NAPIEnv *env, NAPIHandleScope *handleScope) {
    napi_open_handle_scope(*env, handleScope);
}

void JSUtils::closeHandleScope(NAPIEnv *env, NAPIHandleScope *handleScope) {
    napi_close_handle_scope(*env, *handleScope);
}

string JSUtils::buildArrayString(size_t argc, JsiValue **argv) {
    if (argc == 0) {
        return "[]";
    }
    string sb = string("[");
    for (int i = 0; i < argc; i++) {
        if (i > 0) {
            sb.append(",");
        }
        sb.append(argv[i]->toString());
    }
    sb.append("]");
    return sb;
}










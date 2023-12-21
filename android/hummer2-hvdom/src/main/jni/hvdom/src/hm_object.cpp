//
// Created by didi on 2023/11/22.
//

#include "hvdom/hm_object_pools.h"
#include "hvdom/hm_object.h"

#include "hvdom/vdom_element.h"

#include "hvdom/vdom_logger.h"


HMObjectPools *objectPools = new HMObjectPools();


const char *getTypeValueName(ValueType type) {
    switch (type) {
        case TYPE_VALUE:
            return "TYPE_VALUE";
        case TYPE_BOOLEAN:
            return "TYPE_BOOLEAN";
        case TYPE_NUMBER:
            return "TYPE_NUMBER";
        case TYPE_STRING:
            return "TYPE_STRING";
        case TYPE_OBJECT:
            return "TYPE_OBJECT";
        case TYPE_ARRAY:
            return "TYPE_ARRAY";
        case TYPE_NULL:
            return "TYPE_NULL";
        case TYPE_NAPIExternal:
            return "TYPE_NAPIExternal";
        case TYPE_NAPIFunction:
            return "TYPE_NAPIFunction";
        case TYPE_NAPIUndefined:
            return "TYPE_NAPIUndefined";
    }
    return "";
}

HMValue::HMValue() {

}

HMValue::HMValue(ValueType type) {
    type_ = type;
}


ValueType HMValue::getType() {
    return type_;
}

string HMValue::toString() const {
    return string("{\"type\":\"").append(getTypeValueName(type_)).append(+"\"}");
}

void HMValue::protect() {
    if (refCount_ == 0) {
        objectPools->protect(this);
    }
    refCount_++;
    info("HMValue::protect() refCount_=%d", refCount_);

}

void HMValue::unprotect() {
    refCount_--;
    if (refCount_ == 0) {
        objectPools->unprotect(this);
    }
    info("HMValue::unprotect() refCount_=%d", refCount_);
}

HMValue::~HMValue() {

}


HMFunction::HMFunction() {
    type_ = TYPE_NAPIFunction;
}

HMFunction::HMFunction(NAPIValue* napiValue, NAPIEnv *env) {
    env_ = *env;
    type_ = TYPE_NAPIFunction;
}


HMValue *HMFunction::call(HMValue *hmValue) {

    size_t argc = 1;
    NAPIValue value;

    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env_, &handleScope);

    JSUtils::toJSValue(&env_, hmValue, &value);

    const NAPIValue argv[1] = {value};

    NAPIValue func;
    napi_get_reference_value(env_, ref_, &func);


    error("HMFunction::call() hmValue=%s", hmValue->toString().c_str());
    NAPIValue result;
    napi_call_function(env_, nullptr, func, argc, argv, &result);


    HMValue *resultValue = JSUtils::toValue(&env_, &result);
    JSUtils::closeHandleScope(&env_, &handleScope);
    if (resultValue->getType() != TYPE_NAPIUndefined) {
        return resultValue;
    }
    return nullptr;
}

string HMFunction::toString() const {
    return HMValue::toString();
}

HMFunction::~HMFunction() {

}


HMString::HMString() {
    type_ = TYPE_STRING;
}

HMString::HMString(const char *value) {
    type_ = TYPE_STRING;
    value_ = value;
}

string HMString::toString() const {
    return string("\"").append(value_).append("\"");
}

HMString::~HMString() {

}

HMObject::HMObject() {
    type_ = TYPE_OBJECT;
}

string HMObject::toString() const {
    string text = string("{");
    auto it = valueMap_.begin();
    bool first = true;
    while (it != valueMap_.end()) {
        HMValue *hmValue = (HMValue *) it->second;
        if (!first) {
            text.append(",");
        }
        text.append("\"" + it->first + "\":" + hmValue->toString());
        it++;
        first = false;
    }
    text.append("}");
    return text;
}


HMValue *HMObject::getValue(string key) {
    auto it = valueMap_.find(key);
    if (it != valueMap_.end()) {
        HMValue *hmValue = (HMValue *) it->second;
        return hmValue;
    }
    return nullptr;
}

void HMObject::setValue(string key, HMValue *hmValue) {
    valueMap_.insert(make_pair(key, hmValue));
    typeMap_.insert(make_pair(key, hmValue->getType()));
}


ValueType HMObject::getValueType(string key) {
    auto it = typeMap_.find(key);
    if (it != typeMap_.end()) {
        ValueType type = it->second;
        return type;
    }
}

bool HMObject::isBoolean(string key) {
    auto it = typeMap_.find(key);
    if (it != typeMap_.end()) {
        ValueType type = it->second;
        return (type == TYPE_BOOLEAN);
    }
    return false;
}

bool HMObject::isNumber(string key) {
    auto it = typeMap_.find(key);
    if (it != typeMap_.end()) {
        ValueType type = it->second;
        return (type == TYPE_NUMBER);
    }
    return false;
}

bool HMObject::isString(string key) {
    auto it = typeMap_.find(key);
    if (it != typeMap_.end()) {
        ValueType type = it->second;
        return (type == TYPE_STRING);
    }
    return false;
}

bool HMObject::isObject(string key) {
    auto it = typeMap_.find(key);
    if (it != typeMap_.end()) {
        ValueType type = it->second;
        return (type == TYPE_OBJECT);
    }
    return false;
}

bool HMObject::isArray(string key) {
    auto it = typeMap_.find(key);
    if (it != typeMap_.end()) {
        ValueType type = it->second;
        return (type == TYPE_ARRAY);
    }
    return false;
}

bool HMObject::getBoolean(string key) {
    auto it = valueMap_.find(key);
    if (it != valueMap_.end()) {
        HMValue *hmValue = (HMValue *) it->second;
        if (hmValue->getType() == TYPE_BOOLEAN) {
            return ((HMBoolean *) hmValue)->value_;
        }
    }
    return false;
}

double HMObject::getNumber(string key) {
    auto it = valueMap_.find(key);
    if (it != valueMap_.end()) {
        HMValue *hmValue = (HMValue *) it->second;
        if (hmValue->getType() == TYPE_NUMBER) {
            return ((HMNumber *) hmValue)->value_;
        }
    }
    return 0;
}

string HMObject::getString(string key) {
    auto it = valueMap_.find(key);
    if (it != valueMap_.end()) {
        HMValue *hmValue = (HMValue *) it->second;
        if (hmValue->getType() == TYPE_STRING) {
            return ((HMString *) hmValue)->value_;
        }
    }
    return nullptr;
}

HMValue *HMObject::getObject(string key) {
    auto it = valueMap_.find(key);
    if (it != valueMap_.end()) {
        HMValue *hmValue = (HMValue *) it->second;
        if (hmValue->getType() == TYPE_OBJECT) {
            return (HMObject *) hmValue;
        }
    }
    return nullptr;
}


HMArray *HMObject::getArray(string key) {
    auto it = valueMap_.find(key);
    if (it != valueMap_.end()) {
        HMValue *hmValue = (HMValue *) it->second;
        if (hmValue->getType() == TYPE_ARRAY) {
            return (HMArray *) hmValue;
        }
    }
    return nullptr;
}

HMArray *HMObject::allKeys() {
    HMArray *hmArray = new HMArray();
    auto it = valueMap_.begin();
    if (it != valueMap_.end()) {
        hmArray->addValue(new HMString(it->first.c_str()));
    }
    return hmArray;
}

void HMObject::removeValue(string key) {
    auto it = valueMap_.find(key);
    if (it != valueMap_.end()) {
        valueMap_.erase(it);
    }
}


HMObject::~HMObject() {

}

HMArray::HMArray() {
    type_ = TYPE_ARRAY;
}


string HMArray::toString() const {
    string text = string("[");

    auto it = valueList.begin();
    bool first = true;
    while (it != valueList.end()) {
        HMValue *hmValue = reinterpret_cast<HMValue *> (*it);
        if (!first) {
            text.append(",");
        }
        text.append(hmValue->toString());
        it++;
        first = false;
    }
    text.append("]");
    return text;
}

HMArray::~HMArray() {

}

int HMArray::length() {
    return static_cast<int>(valueList.size());
}

HMValue *HMArray::getValue(int index) {
    size_t indexToAccess = index;
    auto it = valueList.begin();
    std::advance(it, indexToAccess);
    HMValue *hmValue = reinterpret_cast<HMValue *>(*it);
    return hmValue;
}

void HMArray::setValue(int index, HMValue *hmValue) {
    size_t indexToAccess = index;
    auto it = valueList.begin();
    advance(it, indexToAccess);
    valueList.insert(it, hmValue);
}

void HMArray::addValue(HMValue *hmValue) {
    valueList.push_back(hmValue);
}

void HMArray::removeValue(int index) {
    size_t indexToAccess = index;
    auto it = valueList.begin();
    std::advance(it, indexToAccess);
    valueList.erase(it);
}

void HMArray::removeValue(HMValue *hmValue) {
    valueList.remove(hmValue);
}

HMNumber::HMNumber() {
    value_ = 0;
}

HMNumber::HMNumber(double value) {
    value_ = value;
    isFloat_ = true;
    type_ = TYPE_NUMBER;
}

HMNumber::HMNumber(double value, bool isFloat) {
    value_ = value;
    isFloat_ = isFloat;
    type_ = TYPE_NUMBER;
}

string HMNumber::toString() const {
    if (isFloat_) {
        return string(to_string(value_));
    }
    return string(to_string((long) value_));
}

HMNumber::~HMNumber() {

}

HMBoolean::HMBoolean() {
    value_ = false;
    type_ = TYPE_BOOLEAN;
}

HMBoolean::HMBoolean(bool value) {
    value_ = value;
    type_ = TYPE_BOOLEAN;
}

string HMBoolean::toString() const {
    return string(value_ ? "true" : "false");
}

HMBoolean::~HMBoolean() {
    value_ = false;
}


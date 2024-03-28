//
// Created by didi on 2023/11/22.
//

#include "jsi/jsi_value.h"
#include "jsi/jsi_utils.h"

#include "falcon/logger.h"


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
        case TYPE_COMPONENT:
            return "TYPE_COMPONENT";
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


//*******************************************************************************
//                                     JsiValue
//*******************************************************************************


JsiValue::JsiValue() {

}

JsiValue::JsiValue(ValueType type) {
    type_ = type;
}


ValueType JsiValue::getType() {
    return type_;
}

string JsiValue::toString() const {
    return string("{\"type\":\"").append(getTypeValueName(type_)).append(+"\"}");
}

void JsiValue::protect() {
    if (refCount_ == 0) {
//        objectPools->protect(this);
    }
    refCount_++;
//    info("HMValue::protect() refCount_=%d", refCount_);

}

void JsiValue::unprotect() {
    refCount_--;
    if (refCount_ == 0) {
//        objectPools->unprotect(this);
    }
//    info("HMValue::unprotect() refCount_=%d", refCount_);
}

JsiValue::~JsiValue() {

}


//*******************************************************************************
//                                     JsiFunction
//*******************************************************************************



JsiFunction::JsiFunction() {
    type_ = TYPE_NAPIFunction;
}

JsiFunction::JsiFunction(NAPIValue *napiValue, NAPIEnv *env) {
    env_ = *env;
    type_ = TYPE_NAPIFunction;
}


JsiValue *JsiFunction::call(JsiValue *hmValue) {

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


    JsiValue *resultValue = JSUtils::toValue(&env_, &result);
    JSUtils::closeHandleScope(&env_, &handleScope);
    if (resultValue->getType() != TYPE_NAPIUndefined) {
        return resultValue;
    }
    return nullptr;
}

string JsiFunction::toString() const {
    return JsiValue::toString();
}

JsiFunction::~JsiFunction() {

}


//*******************************************************************************
//                                     JsiString
//*******************************************************************************


JsiString::JsiString() {
    type_ = TYPE_STRING;
}

JsiString::JsiString(const char *value) {
    type_ = TYPE_STRING;
    value_ = value;
}

string JsiString::toString() const {
    return string("\"").append(value_).append("\"");
}

JsiString::~JsiString() {

}


//*******************************************************************************
//                                     JsiObject
//*******************************************************************************


JsiObject::JsiObject() {
    type_ = TYPE_OBJECT;
}

string JsiObject::toString() const {
    string text = string("{");
    auto it = valueMap_.begin();
    bool first = true;
    while (it != valueMap_.end()) {
        JsiValue *hmValue = (JsiValue *) it->second;
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


JsiValue *JsiObject::getValue(string key) {
    auto it = valueMap_.find(key);
    if (it != valueMap_.end()) {
        JsiValue *hmValue = (JsiValue *) it->second;
        return hmValue;
    }
    return nullptr;
}

void JsiObject::setValue(string key, JsiValue *hmValue) {
    valueMap_.insert(make_pair(key, hmValue));
}


ValueType JsiObject::getValueType(string key) {
    auto it = valueMap_.find(key);
    if (it != valueMap_.end()) {
        ValueType type = it->second->getType();
        return type;
    }
}

bool JsiObject::isBoolean(string key) {
    ValueType type = getValueType(key);
    return (type == TYPE_BOOLEAN);
}

bool JsiObject::isNumber(string key) {
    ValueType type = getValueType(key);
    return (type == TYPE_NUMBER);
}

bool JsiObject::isString(string key) {
    ValueType type = getValueType(key);
    return (type == TYPE_STRING);
}

bool JsiObject::isObject(string key) {
    ValueType type = getValueType(key);
    return (type == TYPE_OBJECT);
}

bool JsiObject::isArray(string key) {
    ValueType type = getValueType(key);
    return (type == TYPE_ARRAY);
}

bool JsiObject::getBoolean(string key) {
    JsiValue *value = getValue(key);
    if (value->getType() == TYPE_BOOLEAN) {
        return ((JsiBoolean *) value)->value_;
    }
    return false;
}

double JsiObject::getNumber(string key) {
    JsiValue *value = getValue(key);
    if (value->getType() == TYPE_BOOLEAN) {
        return ((JsiNumber *) value)->value_;
    }
    return 0;
}

string JsiObject::getString(string key) {
    JsiValue *value = getValue(key);
    if (value->getType() == TYPE_STRING) {
        return ((JsiString *) value)->value_;
    }
    return "";
}

JsiValue *JsiObject::getObject(string key) {
    JsiValue *value = getValue(key);
    if (value->getType() == TYPE_OBJECT) {
        return ((JsiObject *) value);
    }
    return nullptr;
}


JsiArray *JsiObject::getArray(string key) {
    JsiValue *value = getValue(key);
    if (value->getType() == TYPE_ARRAY) {
        return ((JsiArray *) value);
    }
    return nullptr;
}

JsiArray *JsiObject::allKeysArray() {
    JsiArray *hmArray = new JsiArray();
    auto it = valueMap_.begin();
    if (it != valueMap_.end()) {
        hmArray->pushValue(new JsiString(it->first.c_str()));
    }
    return hmArray;
}


list<string> JsiObject::allKeys() {
    list<string> hmArray;
    auto it = valueMap_.begin();
    if (it != valueMap_.end()) {
        hmArray.push_back(it->first);
    }
    return hmArray;
}

void JsiObject::removeValue(string key) {
    auto it = valueMap_.find(key);
    if (it != valueMap_.end()) {
        valueMap_.erase(it);
    }
}


JsiObject::~JsiObject() {

}


//*******************************************************************************
//                                     JsiArray
//*******************************************************************************



JsiArray::JsiArray() {
    type_ = TYPE_ARRAY;
}


string JsiArray::toString() const {
    string text = string("[");

    auto it = valueList.begin();
    bool first = true;
    while (it != valueList.end()) {
        JsiValue *hmValue = reinterpret_cast<JsiValue *> (*it);
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

JsiArray::~JsiArray() {

}

int JsiArray::length() {
    return static_cast<int>(valueList.size());
}

JsiValue *JsiArray::getValue(int index) {
    size_t indexToAccess = index;
    auto it = valueList.begin();
    std::advance(it, indexToAccess);
    JsiValue *hmValue = reinterpret_cast<JsiValue *>(*it);
    return hmValue;
}

void JsiArray::setValue(int index, JsiValue *hmValue) {
    size_t indexToAccess = index;
    auto it = valueList.begin();
    advance(it, indexToAccess);
    valueList.insert(it, hmValue);
}

void JsiArray::removeValueAt(int index) {
    size_t indexToAccess = index;
    auto it = valueList.begin();
    std::advance(it, indexToAccess);
    valueList.erase(it);
}

void JsiArray::removeValue(JsiValue *hmValue) {
    valueList.remove(hmValue);
}

void JsiArray::pushValue(JsiValue *hmValue) {
    valueList.push_back(hmValue);
}

JsiValue *JsiArray::popValue() {
    auto it = valueList.rbegin();
    JsiValue *value = reinterpret_cast<JsiValue *>(*it);
    valueList.pop_back();
    return value;
}

void JsiArray::clear() {
    valueList.clear();
}



//*******************************************************************************
//                                     JsiNumber
//*******************************************************************************

JsiNumber::JsiNumber() {
    value_ = 0;
}

JsiNumber::JsiNumber(double value) {
    value_ = value;
    isFloat_ = true;
    type_ = TYPE_NUMBER;
}

JsiNumber::JsiNumber(double value, bool isFloat) {
    value_ = value;
    isFloat_ = isFloat;
    type_ = TYPE_NUMBER;
}

string JsiNumber::toString() const {
    if (isFloat_) {
        return string(to_string(value_));
    }
    return string(to_string((long) value_));
}

JsiNumber::~JsiNumber() {

}

//*******************************************************************************
//                                     JsiBoolean
//*******************************************************************************

JsiBoolean::JsiBoolean() {
    value_ = false;
    type_ = TYPE_BOOLEAN;
}

JsiBoolean::JsiBoolean(bool value) {
    value_ = value;
    type_ = TYPE_BOOLEAN;
}

string JsiBoolean::toString() const {
    return string(value_ ? "true" : "false");
}

JsiBoolean::~JsiBoolean() {
    value_ = false;
}

JsiComponent::JsiComponent() {
    value_ = 0;
    name_ = "";
    type_ = TYPE_COMPONENT;
}

JsiComponent::JsiComponent(string name, long value) {
    value_ = value;
    name_ = name;
    type_ = TYPE_COMPONENT;
}

string JsiComponent::toString() const {
    return string("{\"type\":\"").append(getTypeValueName(type_))
            .append("\",\"tag\":\"").append(name_)
            .append(+"\"}");
}

JsiComponent::~JsiComponent() {

}

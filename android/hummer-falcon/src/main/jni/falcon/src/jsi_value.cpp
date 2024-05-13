//
// Created by didi on 2023/11/22.
//

#include "jsi/jsi_value.h"
#include "jsi/jsi_utils.h"
#include "jsi/jsi.h"

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
    type_ = TYPE_VALUE;
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

char *JsiValue::toCString() const {
    const char *text = toString().c_str();
    return const_cast<char *>(text);
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
    createReference(napiValue);
}


JsiValue *JsiFunction::call(size_t argc, JsiValue **jsiValue) {
    debug("JsiFunction::call() params=%s", JSUtils::buildArrayString(argc, jsiValue).c_str());

    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env_, &handleScope);

    NAPIValue argv[argc];

    for (int i = 0; i < argc; i++) {
        JSUtils::toJSValue(&env_, jsiValue[i], &argv[i]);
    }

    NAPIValue func;
    napi_get_reference_value(env_, ref_, &func);

    NAPIValue result;
    NAPIExceptionStatus status = napi_call_function(env_, nullptr, func, argc, argv, &result);
    if (status != NAPIExceptionOK) {
        warn("JsiFunction::call() params=%s  error status=%u", JSUtils::buildArrayString(argc, jsiValue).c_str(), status);
        JsiError *jsiError = JSUtils::getAndClearLastError(&env_);
        error("JsiFunction::call() error %s", jsiError->toString().c_str());
        return nullptr;
    }

    JsiValue *resultValue = JSUtils::toValue(&env_, &result);
    JSUtils::closeHandleScope(&env_, &handleScope);
    if (resultValue != nullptr && resultValue->getType() != TYPE_NAPIUndefined) {
        return resultValue;
    }
    return nullptr;
}


void JsiFunction::createReference(NAPIValue *napiValue) {
    NAPIExceptionStatus status = napi_create_reference(env_, *napiValue, 1, &ref_);
    if (status != NAPIExceptionOK) {
        error("JsiFunction::createReference() error. status=%d", status);
    }
}

void JsiFunction::deleteReference() {
    NAPIExceptionStatus status = napi_delete_reference(env_, ref_);
    if (status != NAPIExceptionOK) {
        warn("JsiFunction::deleteReference() error. status=%d", status);
    }
}


string JsiFunction::toString() const {
    return JsiValue::toString();
}

JsiFunction::~JsiFunction() {
    deleteReference();
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
        first = false;
        it++;
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
    auto existing = valueMap_.find(key);
    // 如果key已经存在，则删除旧值
    if (existing != valueMap_.end()) {
        valueMap_.erase(existing);
    }
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
    while (it != valueMap_.end()) {
        hmArray->pushValue(new JsiString(it->first.c_str()));
        ++it;
    }
    return hmArray;
}


list<string> JsiObject::allKeys() {
    list<string> hmArray;
    auto it = valueMap_.begin();
    while (it != valueMap_.end()) {
        hmArray.push_back(it->first);
        ++it;
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

bool isDecimal(double value) {
    // 将 double 值转换为整数
    int intPart = static_cast<int>(value);
    // 如果转换后的整数与原始值相等，则说明原始值是一个整数，否则是一个小数
    return value != intPart;
}

JsiNumber::JsiNumber() {
    value_ = 0;
    type_ = TYPE_NUMBER;
}

JsiNumber::JsiNumber(double value) {
    value_ = value;
    isFloat_ = isDecimal(value);
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
    string text = to_string(value_);
    size_t pos = text.find('.');
    return string(text.substr(0, pos));
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

//*******************************************************************************
//                                     JsiComponent
//*******************************************************************************


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


//*******************************************************************************
//                                     JsiCallback
//*******************************************************************************


JsiCallback::JsiCallback() {
    type_ = TYPE_COMPONENT;
}


JsiValue *JsiCallback::call(size_t argc, JsiValue **argv) {
    return nullptr;
}

string JsiCallback::toString() const {
    return string("{\"type\":\"").append(getTypeValueName(type_))
            .append(+"\"}");
}

JsiCallback::~JsiCallback() {

}

//*******************************************************************************
//                                     JsiValueExt
//*******************************************************************************


JsiValueExt::JsiValueExt(JsiObjectEx *value) {
    type_ = TYPE_EXT;
    value_ = value;
}

string JsiValueExt::toString() const {
    return JsiValue::toString();
}

JsiValueExt::~JsiValueExt() {
    value_ = nullptr;
}

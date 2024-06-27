//
// Created by didi on 2023/11/22.
//

#include "jsi/jsi_value.h"
#include "jsi/jsi_utils.h"
#include "jsi/jsi.h"

#include "falcon/logger.h"

#include "napi/js_native_api.h"
#include "napi/js_native_api_types.h"


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
        case TYPE_EXT:
            return "TYPE_EXT";
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
    protect();
}


ValueType JsiValue::getType() {
    return type_;
}

string JsiValue::toString() const {
    return string("{\"type\":\"").append(getTypeValueName(type_)).append(+"\"}");
}


void JsiValue::protect() {
    if (JSI_DEBUG_MEMORY) {
        info("HMValue::protect() addr=%p,count=%d,value=%s", this, refCount_, toString().c_str());
        if (deleted) {
            error("HMValue::protect() is deleted. value=%s", toString().c_str());
        }
    }
    if (refCount_ == 0) {
        JsiValuePools::protect(this);
    }
    refCount_++;

}


void JsiValue::unprotect() {
    if (JSI_DEBUG_MEMORY) {
        info("HMValue::unprotect() addr=%p,count=%d,value=%s", this, refCount_, toString().c_str());
        if (deleted) {
            error("HMValue::unprotect() is deleted. value=%s", toString().c_str());
        }
    }
    refCount_--;
    if (refCount_ <= 0) {
        if (!deleted) {
            deleted = true;
            JsiValuePools::unprotect(this);
        }
    }
}

bool JsiValue::isDeleted() {
    return deleted;
}

JsiValue::~JsiValue() {
    if (JSI_DEBUG_MEMORY) {
        debug("JsiValue::~JsiValue() count=%d", refCount_);
    }
}


//*******************************************************************************
//                                     JsiFunction
//*******************************************************************************


static long JsiFunction_ID = 100;

JsiFunction::JsiFunction() {
    id = ++JsiFunction_ID;
    type_ = TYPE_NAPIFunction;
    enable_ = false;
    protect();
}

JsiFunction::JsiFunction(NAPIValue *napiValue, NAPIEnv *env) {
    id = ++JsiFunction_ID;
    env_ = *env;
    type_ = TYPE_NAPIFunction;
    createReference(napiValue);
    enable_ = true;
    protect();
}


JsiValue *JsiFunction::call(size_t argc, JsiValue **jsiValue) {
    debug("JsiFunction::call() params=%s", JsiUtils::buildArrayString(argc, jsiValue).c_str());

    NAPIHandleScope handleScope;
    JsiUtils::openHandleScope(&env_, &handleScope);

    NAPIValue argv[argc];

    for (int i = 0; i < argc; i++) {
        JsiUtils::toJSValue(&env_, jsiValue[i], &argv[i]);
    }

    NAPIValue func;
    napi_get_reference_value(env_, ref_, &func);

    NAPIValue result;
    NAPIExceptionStatus status = napi_call_function(env_, nullptr, func, argc, argv, &result);
    if (status != NAPIExceptionOK) {
        warn("JsiFunction::call() params=%s  error status=%u", JsiUtils::buildArrayString(argc, jsiValue).c_str(), status);
        JsiError *jsiError = JsiUtils::getAndClearLastError(&env_);
        error("JsiFunction::call() error %s", jsiError->toString().c_str());
        return nullptr;
    }

    JsiValue *resultValue = JsiUtils::toValue(&env_, &result);
    JsiUtils::closeHandleScope(&env_, &handleScope);
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
    NAPIHandleScope handleScope;
    JsiUtils::openHandleScope(&env_, &handleScope);

    NAPIExceptionStatus status = napi_delete_reference(env_, ref_);
    if (status != NAPIExceptionOK) {
        warn("JsiFunction::deleteReference() error. status=%d", status);
    }
    JsiUtils::closeHandleScope(&env_, &handleScope);
    enable_ = false;
}


string JsiFunction::toString() const {
    return JsiValue::toString();
}

JsiFunction::~JsiFunction() {
    if (enable_) {
        deleteReference();
    }

    if (JSI_DEBUG_MEMORY) {
        debug("JsiFunction::~JsiFunction()");
    }
}



//*******************************************************************************
//                                     JsiString
//*******************************************************************************


JsiString::JsiString() {
    type_ = TYPE_STRING;
    protect();
}

JsiString::JsiString(const char *value) {
    type_ = TYPE_STRING;
    value_ = value;
    protect();
}

string JsiString::toString() const {
    return string("\"").append(value_).append("\"");
}

JsiString::~JsiString() {
    if (JSI_DEBUG_MEMORY) {
        debug("JsiString::~JsiString()");
    }
}


//*******************************************************************************
//                                     JsiObject
//*******************************************************************************


JsiObject::JsiObject() {
    type_ = TYPE_OBJECT;
    protect();
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
        existing->second->unprotect();
    }
    valueMap_.insert(make_pair(key, hmValue));
    hmValue->protect();
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
        it->second->unprotect();
    }
}


JsiObject::~JsiObject() {
    auto it = valueMap_.begin();
    while (it != valueMap_.end()) {
        it->second->unprotect();
        ++it;
    }
    valueMap_.clear();
    if (JSI_DEBUG_MEMORY) {
        debug("JsiObject::~JsiObject()");
    }
}


//*******************************************************************************
//                                     JsiArray
//*******************************************************************************



JsiArray::JsiArray() {
    type_ = TYPE_ARRAY;
    protect();
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
    hmValue->protect();
}

void JsiArray::removeValueAt(int index) {
    size_t indexToAccess = index;
    auto it = valueList.begin();
    advance(it, indexToAccess);
    valueList.erase(it);
    (*it)->unprotect();
}

void JsiArray::removeValue(JsiValue *hmValue) {
    valueList.remove(hmValue);
    hmValue->unprotect();
}

void JsiArray::pushValue(JsiValue *hmValue) {
    valueList.push_back(hmValue);
    hmValue->protect();
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

JsiArray::~JsiArray() {
    auto it = valueList.begin();
    while (it != valueList.end()) {
        (*it)->unprotect();
        it++;
    }
    valueList.clear();
    if (JSI_DEBUG_MEMORY) {
        debug("JsiArray::~JsiArray()");
    }
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
    protect();
}

JsiNumber::JsiNumber(double value) {
    value_ = value;
    isFloat_ = isDecimal(value);
    type_ = TYPE_NUMBER;
    protect();
}

JsiNumber::JsiNumber(double value, bool isFloat) {
    value_ = value;
    isFloat_ = isFloat;
    type_ = TYPE_NUMBER;
    protect();
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
    if (JSI_DEBUG_MEMORY) {
        debug("JsiNumber::~JsiNumber()");
    }
}

//*******************************************************************************
//                                     JsiBoolean
//*******************************************************************************

JsiBoolean::JsiBoolean() {
    value_ = false;
    type_ = TYPE_BOOLEAN;
    protect();
}

JsiBoolean::JsiBoolean(bool value) {
    value_ = value;
    type_ = TYPE_BOOLEAN;
    protect();
}

string JsiBoolean::toString() const {
    return string(value_ ? "true" : "false");
}

JsiBoolean::~JsiBoolean() {
    value_ = false;
    if (JSI_DEBUG_MEMORY) {
        debug("JsiBoolean::~JsiBoolean()");
    }
}

//*******************************************************************************
//                                     JsiComponent
//*******************************************************************************


JsiComponent::JsiComponent() {
    value_ = 0;
    name_ = "";
    type_ = TYPE_COMPONENT;
    protect();
}

JsiComponent::JsiComponent(string name, long value) {
    value_ = value;
    name_ = name;
    type_ = TYPE_COMPONENT;
    protect();
}

string JsiComponent::toString() const {
    return string("{\"type\":\"").append(getTypeValueName(type_))
            .append("\",\"tag\":\"").append(name_)
            .append(+"\"}");
}

JsiComponent::~JsiComponent() {
    if (JSI_DEBUG_MEMORY) {
        debug("JsiComponent::~JsiComponent()");
    }
}


//*******************************************************************************
//                                     JsiCallback
//*******************************************************************************


JsiCallback::JsiCallback() {
    type_ = TYPE_COMPONENT;
    protect();
}


JsiValue *JsiCallback::call(size_t argc, JsiValue **argv) {
    return nullptr;
}

string JsiCallback::toString() const {
    return string("{\"type\":\"").append(getTypeValueName(type_))
            .append(+"\"}");
}

JsiCallback::~JsiCallback() {
    if (JSI_DEBUG_MEMORY) {
        debug("JsiCallback::~JsiCallback()");
    }
}

//*******************************************************************************
//                                     JsiValueExt
//*******************************************************************************


JsiValueExt::JsiValueExt(JsiObjectRef *value) {
    type_ = TYPE_EXT;
    value_ = value;
    protect();
}

string JsiValueExt::toString() const {
    return JsiValue::toString();
}

JsiValueExt::~JsiValueExt() {
    if (value_ != nullptr) {
        value_->release();
    }
    value_ = nullptr;
    if (JSI_DEBUG_MEMORY) {
        debug("JsiValueExt::~JsiValueExt()");
    }


}
//*******************************************************************************
//                                     JsiBuilder
//*******************************************************************************


JsiBoolean *JsiBuilder::newJsiBoolean(bool value) {
    return new JsiBoolean(value);
}

JsiNumber *JsiBuilder::newJsiNumber(double value) {
    return new JsiNumber(value);
}

JsiString *JsiBuilder::newJsiString(const char *value) {
    return new JsiString(value);
}

JsiObject *JsiBuilder::newJsiObject() {
    return new JsiObject();
}

JsiArray *JsiBuilder::newJsiArray() {
    return new JsiArray();
}


//*******************************************************************************
//                                     JsiValuePools
//*******************************************************************************


#include "mutex"

static list<JsiValue *> pools;
static mutex mutex_;

void JsiValuePools::protect(JsiValue *value) {
    std::unique_lock<std::mutex> lock(mutex_);
    if (JSI_DEBUG_MEMORY) {
        info("JsiValuePools::protect() value=%s", value->toString().c_str());
        pools.push_back(value);
    }
    lock.unlock();
}

void JsiValuePools::unprotect(JsiValue *value) {
    std::unique_lock<std::mutex> lock(mutex_);
    if (JSI_DEBUG_MEMORY) {
        info("JsiValuePools::unprotect() value=%s,%u", value->toString().c_str(), &value);
        pools.remove(value);
    }
    lock.unlock();
    delete value;

}

size_t JsiValuePools::getPoolSize() {
    return pools.size();
}


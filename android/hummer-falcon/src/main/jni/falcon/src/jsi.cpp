//
// Created by didi on 2023/12/14.
//

#include "jsi/jsi.h"
#include "jsi/jsi_utils.h"

#include "napi/js_native_api_types.h"
#include "napi/js_native_api.h"


JsiObjectRef::JsiObjectRef() {
}

JsiObjectRef::JsiObjectRef(NAPIEnv env, NAPIValue value) {
    env_ = env;
    value_ = value;
    createReference();
}


void JsiObjectRef::createReference() {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);
    NAPIExceptionStatus status = napi_create_reference(env_, value_, 1, &ref_);
    if (status != NAPIExceptionOK) {
        warn("JsiObjectRef::createReference() error. status=%d", status);
    }
    released = false;
    JsiUtils::closeHandleScope(&env_, &scope);
}

void JsiObjectRef::deleteReference() {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);
    NAPIExceptionStatus status = napi_delete_reference(env_, ref_);
    if (status != NAPIExceptionOK) {
        warn("JsiObjectRef::deleteReference() error. status=%d", status);
    }
    JsiUtils::closeHandleScope(&env_, &scope);
}


NAPIValue functionWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    JsiFunctionInfo *jsiFunction = static_cast<JsiFunctionInfo *>(data);

//    info("JsiObject::functionWrapper() methodName=%s,argc=%d",jsiFunction->methodName,argc);

//    JsiValue **params = new JsiValue *[argc];
    JsiValue *params[argc];
    for (int i = 0; i < argc; i++) {
        params[i] = JsiUtils::toValue(&env, &argv[i]);
    }

    JsiValue *jsiValue = jsiFunction->registerFunction(jsiFunction->jsiObject, jsiFunction->methodId, jsiFunction->methodName, argc, params, jsiFunction->data);

    JsiUtils::releaseJsiValue(argc, params);
//    delete params;

//    info("JsiObject::functionWrapper() result methodName=%s,argc=%d",jsiFunction->methodName,argc);
    NAPIValue result = nullptr;
    if (jsiValue != nullptr) {
        JsiUtils::toJSValue(&env, jsiValue, &result);
        jsiValue->unprotect();
    }
    return result;
}

bool JsiObjectRef::registerFunction(long methodId, const char *methodName, JsiRegisterFunction registerFunction, void *data) {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);

    NAPIValue thisValue;
    napi_get_reference_value(env_, ref_, &thisValue);

    JsiFunctionInfo *jsiFunction = new JsiFunctionInfo();
    jsiFunction->jsiObject = this;
    jsiFunction->methodId = methodId;
    jsiFunction->methodName = methodName;
    jsiFunction->data = data;
    jsiFunction->registerFunction = registerFunction;

    functions.push_back(jsiFunction);

    JsiUtils::registerFunction(&env_, &thisValue, methodName, functionWrapper, jsiFunction);

    JsiUtils::closeHandleScope(&env_, &scope);
    return true;
}

JsiObjectRef *JsiObjectRef::getProperty(const char *propertyName) {
    return nullptr;
}

bool JsiObjectRef::setProperty(const char *propertyName, JsiObjectRef *jsiObject) {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);

    NAPIValue thisValue;
    napi_get_reference_value(env_, ref_, &thisValue);

    NAPIValue dataValue;
    napi_get_reference_value(env_, jsiObject->ref_, &dataValue);

    JsiUtils::setProperty(&env_, &thisValue, propertyName, &dataValue);
    JsiUtils::closeHandleScope(&env_, &scope);
    return true;
}

bool JsiObjectRef::deleteProperty(const char *propertyName) {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);

    NAPIValue thisValue;
    napi_get_reference_value(env_, ref_, &thisValue);

    bool result = false;
    JsiUtils::deleteProperty(&env_, &thisValue, propertyName, &result);

    JsiUtils::closeHandleScope(&env_, &scope);
    return result;
}

JsiValue *JsiObjectRef::toJsiValue() {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);

    NAPIValue thisValue;
    napi_get_reference_value(env_, ref_, &thisValue);

    JsiValue *jsiValue = JsiUtils::toValue(&env_, &thisValue);

    JsiUtils::closeHandleScope(&env_, &scope);

    return jsiValue;
}


void JsiObjectRef::toJsValue(NAPIValue *value) {
//    NAPIHandleScope scope;
//    JsiUtils::openHandleScope(&env_, &scope);
    if (!released) {
        napi_get_reference_value(env_, ref_, value);
    } else {
        warn("JsiObjectRef::toJsValue() is released.");
    }
//    JsiUtils::closeHandleScope(&env_, &scope);
}


void JsiObjectRef::release() {
    if (!released) {
        released = true; //需要先标记，可能在删除依赖的时候触发自身资源回收/释放
        deleteReference();
    }
}

JsiObjectRef::~JsiObjectRef() {
    release();
    auto it = functions.begin();
    while (it != functions.end()) {
        delete (*it);
        it++;
    }
    functions.clear();
}


void JsiErrorCatch::onCatchJsiError(int status, JsiError *jsiError) {
    this->catchJsiError = true;
    this->status = status;
    this->message = jsiError == nullptr ? "" : jsiError->toString().c_str();
}

bool JsiErrorCatch::isCatchJsiError() {
    return catchJsiError;
}

JsiErrorCatch::~JsiErrorCatch() {

}

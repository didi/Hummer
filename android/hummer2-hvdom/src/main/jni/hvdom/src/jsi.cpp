//
// Created by didi on 2023/12/14.
//

#include "jsi/jsi.h"


JsiObjectEx::JsiObjectEx() {
}

JsiObjectEx::JsiObjectEx(NAPIEnv env, NAPIValue value) {
    env_ = env;
    value_ = value;
    createReference();
}

void JsiObjectEx::release() {
    deleteReference();
}

JsiObjectEx::~JsiObjectEx() {
    release();
}

void JsiObjectEx::createReference() {
    NAPIExceptionStatus status = napi_create_reference(env_, value_, 1, &ref_);
    if (status != NAPIExceptionOK) {
        warn("JsiObject::createReference() error. status=%d", status);
    }
}

void JsiObjectEx::deleteReference() {
    NAPIExceptionStatus status = napi_delete_reference(env_, ref_);
    if (status != NAPIExceptionOK) {
        warn("JsiObject::deleteReference() error. status=%d", status);
    }
}

bool JsiObjectEx::registerFunction(long methodId, const char *methodName, JsiRegisterFunction registerFunction, void *data) {
    NAPIHandleScope scope;
    JSUtils::openHandleScope(&env_, &scope);
    JsiValue hmValue;

    NAPIValue thisValue;
    napi_get_reference_value(env_, ref_, &thisValue);

    JsiFunctionInfo *jsiFunction = new JsiFunctionInfo();
    jsiFunction->jsiObject = this;
    jsiFunction->methodId = methodId;
    jsiFunction->methodName = methodName;
    jsiFunction->data = data;
    jsiFunction->registerFunction = registerFunction;

    JSUtils::registerFunction(&env_, &thisValue, methodName, functionWrapper, jsiFunction);

    JSUtils::closeHandleScope(&env_, &scope);
    return true;
}

JsiObjectEx *JsiObjectEx::getProperty(const char *propertyName) {
    return nullptr;
}

bool JsiObjectEx::setProperty(const char *propertyName, JsiObjectEx *jsiObject) {
    NAPIHandleScope scope;
    JSUtils::openHandleScope(&env_, &scope);

    NAPIValue thisValue;
    napi_get_reference_value(env_, ref_, &thisValue);

    NAPIValue dataValue;
    napi_get_reference_value(env_, jsiObject->ref_, &dataValue);

    JSUtils::setProperty(&env_, &thisValue, propertyName, &dataValue);
    JSUtils::closeHandleScope(&env_, &scope);
    return true;
}

bool JsiObjectEx::deleteProperty(const char *propertyName) {
    NAPIHandleScope scope;
    JSUtils::openHandleScope(&env_, &scope);

    NAPIValue thisValue;
    napi_get_reference_value(env_, ref_, &thisValue);

    bool result = false;
    JSUtils::deleteProperty(&env_, &thisValue, propertyName, &result);

    JSUtils::closeHandleScope(&env_, &scope);
    return result;
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

    JsiValue *params[argc];
    for (int i = 0; i < argc; i++) {
        params[i] = JSUtils::toValue(&env, &argv[i]);
    }

    JsiValue *hmValue = jsiFunction->registerFunction(jsiFunction->jsiObject, jsiFunction->methodId, jsiFunction->methodName, argc, params, jsiFunction->data);

//    info("JsiObject::functionWrapper() result methodName=%s,argc=%d",jsiFunction->methodName,argc);
    NAPIValue result = nullptr;
    JSUtils::toJSValue(&env, hmValue, &result);
    return result;
}

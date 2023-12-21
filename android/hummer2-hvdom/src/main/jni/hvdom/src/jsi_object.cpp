//
// Created by didi on 2023/12/14.
//

#include <hvdom/jsi_object.h>

JsiObject::JsiObject(NAPIEnv env, NAPIValue value) {
    env_ = env;
    value_ = value;
    createReference();
}

void JsiObject::release() {
    deleteReference();
}

JsiObject::~JsiObject() {
    release();
}

void JsiObject::createReference() {
    NAPIExceptionStatus status = napi_create_reference(env_, value_, 1, &ref_);
    if (status != NAPIExceptionOK) {
        warn("JsiObject::createReference() error. status=%d", status);
    }
}

void JsiObject::deleteReference() {
    NAPIExceptionStatus status = napi_delete_reference(env_, ref_);
    if (status != NAPIExceptionOK) {
        warn("JsiObject::deleteReference() error. status=%d", status);
    }
}

bool JsiObject::registerFunction(long methodId, const char *methodName, RegisterFunction registerFunction,void* data) {
    NAPIHandleScope scope;
    JSUtils::openHandleScope(&env_,&scope);
    HMValue hmValue;

    NAPIValue thisValue;
    napi_get_reference_value(env_, ref_, &thisValue);

    JsiFunction *jsiFunction = new JsiFunction();
    jsiFunction->jsiObject = this;
    jsiFunction->methodId = methodId;
    jsiFunction->methodName = methodName;
    jsiFunction->data = data;
    jsiFunction->registerFunction = registerFunction;

    JSUtils::registerFunction(&env_, &thisValue, methodName, functionWrapper, jsiFunction);

    JSUtils::closeHandleScope(&env_,&scope);
    return false;
}

JsiObject *JsiObject::getProperty(const char *propertyName) {
    return nullptr;
}

bool JsiObject::setProperty(const char *propertyName, JsiObject *jsiObject) {
    return false;
}


NAPIValue functionWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    JsiFunction *jsiFunction = static_cast<JsiFunction *>(data);

    info("JsiObject::functionWrapper() methodName=%s,argc=%d",jsiFunction->methodName,argc);

    HMValue* params[argc];
    for (int i = 0; i < argc; i++) {
        params[i] = JSUtils::toValue(&env, &argv[i]);
    }

    HMValue *hmValue = jsiFunction->registerFunction(jsiFunction->jsiObject,jsiFunction->methodId, jsiFunction->methodName, argc, params,jsiFunction->data);

    info("JsiObject::functionWrapper() result methodName=%s,argc=%d",jsiFunction->methodName,argc);
    NAPIValue result = nullptr;
    JSUtils::toJSValue(&env, hmValue, &result);
    return result;
}

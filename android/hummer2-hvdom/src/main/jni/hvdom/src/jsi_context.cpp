//
// Created by didi on 2023/12/14.
//

#include <hvdom/jsi_context.h>
#include <stdexcept>

thread_local NAPIRuntime thread_runtime_;
thread_local bool thread_runtime_init_ = false;

JsiContext::JsiContext() {
    info("JsiContext<init>");
}


void JsiContext::start() {

    info("JsiContext::start()");
    if (!thread_runtime_init_) {
        NAPIErrorStatus status = NAPICreateRuntime(&thread_runtime_);
        if (thread_runtime_ == nullptr || status != NAPIErrorStatus::NAPIErrorOK) {
            error("JsiContext::NAPICreateRuntime() failed. status=%d", status);
            throw runtime_error("NAPICreateRuntime() failed.");
        }
    }

    NAPIErrorStatus status = NAPICreateEnv(&env_, thread_runtime_);
    if (env_ == nullptr || status != NAPIErrorStatus::NAPIErrorOK) {
        error("JsiContext::NAPICreateEnv() failed. status=%d", status);
        throw runtime_error("NAPICreateEnv() failed.");
    }

    NAPIHandleScope handleScope;
    napi_open_handle_scope(env_, &handleScope);
}

JsiObject *JsiContext::evaluateJavaScript(const char *script, const char *scriptId) {
    info("JsiContext::evaluateJavaScript() %s ,%s", script, scriptId);
    if (env_ == nullptr) {
        error("VDOMContext::evaluateJavaScript() error! napiEnv=null.");
    }
    NAPIValue result = nullptr;

    NAPIHandleScope handleScope;
    napi_open_handle_scope(env_, &handleScope);

    NAPIExceptionStatus status = NAPIRunScript(env_, script, scriptId, &result);
    if (status != NAPIExceptionOK) {
        JSError *jsError = JSUtils::getAndClearLastError(&env_);
        error("VDOMContext::evaluateJavaScript() error! status=&d,scriptId=%s,script=\n%s", scriptId, script);
        error("VDOMContext::evaluateJavaScript() error! jsError=%s", jsError->toCString());
    }
    JsiObject *jsiObject = nullptr;
    if (result != nullptr) {
        jsiObject = new JsiObject(env_, result);
    }
    napi_close_handle_scope(env_, handleScope);
    return jsiObject;

}

JsiObject JsiContext::createObject(const char *name) {
    NAPIValue result;
    JSUtils::createObject(&env_, name, 0, nullptr, &result);
    return JsiObject(env_, result);
}

JsiObject JsiContext::createGlobalObject(const char *name, const char *propertyName) {
    NAPIHandleScope scope;
    JSUtils::openHandleScope(&env_, &scope);

    NAPIValue result;
    JSUtils::createObject(&env_, name, 0, nullptr, &result);
    JSUtils::setGlobalProperty(&env_, propertyName, &result);

    JSUtils::closeHandleScope(&env_, &scope);
    return JsiObject(env_, result);
}

JsiObject JsiContext::getGlobalObject() {
    NAPIValue global;
    napi_get_global(env_, &global);
    return JsiObject(env_, global);
}

JsiContext::~JsiContext() {

}



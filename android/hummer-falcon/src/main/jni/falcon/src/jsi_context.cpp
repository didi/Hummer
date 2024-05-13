//
// Created by didi on 2023/12/14.
//

#include <jsi/jsi.h>
#include <jsi/jsi.h>
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

JsiObjectEx *JsiContext::evaluateJavaScript(string script, string scriptId) {
    info("JsiContext::evaluateJavaScript() %s ", scriptId.c_str());
    if (env_ == nullptr) {
        error("JsiContext::evaluateJavaScript() error! Env=null.");
    }
    NAPIValue result = nullptr;

    NAPIHandleScope handleScope;
    napi_open_handle_scope(env_, &handleScope);

    NAPIExceptionStatus status = NAPIRunScript(env_, script.c_str(), scriptId.c_str(), &result);
    if (status != NAPIExceptionOK) {
        JsiError *jsError = JSUtils::getAndClearLastError(&env_);
        error("JsiContext::evaluateJavaScript() error! status=&d,scriptId=%s,script=\n%s", scriptId.c_str(), script.c_str());
        error("JsiContext::evaluateJavaScript() error! jsError=%s", jsError->toCString());
    }

    JsiObjectEx *jsiObject = nullptr;
    if (result != nullptr) {
        jsiObject = new JsiObjectEx(env_, result);
    }
    napi_close_handle_scope(env_, handleScope);
    return jsiObject;

}

JsiObjectEx *JsiContext::evaluateBytecode(const uint8_t *byteArray, size_t length, const char *scriptId) {
    info("JsiContext::evaluateBytecode() %s ,%s", "", scriptId);
    if (env_ == nullptr) {
        error("JsiContext::evaluateBytecode() error! napiEnv=null.");
    }
    NAPIValue result = nullptr;

    NAPIHandleScope handleScope;
    napi_open_handle_scope(env_, &handleScope);

    NAPIExceptionStatus status = NAPIRunByteBuffer(env_, byteArray, length, &result);
    if (status != NAPIExceptionOK) {
        JsiError *jsError = JSUtils::getAndClearLastError(&env_);
        error("JsiContext::evaluateBytecode() error! status=&d,scriptId=%s,length =%d", scriptId, length);
        error("JsiContext::evaluateBytecode() error! jsError=%s", jsError->toCString());
    }
    JsiObjectEx *jsiObject = nullptr;
    if (result != nullptr) {
        jsiObject = new JsiObjectEx(env_, result);
    }
    napi_close_handle_scope(env_, handleScope);
    return jsiObject;
}


JsiObjectEx *JsiContext::createJsNumber(double value) {
    NAPIValue result;
    JSUtils::createJsNumber(&env_, value, &result);
    return new JsiObjectEx(env_, result);
}

JsiObjectEx *JsiContext::createJsString(const char *value) {
    NAPIValue result;
    JSUtils::createJsString(&env_, value, &result);
    return new JsiObjectEx(env_, result);
}

JsiObjectEx *JsiContext::createObject(const char *name) {
    NAPIValue result;
    JSUtils::createObject(&env_, name, 0, nullptr, &result);
    return new JsiObjectEx(env_, result);
}

JsiObjectEx *JsiContext::createExternal(void *finalizeData, JsiFinalize finalizeCB, void *finalizeHint) {
    NAPIValue result;
    JSUtils::createExternal(&env_, finalizeData, finalizeCB, finalizeHint, &result);
    return new JsiObjectEx(env_, result);
}

JsiObjectEx *JsiContext::createGlobalObject(const char *name, const char *propertyName) {
    NAPIHandleScope scope;
    JSUtils::openHandleScope(&env_, &scope);

    NAPIValue result;
    JSUtils::createObject(&env_, name, 0, nullptr, &result);
    JSUtils::setGlobalProperty(&env_, propertyName, &result);

    JSUtils::closeHandleScope(&env_, &scope);
    return new JsiObjectEx(env_, result);
}

bool JsiContext::deleteGlobalProperty(const char *propertyName) {
    bool result = false;
    JSUtils::deleteGlobalProperty(&env_, propertyName, &result);
    return result;
}

JsiObjectEx *JsiContext::getGlobalObject() {
    NAPIValue global;
    napi_get_global(env_, &global);
    return new JsiObjectEx(env_, global);
}

void JsiContext::stop() {

    NAPICommonStatus status = NAPIFreeEnv(env_);
    if (status != NAPICommonStatus::NAPICommonOK) {
        error("JsiContext::NAPIFreeEnv() failed. status=%d", status);
        throw runtime_error("NAPIFreeEnv() failed.");
    }

}

JsiContext::~JsiContext() {

}







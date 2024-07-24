//
// Created by didi on 2023/12/14.
//

#include <jsi/jsi.h>
#include <jsi/jsi_utils.h>
#include <stdexcept>

#include "napi/js_native_api.h"
#include "napi/js_native_api_types.h"

thread_local NAPIRuntime thread_runtime_;
thread_local bool thread_runtime_init_ = false;


JsiContext::JsiContext() {
    info("JsiContext<init>");
}


void JsiContext::start() {
    info("JsiContext::start()");
    if (!thread_runtime_init_) {
        info("JsiContext::NAPICreateRuntime()");
        NAPIErrorStatus status = NAPICreateRuntime(&thread_runtime_);
        if (thread_runtime_ == nullptr || status != NAPIErrorStatus::NAPIErrorOK) {
            error("JsiContext::NAPICreateRuntime() failed. status=%d", status);
            throw runtime_error("NAPICreateRuntime() failed.");
        }
        thread_runtime_init_ = true;
    }

    NAPIErrorStatus status = NAPICreateEnv(&env_, thread_runtime_);
    info("JsiContext::NAPICreateEnv()");
    if (env_ == nullptr || status != NAPIErrorStatus::NAPIErrorOK) {
        error("JsiContext::NAPICreateEnv() failed. status=%d", status);
        throw runtime_error("NAPICreateEnv() failed.");
    }
}

JsiObjectRef *JsiContext::evaluateJavaScript(string script, string scriptId, JsiErrorCatch *jsiErrorCatch) {
    info("JsiContext::evaluateJavaScript() %s ", scriptId.c_str());
    if (env_ == nullptr) {
        error("JsiContext::evaluateJavaScript() error! Env=null.");
    }
    NAPIValue result = nullptr;

    NAPIHandleScope handleScope;
    napi_open_handle_scope(env_, &handleScope);

    NAPIExceptionStatus status = NAPIRunScript(env_, script.c_str(), scriptId.c_str(), &result);
    if (status != NAPIExceptionOK) {
        JsiError *jsError = JsiUtils::getAndClearLastError(&env_);
        if (jsiErrorCatch != nullptr) {
            jsiErrorCatch->onCatchJsiError(status,jsError);
        }
        error("JsiContext::evaluateJavaScript() error! scriptId=%s,script=\n%s", scriptId.c_str(), script.c_str());
        error("JsiContext::evaluateJavaScript() error! jsError=%s", jsError->toString().c_str());
        delete jsError;
    }

    JsiObjectRef *jsiObject = nullptr;
    if (result != nullptr) {
        jsiObject = new JsiObjectRef(env_, result);
    }
    napi_close_handle_scope(env_, handleScope);
    return jsiObject;

}

JsiObjectRef *JsiContext::evaluateBytecode(const uint8_t *byteArray, size_t length, const char *scriptId, JsiErrorCatch *jsiErrorCatch) {
    info("JsiContext::evaluateBytecode() %s ,%s", "", scriptId);
    if (env_ == nullptr) {
        error("JsiContext::evaluateBytecode() error! napiEnv=null.");
    }
    NAPIValue result = nullptr;

    NAPIHandleScope handleScope;
    napi_open_handle_scope(env_, &handleScope);

    NAPIExceptionStatus status = NAPIRunByteBuffer(env_, byteArray, length, &result);
    if (status != NAPIExceptionOK) {
        JsiError *jsError = JsiUtils::getAndClearLastError(&env_);
        if (jsiErrorCatch != nullptr) {
            jsiErrorCatch->onCatchJsiError(status,jsError);
        }
        error("JsiContext::evaluateBytecode() error! status=&d,scriptId=%s,length =%d", scriptId, length);
        error("JsiContext::evaluateBytecode() error! jsError=%s", jsError->toCString());
        delete jsError;
    }
    JsiObjectRef *jsiObject = nullptr;
    if (result != nullptr) {
        jsiObject = new JsiObjectRef(env_, result);
    }
    napi_close_handle_scope(env_, handleScope);
    return jsiObject;
}


JsiObjectRef *JsiContext::createJsNumber(double value) {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);
    NAPIValue result;
    JsiUtils::createJsNumber(&env_, value, &result);
    JsiObjectRef *jsiObjectRef = new JsiObjectRef(env_, result);
    JsiUtils::closeHandleScope(&env_, &scope);
    return jsiObjectRef;
}

JsiObjectRef *JsiContext::createJsString(const char *value) {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);
    NAPIValue result;
    JsiUtils::createJsString(&env_, value, &result);
    JsiObjectRef *jsiObjectRef = new JsiObjectRef(env_, result);
    JsiUtils::closeHandleScope(&env_, &scope);
    return jsiObjectRef;
}

JsiObjectRef *JsiContext::createObject(const char *name) {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);
    NAPIValue result;
    JsiUtils::createObject(&env_, name, 0, nullptr, &result);
    JsiObjectRef *jsiObjectRef = new JsiObjectRef(env_, result);
    JsiUtils::closeHandleScope(&env_, &scope);
    return jsiObjectRef;
}

JsiObjectRef *JsiContext::createExternal(void *finalizeData, JsiFinalize finalizeCB, void *finalizeHint) {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);
    NAPIValue result;
    JsiUtils::createExternal(&env_, finalizeData, finalizeCB, finalizeHint, &result);
    JsiObjectRef *jsiObjectRef = new JsiObjectRef(env_, result);
    JsiUtils::closeHandleScope(&env_, &scope);
    return jsiObjectRef;
}

JsiObjectRef *JsiContext::createGlobalObject(const char *name, const char *propertyName) {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);

    NAPIValue result;
    JsiUtils::createObject(&env_, name, 0, nullptr, &result);
    JsiUtils::setGlobalProperty(&env_, propertyName, &result);

    JsiObjectRef *jsiObjectRef = new JsiObjectRef(env_, result);
    JsiUtils::closeHandleScope(&env_, &scope);
    return jsiObjectRef;
}

bool JsiContext::deleteGlobalProperty(const char *propertyName) {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);
    bool result = false;
    JsiUtils::deleteGlobalProperty(&env_, propertyName, &result);
    JsiUtils::closeHandleScope(&env_, &scope);
    return result;
}

JsiObjectRef *JsiContext::getGlobalObject() {
    NAPIHandleScope scope;
    JsiUtils::openHandleScope(&env_, &scope);
    NAPIValue global;
    napi_get_global(env_, &global);
    JsiObjectRef *jsiObjectRef = new JsiObjectRef(env_, global);
    JsiUtils::closeHandleScope(&env_, &scope);
    return jsiObjectRef;
}

void JsiContext::runGC() {
    if (thread_runtime_init_) {
        info("JsiContext::runGC()");
    }
}

void JsiContext::releaseRuntime() {
    if (thread_runtime_init_) {
        info("JsiContext::releaseRuntime()");
        thread_runtime_init_ = false;
        NAPICommonStatus status = NAPIFreeRuntime(thread_runtime_);
        if (status != NAPICommonOK) {
            error("JsiContext::NAPIFreeRuntime() failed. status=%d", status);
            throw runtime_error("NAPIFreeRuntime() failed.");
        }
    }
}

void JsiContext::stop() {
    info("JsiContext::stop()");
    NAPICommonStatus status = NAPIFreeEnv(env_);
    if (status != NAPICommonStatus::NAPICommonOK) {
        error("JsiContext::NAPIFreeEnv() failed. status=%d", status);
        throw runtime_error("NAPIFreeEnv() failed.");
    }

}

JsiContext::~JsiContext() {

}







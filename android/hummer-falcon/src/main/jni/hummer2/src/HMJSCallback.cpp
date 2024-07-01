//
// Created by didi on 2024/6/28.
//


#include "HMJSCallback.h"
#include "FalconContext.h"

HMJsCallback::HMJsCallback(F4NContext *context, long callbackId) {
    this->context = context;
    this->callbackId = callbackId;
}

void HMJsCallback::onJavaScriptResult(int status, const string &message, JsiValue *jsiValue) {
    FalconContext::onJavaScriptCallback((jobject) context->nativeContext, callbackId, status, message, jsiValue);
}

HMJsCallback::~HMJsCallback() {
    this->context = nullptr;
    this->callbackId = 0;
}

//
// Created by didi on 2024/4/18.
//


#include "falcon/F4NFunctionCall.h"

F4NFunctionCall::F4NFunctionCall(F4NElement *thisElement, long methodId, string methodName, size_t size, JsiValue **params) {
    this->thisElement = thisElement;
    this->methodId = methodId;
    this->methodName = methodName;
    this->size = size;
    if (size > 0) {
        this->params = new JsiValue *[size];
        JsiUtils::copyJsiValue(params, this->params, size);
    }
}

F4NFunctionCall::~F4NFunctionCall() {
    this->thisElement = nullptr;
    if (params != nullptr) {
        JsiUtils::releaseJsiValue(size, params);
        delete params;
        params = nullptr;
    }
}

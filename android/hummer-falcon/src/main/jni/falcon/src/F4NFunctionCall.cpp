//
// Created by didi on 2024/4/18.
//


#include "falcon/F4NFunctionCall.h"

F4NFunctionCall::F4NFunctionCall(F4NElement *thisElement, long methodId, string methodName, size_t size, JsiValue **params) {
    this->thisElement = thisElement;
    this->methodId = methodId;
    this->methodName = methodName;
    this->size = size;
    this->params = params;

}

F4NFunctionCall::~F4NFunctionCall() {

}

//
// Created by didi on 2024/4/16.
//


#include "falcon/falcon.h"


F4NEventTarget::F4NEventTarget() {

}

F4NEventTarget::F4NEventTarget(JsiFunction *jsiFunction) {
    this->jsiFunction = jsiFunction;
}

void F4NEventTarget::onEvent(string eventName, JsiValue *event) {
    JsiValue *params[2];
    params[0] = new JsiString(eventName.c_str());
    params[1] = event;
    jsiFunction->call(2, params);
}

F4NEventTarget::~F4NEventTarget() {
    jsiFunction->unprotect();
}


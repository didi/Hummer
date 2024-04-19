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
    auto **params = new JsiValue *[2];
    params[0] = new JsiString(eventName.c_str());
    params[1] = event;
    jsiFunction->call(2, params);
    delete event;
}

F4NEventTarget::~F4NEventTarget() {
    delete jsiFunction;
}


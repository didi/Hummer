//
// Created by didi on 2024/4/19.
//

#include "falcon/falcon.h"
#include "falcon/F4NContext.h"

//********************************************************
//               F4NFunction
//********************************************************


F4NFunction::F4NFunction(F4NContext *context, JsiFunction *jsiFunction) {
    this->context = context;
    this->jsiFunction = jsiFunction;
}

F4NFunction::F4NFunction(F4NContext *context, JsiFunction *jsiFunction, bool autoRelease) {
    this->context = context;
    this->jsiFunction = jsiFunction;
    this->autoRelease = autoRelease;
}

string F4NFunction::toString() const {
    if (released) {
        return string("{\"type\":\"").append("----").append(+"\"}");
    }
    return jsiFunction->toString();
}

JsiValue *F4NFunction::call(JsiValue *jsiValue) {
    if (released) {
        warn("F4NFunction::call() is released params=%s", jsiValue->toString().c_str());
        return nullptr;
    }
    context->submitJsTask([&, jsiValue](void *, void *) {
        jsiFunction->call(jsiValue);
        if (autoRelease) {
            delete jsiFunction;
        }
        return nullptr;
    });
    if (autoRelease) {
        released = true;
    }
    return nullptr;
}

JsiValue *F4NFunction::call(size_t argc, JsiValue **argv) {
    if (released) {
        warn("F4NFunction::call() is released params=%s", JSUtils::buildArrayString(argc, argv).c_str());
        return nullptr;
    }
    context->submitJsTask([&, argc, argv](void *, void *) {
        jsiFunction->call(argc, argv);
        if (autoRelease) {
            delete jsiFunction;
        }
        return nullptr;
    });
    if (autoRelease) {
        released = true;
    }
    return nullptr;
}

F4NFunction::~F4NFunction() {
    delete jsiFunction;
}

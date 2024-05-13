//
// Created by didi on 2024/4/19.
//

#include "falcon/falcon.h"
#include "falcon/F4NContext.h"
#include "falcon/F4NUtil.h"

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


JsiValue *F4NFunction::call(size_t argc, JsiValue **argv) {
    if (released) {
        warn("F4NFunction::call() is released params=%s", JSUtils::buildArrayString(argc, argv).c_str());
        return nullptr;
    }

    JsiValue *result = nullptr;
    if (!F4NUtil::isMainThread()) {
        result = jsiFunction->call(argc, argv);
    } else {
        context->submitJsTask([&, argc, argv]() {
            JsiValue *result = jsiFunction->call(argc, argv);
            if (result != nullptr) {
                delete result;
            }
            if (autoRelease) {
                delete jsiFunction;
            }
        });
    }
    if (autoRelease) {
        released = true;
    }
    return result;
}

F4NFunction::~F4NFunction() {
    delete jsiFunction;
}

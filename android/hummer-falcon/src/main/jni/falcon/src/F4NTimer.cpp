//
// Created by didi on 2024/4/26.
//

#include "falcon/F4NTimer.h"
#include "falcon/F4NContext.h"

F4NTimer::F4NTimer(F4NContext *f4NContext, JsiContext *jsiContext) {
    this->f4NContext = f4NContext;
    this->jsiContext = jsiContext;
}

void F4NTimer::onCreate() {

    JsiObjectEx global = jsiContext->getGlobalObject();

    global.registerFunction(MethodId_setTimeout, "setTimeout", timerFuncWrapper, this);
    global.registerFunction(MethodId_setInterval, "setInterval", timerFuncWrapper, this);
    global.registerFunction(MethodId_clearTimeout, "clearTimeout", timerFuncWrapper, this);
    global.registerFunction(MethodId_clearInterval, "clearInterval", timerFuncWrapper, this);

    global.release();
}

JsiValue *F4NTimer::setTimeout(size_t size, JsiValue **params) {
    if (size >= 2) {
        JsiFunction *function = (JsiFunction *) params[0];
        JsiNumber *timeout = (JsiNumber *) params[1];
        f4NContext->submitJsTask([&, function, timeout](void *, void *) {
            function->call(0, nullptr);
            return nullptr;
        });
    }

    return nullptr;
}

JsiValue *F4NTimer::setInterval(size_t size, JsiValue **params) {
    if (size >= 2) {
        JsiFunction *function = (JsiFunction *) params[0];
        JsiNumber *interval = (JsiNumber *) params[1];
        f4NContext->submitJsTask([&, function, interval](void *, void *) {
            function->call(0, nullptr);
            return nullptr;
        });
    }
    return nullptr;
}

JsiValue *F4NTimer::clearTimeout(size_t size, JsiValue **params) {
    return nullptr;
}

JsiValue *F4NTimer::clearInterval(size_t size, JsiValue **params) {
    return nullptr;
}

void F4NTimer::onDestroy() {

}

F4NTimer::~F4NTimer() {

}

JsiValue *timerFuncWrapper(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue **params, void *data) {
    auto *bridge = static_cast<F4NTimer *>(data);
    switch (methodId) {
        case F4NTimer::MethodId_setTimeout:
            return bridge->setTimeout(size, params);
        case F4NTimer::MethodId_setInterval:
            return bridge->setInterval(size, params);
        case F4NTimer::MethodId_clearTimeout:
            return bridge->clearTimeout(size, params);
        case F4NTimer::MethodId_clearInterval:
            return bridge->clearInterval(size, params);

    }
    return nullptr;
}

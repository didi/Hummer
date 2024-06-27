//
// Created by didi on 2024/4/26.
//

#include "falcon/F4NTimer.h"
#include "falcon/F4NContext.h"
#include "falcon/F4NPage.h"

F4NTimer::F4NTimer(F4NContext *f4NContext, JsiContext *jsiContext) {
    this->f4NContext = f4NContext;
    this->jsiContext = jsiContext;
}

void F4NTimer::onCreate() {

    global = jsiContext->getGlobalObject();

    global->registerFunction(MethodId_setTimeout, "setTimeout", timerFuncWrapper, this);
    global->registerFunction(MethodId_setInterval, "setInterval", timerFuncWrapper, this);
    global->registerFunction(MethodId_clearTimeout, "clearTimeout", timerFuncWrapper, this);
    global->registerFunction(MethodId_clearInterval, "clearInterval", timerFuncWrapper, this);

    global->release();
}

JsiValue *F4NTimer::setTimeout(size_t size, JsiValue **params) {
    if (size >= 2) {
        auto *function = (JsiFunction *) params[0];
        auto *timeout = (JsiNumber *) params[1];
        auto delay = (time_t) timeout->value_;
        function->protect();
        long id = f4NContext->submitJsTask([&, function]() {
            function->call(0, nullptr);
            function->unprotect();
        }, delay);
        if (FALCON_LOG_ENABLE) {
            debug("F4NTimer::setTimeout() id=%ld", id);
        }
        return new JsiNumber(id);
    }

    return nullptr;
}

JsiValue *F4NTimer::setInterval(size_t size, JsiValue **params) {
    if (size >= 2) {
        auto *function = (JsiFunction *) params[0];
        auto *interval = (JsiNumber *) params[1];
        auto interval_time_t = (time_t) interval->value_;
        function->protect();
        long id = f4NContext->submitJsTask([&, function, interval]() {
            if (f4NContext->_page_->pageDestroy) {
                return;
            }
            function->call(0, nullptr);
            //TODO 需要在容器停止时释放function

        }, 0, interval_time_t);
        if (FALCON_LOG_ENABLE) {
            debug("F4NTimer::setInterval() id=%ld", id);
        }
        return new JsiNumber(id);
    }
    return nullptr;
}

JsiValue *F4NTimer::clearTimeout(size_t size, JsiValue **params) {
    if (size > 0) {
        auto *value = (JsiNumber *) params[0];
        long id = value->value_;
        if (FALCON_LOG_ENABLE) {
            debug("F4NTimer::clearTimeout() id=%ld", id);
        }
        f4NContext->cancelJsTask(id);
    }
    return nullptr;
}

JsiValue *F4NTimer::clearInterval(size_t size, JsiValue **params) {
    if (size > 0) {
        auto *value = (JsiNumber *) params[0];
        long id = value->value_;
        if (FALCON_LOG_ENABLE) {
            debug("F4NTimer::clearInterval() id=%ld", id);
        }
        f4NContext->cancelJsTask(id);
    }
    return nullptr;
}

void F4NTimer::onDestroy() {
    global->release();
}

F4NTimer::~F4NTimer() {
    delete global;
    global = nullptr;
}

JsiValue *timerFuncWrapper(JsiObjectRef *value, long methodId, const char *methodName, size_t size, JsiValue **params, void *data) {
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

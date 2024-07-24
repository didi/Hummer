//
// Created by didi on 2023/11/29.
//

#include "falcon/F4NContext.h"
#include <falcon/F4NDocument.h>
#include <falcon/F4NElement.h>
#include <falcon/F4NPage.h>
#include <falcon/F4NUtil.h>


F4NContext::F4NContext() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContext::F4NContext()");
    }
}


void F4NContext::init(F4NConfigOptions *options, F4NRenderInvoker *factory) {
    error("F4NContext::init()");
}


void F4NContext::onCreate() {
}


void F4NContext::setMainThreadHandler(F4NHandler *threadHandler) {
    _mainThreadHandler_ = threadHandler;
}

void F4NContext::setLogHandler(LogHandler *logHandler) {
    _logHandler_ = logHandler;
}

void F4NContext::setConsoleHandler(ConsoleHandler *consoleHandler) {
    _consoleHandler_ = consoleHandler;
}

void F4NContext::setExceptionHandler(ExceptionHandler *exceptionHandler) {
    _exceptionHandler_ = exceptionHandler;
}

void F4NContext::setEventTraceHandler(EventTraceHandler *eventTraceHandler) {
    _eventTraceHandler_ = eventTraceHandler;
}


void F4NContext::start() {

}

void F4NContext::onStart() {
}


JsiValue *F4NContext::loadScript(string script, string scriptId) {
    return nullptr;
}

JsiValue *F4NContext::evaluateJavaScript(string script, string scriptId, F4NJSCallback *callback) {
    return nullptr;
}

JsiValue *F4NContext::evaluateBytecode(const uint8_t *byteArray, size_t length, string scriptId, F4NJSCallback *callback) {
    return nullptr;
}

JsiValue *F4NContext::render(F4NElement *rootElement) {
    return nullptr;
}


void F4NContext::buildElementParams(size_t size, JsiValue **params) {

}


void F4NContext::applyElementRender(size_t size, JsiValue **params) {

}


F4NRenderInvoker *F4NContext::getRenderInvoker() {
    return _renderInvoker_;
}


F4NConfigOptions *F4NContext::getConfigOptions() {
    return _configOptions_;
}

JsiContext *F4NContext::getJsiContext() {
    return _jsiContext_;
}

LogHandler *F4NContext::getLogHandler() {
    return _logHandler_;
}


F4NLogger *F4NContext::getLogger() {
    return _logger_;
}


ConsoleHandler *F4NContext::getConsoleHandler() {
    return _consoleHandler_;
}

ExceptionHandler *F4NContext::getExceptionHandler() {
    return _exceptionHandler_;
}

long F4NContext::submitJsTask(function<void()> task) {
    return -1;
}

long F4NContext::submitJsTask(function<void()> task, time_t delay) {
    return -1;
}

long F4NContext::submitJsTask(function<void()> task, time_t delay, time_t interval) {
    return -1;
}

void F4NContext::cancelJsTask(long id) {

}

long F4NContext::submitUITask(function<void()> task) {
    return -1;
}

void F4NContext::cancelUITask(long id) {

}

void F4NContext::dispatchEvent(string eventName, size_t size, JsiValue **params) {
}


void F4NContext::setPageLifeCycle(PageLifeCycle *pageLifeCycle) {
}

void F4NContext::setContextStateListener(F4NContextStateListener *contextStateListener) {
    _contextListener_ = contextStateListener;
}

void F4NContext::stop() {

}

void F4NContext::onStop() {

}

void F4NContext::onDestroy() {
}

F4NContext::~F4NContext() {
    if (FALCON_LOG_ENABLE) {
        debug("F4NContext::~F4NContext()");
    }

    delete _mainThreadHandler_;
    _mainThreadHandler_ = nullptr;

    delete _logger_;
    _logger_ = nullptr;

    delete _logHandler_;
    _logHandler_ = nullptr;

    delete _consoleHandler_;
    _consoleHandler_ = nullptr;

    delete _exceptionHandler_;
    _exceptionHandler_ = nullptr;

    delete _eventTraceHandler_;
    _eventTraceHandler_ = nullptr;

//    error("F4NContext::~F4NContext() value::size=%d",JsiValuePools::getPoolSize());
}


F4NJsiErrorCatch::F4NJsiErrorCatch(F4NContext *context) {
    this->context = context;
}

void F4NJsiErrorCatch::onCatchJsiError(int status, JsiError *jsiError) {
    JsiErrorCatch::onCatchJsiError(status, jsiError);
    if (this->context != nullptr && this->context->getExceptionHandler() != nullptr) {
        this->context->getExceptionHandler()->onThrowException(message);
    }
}

F4NJsiErrorCatch::~F4NJsiErrorCatch() {
    this->context = nullptr;
}

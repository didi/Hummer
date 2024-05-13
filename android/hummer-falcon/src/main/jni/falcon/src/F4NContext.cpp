//
// Created by didi on 2023/11/29.
//

#include "falcon/F4NContext.h"
#include <falcon/F4NDocument.h>
#include <falcon/F4NElement.h>
#include <falcon/F4NPage.h>
#include <falcon/F4NUtil.h>


F4NContext::F4NContext() {
    _page_ = new F4NPage(this);
}

void F4NContext::init(F4NConfigOptions *options, F4NRenderInvoker *factory) {
    _configOptions_ = options;
    _renderInvoker_ = factory;
    onCreate();
}


void F4NContext::onCreate() {
    _jsiContext_ = new JsiContext();
    _elementRender_ = new F4NRender();
    _elementRender_->init(_renderInvoker_, nullptr, nullptr);
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
    //开启JS上下文环境
    _jsiContext_->start();
    //处理开始任务
    _contextListener_->onContextCreate();
    onStart();
}

void F4NContext::onStart() {

    F4NTimer *f4NTimer = new F4NTimer(this, _jsiContext_);
    f4NTimer->onCreate();
    _timer_ = f4NTimer;

    F4NConsole *jsConsole = new F4NConsole(_jsiContext_, _consoleHandler_);
    jsConsole->onCreate();
    _jsConsole_ = jsConsole;

    F4NDocument *document = new F4NDocument(_jsiContext_);
    document->fnContext = this;
    document->componentFactory = _renderInvoker_;
    document->onCreate();
    _document_ = document;

    _contextListener_->onContextStart();
}


JsiValue *F4NContext::loadScript(string script, string scriptId) {
    JsiObjectEx *object = _jsiContext_->evaluateJavaScript(script, scriptId);
    if (object != nullptr) {
        JsiValue *result = object->toJsiValue();
        delete object;
        return result;
    }
    return nullptr;
}

JsiValue *F4NContext::evaluateJavaScript(string script, string scriptId) {
    JsiObjectEx *object = _jsiContext_->evaluateJavaScript(script, scriptId);
    if (object != nullptr) {
        delete object;
    }
    return nullptr;
}

JsiValue *F4NContext::evaluateBytecode(const uint8_t *byteArray, size_t length, const char *scriptId) {
    JsiObjectEx *object = _jsiContext_->evaluateBytecode(byteArray, length, scriptId);
    if (object != nullptr) {
        delete object;
    }
    return nullptr;
}

JsiValue *F4NContext::render(F4NElement *rootElement) {
    _page_->setRootElement(rootElement);
    _elementRender_->renderRoot(rootElement);
    return nullptr;
}


void F4NContext::buildElementParams(size_t size, JsiValue **params) {
    if (size > 0) {
        for (int i = 0; i < size; i++) {
            params[i] = _elementRender_->convertElementParams(nullptr, params[i]);
        }
    }
}


void F4NContext::applyElementRender(size_t size, JsiValue **params) {
    if (size > 0) {
        for (int i = 0; i < size; i++) {
            F4NElement *element = F4NUtil::convert2Element(params[i]);
            if (element != nullptr) {
                _elementRender_->applyRenderTag(element);
            }
        }
    }
}


F4NRenderInvoker *F4NContext::getComponentFactory() {
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
    task();
    return 0;
}

long F4NContext::submitJsTask(function<void()> task, time_t delay) {
    task();
    return 0;
}

long F4NContext::submitJsTask(function<void()> task, time_t delay, time_t interval) {
    task();
    return 0;
}

void F4NContext::cancelJsTask(long id) {

}

long F4NContext::submitUITask(function<void()> task) {
    task();
    return 0;
}

void F4NContext::cancelUITask(long id) {

}

void F4NContext::dispatchEvent(string eventName, size_t size, JsiValue **params) {
    _page_->dispatchEvent(eventName, size, params);
}


void F4NContext::setPageLifeCycle(PageLifeCycle *pageLifeCycle) {
    _pageLifeCycle_ = pageLifeCycle;
    _page_->setPageLifeCycle(pageLifeCycle);
}

void F4NContext::setContextStateListener(F4NContextStateListener *contextStateListener) {
    _contextListener_ = contextStateListener;

}

void F4NContext::stop() {
    onStop();
}

void F4NContext::onStop() {
    _contextListener_->onContextStop();
}

void F4NContext::onDestroy() {
    _contextListener_->onContextDestroy();

    _document_->onDestroy();
    _jsConsole_->onDestroy();
    _timer_->onDestroy();
    _jsiContext_->stop();

}

F4NContext::~F4NContext() {
    delete _renderInvoker_;
    delete _document_;
    delete _jsConsole_;
    delete _jsiContext_;
    delete _page_;
}












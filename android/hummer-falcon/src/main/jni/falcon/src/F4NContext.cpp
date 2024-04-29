//
// Created by didi on 2023/11/29.
//

#include "falcon/F4NContext.h"
#include <falcon/F4NDocument.h>
#include <falcon/F4NElement.h>
#include <falcon/F4NUtil.h>


F4NContext::F4NContext() {

}

void F4NContext::init(F4NConfigOptions *options, F4NRenderInvoker *factory) {
    configOptions_ = options;
    componentFactory_ = factory;
    onCreate();
}


void F4NContext::onCreate() {
    jsiContext_ = new JsiContext();
    elementRender_ = new F4NRender();
    elementRender_->init(componentFactory_, nullptr, nullptr);
}


void F4NContext::setMainThreadHandler(F4NHandler *threadHandler) {
    mainThreadHandler_ = threadHandler;
}

void F4NContext::setLogHandler(LogHandler *logHandler) {
    logHandler_ = logHandler;
}

void F4NContext::setConsoleHandler(ConsoleHandler *consoleHandler) {
    consoleHandler_ = consoleHandler;
}

void F4NContext::setExceptionHandler(ExceptionHandler *exceptionHandler) {
    exceptionHandler_ = exceptionHandler;
}

void F4NContext::setEventTraceHandler(EventTraceHandler *eventTraceHandler) {
    eventTraceHandler_ = eventTraceHandler;
}


void F4NContext::start() {
    //开启JS上下文环境
    jsiContext_->start();
    //处理开始任务
    onStart();
}

void F4NContext::onStart() {

    F4NTimer *f4NTimer = new F4NTimer(this, jsiContext_);
    f4NTimer->onCreate();
    timer = f4NTimer;

    F4NConsole *jsConsole = new F4NConsole(jsiContext_, consoleHandler_);
    jsConsole->onCreate();
    jsConsole_ = jsConsole;

    F4NDocument *document = new F4NDocument(jsiContext_);
    document->fnContext = this;
    document->componentFactory = componentFactory_;
    document->onCreate();
    document_ = document;

}


JsiValue *F4NContext::evaluateJavaScript(string script, string scriptId) {
    JsiObjectEx *object = jsiContext_->evaluateJavaScript(script, scriptId);
    if (object != nullptr) {
        delete object;
    }
    return nullptr;
}

JsiValue *F4NContext::evaluateBytecode(const uint8_t *byteArray, size_t length, const char *scriptId) {
    JsiObjectEx *object = jsiContext_->evaluateBytecode(byteArray, length, scriptId);
    if (object != nullptr) {
        delete object;
    }
    return nullptr;
}

JsiValue *F4NContext::render(F4NElement *rootElement) {
    elementRender_->renderRoot(rootElement);
    return nullptr;
}


void F4NContext::buildElementParams(size_t size, JsiValue **params) {
    if (size > 0) {
        for (int i = 0; i < size; i++) {
            params[i] = elementRender_->convertElementParams(nullptr, params[i]);
        }
    }
}


void F4NContext::applyElementRender(size_t size, JsiValue **params) {
    if (size > 0) {
        for (int i = 0; i < size; i++) {
            F4NElement *element = F4NUtil::convert2Element(params[i]);
            if (element != nullptr) {
                elementRender_->applyRenderTag(element);
            }
        }
    }
}


F4NRenderInvoker *F4NContext::getComponentFactory() {
    return componentFactory_;
}


F4NConfigOptions *F4NContext::getConfigOptions() {
    return configOptions_;
}

JsiContext *F4NContext::getJsiContext() {
    return jsiContext_;
}

LogHandler *F4NContext::getLogHandler() {
    return logHandler_;
}


F4NLogger *F4NContext::getLogger() {
    return logger_;
}


ConsoleHandler *F4NContext::getConsoleHandler() {
    return consoleHandler_;
}

ExceptionHandler *F4NContext::getExceptionHandler() {
    return exceptionHandler_;
}

void *F4NContext::submitJsTask(function<void *(void *, void *)> task) {
    return task(nullptr, nullptr);
}

void *F4NContext::submitUITask(function<void *(void *, void *)> task) {
    return task(nullptr, nullptr);
}

void F4NContext::stop() {
    onStop();
}

void F4NContext::onStop() {

}

void F4NContext::onDestroy() {
    document_->onDestroy();
    jsConsole_->onDestroy();
    timer->onDestroy();
    jsiContext_->stop();
}

F4NContext::~F4NContext() {

    delete componentFactory_;
    delete document_;
    delete jsConsole_;
    delete jsiContext_;
}









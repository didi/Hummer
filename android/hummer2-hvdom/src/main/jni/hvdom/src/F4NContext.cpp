//
// Created by didi on 2023/11/29.
//

#include "falcon/F4NContext.h"
#include <falcon/Document.h>
#include <falcon/Element.h>

F4NContext::F4NContext() {

}

void F4NContext::init(ConfigOptions *options, ComponentFactory *factory) {
    configOptions_ = options;
    componentFactory_ = factory;
    onCreate();
}


void F4NContext::onCreate() {
    jsiContext_ = new JsiContext();
}


void F4NContext::setMainThreadHandler(ThreadHandler *threadHandler) {
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

    JSConsole *jsConsole = new JSConsole(jsiContext_, consoleHandler_);
    jsConsole->onCreate();
    jsConsole_ = jsConsole;

    Document *document = new Document(jsiContext_);
    document->fnContext = this;
    document->onCreate();
    document_ = document;

}


JsiValue *F4NContext::evaluateJavaScript(const char *script, const char *scriptId) {
    JsiObjectEx *object = jsiContext_->evaluateJavaScript(script, scriptId);
    if (object != nullptr) {
        delete object;
    }
}

JsiValue *F4NContext::evaluateBytecode(const uint8_t *byteArray, size_t length, const char *scriptId) {
    JsiObjectEx *object = jsiContext_->evaluateBytecode(byteArray, length, scriptId);
    if (object != nullptr) {
        delete object;
    }
}

JsiValue *F4NContext::render(Element *rootElement) {
    return nullptr;
}


ComponentFactory *F4NContext::getComponentFactory() {
    return componentFactory_;
}


ConfigOptions *F4NContext::getConfigOptions() {
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
    task(nullptr, nullptr);
}

void *F4NContext::submitUITask(function<void *(void *, void *)> task) {

    task(nullptr, nullptr);
}

void F4NContext::stop() {
    onStop();
}

void F4NContext::onStop() {

}

void F4NContext::onDestroy() {
    document_->onDestroy();
    jsConsole_->onDestroy();
    jsiContext_->stop();
}

F4NContext::~F4NContext() {
    onDestroy();

    delete componentFactory_;
    delete document_;
    delete jsConsole_;
    delete jsiContext_;
}








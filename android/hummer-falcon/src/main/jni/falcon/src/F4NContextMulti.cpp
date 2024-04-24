//
// Created by didi on 2023/12/14.
//

#include "falcon/F4NContextMulti.h"

#include "falcon/F4NContext.h"
#include "falcon/F4NContextMT.h"
#include "falcon/F4NContextST.h"


F4NContextMulti::F4NContextMulti() : F4NContext() {

}

void F4NContextMulti::init(F4NConfigOptions *configOptions, F4NRenderInvoker *componentFactory) {

//    configOptions_ = configOptions;
//    componentFactory_ = componentFactory;
//    F4NContext::init(configOptions, componentFactory);

    if (configOptions->singleThread) {
        contextDelegate_ = new F4NContext();
    } else {
        contextDelegate_ = new F4NContextMT();
//        contextDelegate_ = new VDOMContextST();
    }
    contextDelegate_->init(configOptions, componentFactory);
}

void F4NContextMulti::onCreate() {
    contextDelegate_->onCreate();
}

void F4NContextMulti::setMainThreadHandler(F4NHandler *vdomThreadHandler) {
    contextDelegate_->setMainThreadHandler(vdomThreadHandler);
}

void F4NContextMulti::setLogHandler(LogHandler *logHandler) {
    contextDelegate_->setLogHandler(logHandler);
}

void F4NContextMulti::setConsoleHandler(ConsoleHandler *consoleHandler) {
    contextDelegate_->setConsoleHandler(consoleHandler);
}

void F4NContextMulti::setExceptionHandler(ExceptionHandler *exceptionHandler) {
    contextDelegate_->setExceptionHandler(exceptionHandler);
}

void F4NContextMulti::setEventTraceHandler(EventTraceHandler *eventTraceHandler) {
    contextDelegate_->setEventTraceHandler(eventTraceHandler);
}

void F4NContextMulti::start() {
    contextDelegate_->start();
}

void F4NContextMulti::onStart() {
    contextDelegate_->onStart();
}

JsiValue *F4NContextMulti::evaluateJavaScript(string script, string scriptId) {
    return contextDelegate_->evaluateJavaScript(script, scriptId);
}

JsiValue *F4NContextMulti::evaluateBytecode(const uint8_t *byteArray, size_t length, const char *scriptId) {
    return contextDelegate_->evaluateBytecode(byteArray, length, scriptId);
}

void F4NContextMulti::stop() {
    contextDelegate_->stop();
}

void F4NContextMulti::onStop() {
    contextDelegate_->onStop();
}

void F4NContextMulti::onDestroy() {
    contextDelegate_->onDestroy();
}


JsiValue *F4NContextMulti::render(F4NElement *rootElement) {
    return contextDelegate_->render(rootElement);
}

F4NConfigOptions *F4NContextMulti::getConfigOptions() {
    return contextDelegate_->getConfigOptions();
}

JsiContext *F4NContextMulti::getJsiContext() {
    return contextDelegate_->getJsiContext();
}

LogHandler *F4NContextMulti::getLogHandler() {
    return contextDelegate_->getLogHandler();
}

F4NLogger *F4NContextMulti::getLogger() {
    return contextDelegate_->getLogger();
}

ConsoleHandler *F4NContextMulti::getConsoleHandler() {
    return contextDelegate_->getConsoleHandler();
}

ExceptionHandler *F4NContextMulti::getExceptionHandler() {
    return contextDelegate_->getExceptionHandler();
}

void *F4NContextMulti::submitJsTask(function<void *(void *, void *)> task) {
    return contextDelegate_->submitJsTask(task);
}

void *F4NContextMulti::submitUITask(function<void *(void *, void *)> task) {
    return contextDelegate_->submitUITask(task);
}


F4NContextMulti::~F4NContextMulti() {
    if (contextDelegate_ != nullptr) {
        delete contextDelegate_;
    }
}



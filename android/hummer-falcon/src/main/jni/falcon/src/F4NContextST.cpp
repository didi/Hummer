//
// Created by didi on 2023/12/14.
//


#include "falcon/F4NContextST.h"

F4NContextST::F4NContextST() : F4NContext() {
    F4NContext::onDestroy();
}

void F4NContextST::init(F4NConfigOptions *configOptions, F4NRenderInvoker *componentFactory) {
    F4NContext::init(configOptions, componentFactory);

}


void F4NContextST::onCreate() {
    F4NContext::onCreate();
}

void F4NContextST::setMainThreadHandler(F4NHandler *threadHandler) {
    F4NContext::setMainThreadHandler(threadHandler);
}

void F4NContextST::start() {
    F4NContext::start();
//    vdomDocument_->init(jsiContext_);
//    vdomLayout_->init(this);
//    vdomRender_->init(componentFactory_, mainThreadHandler_, mainThreadHandler_);
//    vdomDocument_->vdomRender = vdomRender_;
}


void F4NContextST::onStart() {
    F4NContext::onStart();
}


JsiValue *F4NContextST::evaluateJavaScript(string script, string scriptId) {
   return F4NContext::evaluateJavaScript(script, scriptId);
}

JsiValue *F4NContextST::evaluateBytecode(const uint8_t *byteArray, size_t length, const char *scriptId) {
   return F4NContext::evaluateBytecode(byteArray, length, scriptId);
}


void F4NContextST::stop() {
    F4NContext::stop();
}

void F4NContextST::onStop() {
    F4NContext::onStop();
}


void F4NContextST::onDestroy() {
    F4NContext::onDestroy();
}

F4NContextST::~F4NContextST() {

}



//
// Created by didi on 2023/12/14.
//


#include "falcon/F4NContextMT.h"

//#include "falcon/Document.h"
//#include "falcon/render.h"

F4NContextMT::F4NContextMT() : F4NContext() {

}

void F4NContextMT::init(ConfigOptions *configOptions, ComponentFactory *componentFactory) {
    F4NContext::init(configOptions, componentFactory);

//    vdomDocument_ = new VDOMDocument();
//    vdomLayout_ = new VDOMLayout();
//    vdomRender_ = new VDOMRender();

    jsThreadHandler_ = new NativeThreadHandler();
    layoutThreadHandler_ = jsThreadHandler_;
    renderThreadHandler_ = jsThreadHandler_;

}


void F4NContextMT::onCreate() {
    F4NContext::onCreate();
}
//
//void ContextMT::setMainThreadHandler(ThreadHandler *vdomThreadHandler) {
//    FNContext::setMainThreadHandler(vdomThreadHandler);
//}

//void ContextMT::onJsThreadStart(ThreadHandler *threadHandler) {
//    FNContext::start();
//    renderThreadHandler_ = mainThreadHandler_;
////    vdomDocument_->init(jsiContext_);
////    vdomLayout_->init(this);
////    vdomRender_->init(componentFactory_, renderThreadHandler_, jsThreadHandler_);
////    vdomDocument_->vdomRender = vdomRender_;
//
//    prepared = true;
//}

void F4NContextMT::start() {
    F4NContext::start();

    jsThreadHandler_->onThreadStart = [&](ThreadHandler *thread) {
        info("VDOMContextMT::start() onThreadStart ok.");
        onJsThreadStart(thread);

    };
    jsThreadHandler_->start();

}


void F4NContextMT::onStart() {
    F4NContext::onStart();
}

JsiValue *F4NContextMT::evaluateJavaScript(const char *script, const char *scriptId) {
    if (prepared) {
        Message message = Message(1, "run");
        message.function = [&, script, scriptId](int id, const string &msg, void *data) {
//            info("VDOMContextMT::evaluateJavaScript() * scriptId=%s", script);
            jsiContext_->evaluateJavaScript(script, scriptId);
        };

        jsThreadHandler_->sendMessage(message);
    } else {
        info("VDOMContextMT::evaluateJavaScript() not prepared.");
    }
}

JsiValue *F4NContextMT::evaluateBytecode(const uint8_t *byteArray, size_t length, const char *scriptId) {
    return F4NContext::evaluateBytecode(byteArray, length, scriptId);
}


void F4NContextMT::stop() {
    F4NContext::stop();

}


void F4NContextMT::onStop() {
    F4NContext::onStop();
}

void F4NContextMT::onDestroy() {
    F4NContext::onDestroy();
}

F4NContextMT::~F4NContextMT() {

}

void F4NContextMT::onJsThreadStart(ThreadHandler *threadHandler) {

}

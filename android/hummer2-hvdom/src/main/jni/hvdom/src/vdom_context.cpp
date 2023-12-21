//
// Created by didi on 2023/11/29.
//

#include "hvdom/vdom_context.h"


VDOMContext::VDOMContext() {

}

void VDOMContext::init(VDOMConfig vdomConfig, ComponentFactory *componentFactory) {
    vdomConfig_ = vdomConfig;
    componentFactory_ = componentFactory;
    jsiContext_ = new JsiContext();
    vdomNativeBridge_ = new VDOMNativeBridge();
}


void VDOMContext::setMainThreadHandler(VDOMThreadHandler *vdomThreadHandler) {
    mainThreadHandler_ = vdomThreadHandler;
}

void VDOMContext::start() {
    jsiContext_->start();

    JSConsole *jsConsole = new JSConsole();
    jsConsole->init(&jsiContext_->env_);

    vdomNativeBridge_->init(jsiContext_, componentFactory_);
}

void VDOMContext::evaluateJavaScript(const char *script, const char *scriptId) {
    JsiObject *object = jsiContext_->evaluateJavaScript(script, scriptId);
    if (object != nullptr) {
        delete object;
    }
}

VDOMContext::~VDOMContext() {

    delete componentFactory_;
    delete vdomNativeBridge_;
    delete jsiContext_;
}

void VDOMContext::stop() {

}






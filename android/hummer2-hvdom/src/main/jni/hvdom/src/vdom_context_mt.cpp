//
// Created by didi on 2023/12/14.
//


#include "hvdom/vdom_context_mt.h"

#include "hvdom/vdom_document.h"
#include "hvdom/vdom_layout.h"
#include "hvdom/vdom_render.h"


void VDOMContextMT::init(VDOMConfig vdomConfig, ComponentFactory *componentFactory) {
    VDOMContext::init(vdomConfig, componentFactory);

    vdomDocument_ = new VDOMDocument();
    vdomLayout_ = new VDOMLayout();
    vdomRender_ = new VDOMRender();

    jsThreadHandler_ = new VDOMNativeThreadHandler();
    layoutThreadHandler_ = jsThreadHandler_;
    renderThreadHandler_ = jsThreadHandler_;

}

void VDOMContextMT::setMainThreadHandler(VDOMThreadHandler *vdomThreadHandler) {
    VDOMContext::setMainThreadHandler(vdomThreadHandler);
}

void VDOMContextMT::onJsThreadStart(VDOMThreadHandler *threadHandler) {
    VDOMContext::start();
    renderThreadHandler_ = mainThreadHandler_;
    vdomDocument_->init(jsiContext_);
    vdomLayout_->init(this);
    vdomRender_->init(componentFactory_, renderThreadHandler_, jsThreadHandler_);
    vdomDocument_->vdomRender = vdomRender_;

    prepared = true;
}

void VDOMContextMT::start() {

    jsThreadHandler_->onThreadStart = [&](VDOMThreadHandler *thread) {
        info("VDOMContextMT::start() onThreadStart ok.");
        onJsThreadStart(thread);

    };
    jsThreadHandler_->start();

}

void VDOMContextMT::evaluateJavaScript(const char *script, const char *scriptId) {
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

void VDOMContextMT::stop() {


}

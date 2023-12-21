//
// Created by didi on 2023/12/14.
//


#include "hvdom/vdom_context_st.h"

void VDOMContextST::init(VDOMConfig vdomConfig, ComponentFactory *componentFactory) {
    VDOMContext::init(vdomConfig, componentFactory);
    vdomDocument_ = new VDOMDocument();
    vdomLayout_ = new VDOMLayout();
    vdomRender_ = new VDOMRender();
}

void VDOMContextST::setMainThreadHandler(VDOMThreadHandler *vdomThreadHandler) {
    VDOMContext::setMainThreadHandler(vdomThreadHandler);
}

void VDOMContextST::start() {
    VDOMContext::start();
    vdomDocument_->init(jsiContext_);
    vdomLayout_->init(this);
    vdomRender_->init(componentFactory_, mainThreadHandler_, mainThreadHandler_);
    vdomDocument_->vdomRender = vdomRender_;
}

void VDOMContextST::evaluateJavaScript(const char *script, const char *scriptId) {
    VDOMContext::evaluateJavaScript(script, scriptId);
}

void VDOMContextST::stop() {
    VDOMContext::stop();
}

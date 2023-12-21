//
// Created by didi on 2023/12/14.
//

#include "hvdom/vdom_context_multi.h"

#include "hvdom/vdom_context.h"
#include "hvdom/vdom_context_mt.h"
#include "hvdom/vdom_context_st.h"

void VDOMContextMulti::init(VDOMConfig vdomConfig, ComponentFactory *componentFactory) {
    if (vdomConfig.singleThread) {
        contextDelegate_ = new VDOMContext();
    } else {
        contextDelegate_ = new VDOMContextMT();
//        contextDelegate_ = new VDOMContextST();
    }
    contextDelegate_->init(vdomConfig, componentFactory);
}

void VDOMContextMulti::setMainThreadHandler(VDOMThreadHandler *vdomThreadHandler) {
    contextDelegate_->setMainThreadHandler(vdomThreadHandler);
}

void VDOMContextMulti::start() {
    contextDelegate_->start();
}

void VDOMContextMulti::evaluateJavaScript(const char *script, const char *scriptId) {
    contextDelegate_->evaluateJavaScript(script, scriptId);
}

void VDOMContextMulti::stop() {
    contextDelegate_->stop();
}

VDOMContextMulti::VDOMContextMulti() {

}

VDOMContextMulti::~VDOMContextMulti() {
    delete contextDelegate_;
}

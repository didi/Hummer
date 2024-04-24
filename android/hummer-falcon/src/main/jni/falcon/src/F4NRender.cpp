////
//// Created by didi on 2023/11/20.
////
#include "falcon/F4NRender.h"


F4NRender::F4NRender() {

}

void F4NRender::init(F4NRenderInvoker *componentFactory, F4NHandler *renderThreadHandler, F4NHandler *jsThreadHandler) {
    renderInvoker = componentFactory;
}


void F4NRender::renderRoot(F4NElement *rootElement) {
    _rootElement_ = rootElement;
    buildElement(rootElement);
    renderInvoker->render(rootElement);
}


void F4NRender::buildElement(F4NElement *rootElement) {
    createElement(rootElement, rootElement);
}

bool F4NRender::commitRenderElementCall() {
    if (_renderFunctionCalls_->size() > 0) {
        copyElementCall(_renderFunctionCalls_, _myFunctionCalls_);
        return true;
    }
    return false;
}

void F4NRender::applyRenderElementCall() {
    list<F4NFunctionCall *> *targetCall = new list<F4NFunctionCall *>();
    copyElementCall(_myFunctionCalls_, targetCall);

    for (auto it = targetCall->begin(); it != targetCall->end(); it++) {
        applyElementFunctionCall(*it);
    }
}


void F4NRender::copyElementCall(list<F4NFunctionCall *> *source, list<F4NFunctionCall *> *target) {
    lock_guard<mutex> lock(_mtx_);
    for (auto it = source->begin(); it != source->end(); it++) {
        target->push_back(*it);
    }
    source->clear();
}


void F4NRender::createElement(F4NElement *rootElement, F4NElement *element) {
    element->_rootElement_ = rootElement;

    renderInvoker->newInstance(element);

    if (element->eventTarget != nullptr) {
        renderInvoker->setEventTarget(element, element->eventTarget);
    }

    applyElementAttribute(element);
    applyElementStyle(element);
    applyElementEvent(element);
    applyElementAnimation(element);
    applyElementCall(element);

    list<F4NElement *> *children = element->_children_;
    for (auto child = children->begin(); child != children->end(); child++) {
        F4NElement *childElement = *child;
        createElement(rootElement, childElement);
        renderInvoker->appendChild(element, childElement);
    }

}

void F4NRender::applyElementAttribute(F4NElement *element) {
    map<string, JsiValue *> *attributes = element->_attributes_;
    JsiObject *jsiObject = new JsiObject();
    for (auto it = attributes->begin(); it != attributes->end(); it++) {
        jsiObject->setValue(it->first, it->second);
    }
    renderInvoker->setAttributes(element, jsiObject);
}

void F4NRender::applyElementStyle(F4NElement *element) {
    if (element->hmStyle_ != nullptr) {
        renderInvoker->setStyles(element, element->hmStyle_);
    }
}

void F4NRender::applyElementEvent(F4NElement *element) {
    auto *events = element->_events_;
    for (auto event = events->begin(); event != events->end(); event++) {
        renderInvoker->addEventListener(element, *event);
    }
}

void F4NRender::applyElementAnimation(F4NElement *element) {
    auto animations = element->_animations_;
    for (auto it = animations->begin(); it != animations->end(); it++) {
        renderInvoker->addAnimation(element, it->second, it->first);
    }
}

void F4NRender::applyElementCall(F4NElement *element) {
    auto targetCall = element->_elementFunctionCalls_;
    for (auto it = targetCall->begin(); it != targetCall->end(); it++) {
        applyElementFunctionCall(*it);
    }
}


void F4NRender::applyElementFunctionCall(F4NFunctionCall *call) {
//    switch (call->methodId) {
        renderInvoker->invoke(FACTORY_TYPE_RENDER,
                              call->thisElement->odjId,
                              METHOD_TYPE_CALL,
                              call->thisElement->tag.c_str(),
                              call->methodName.c_str(),
                              call->size,
                              call->params);
//    }
}

void F4NRender::applyRenderTag(F4NElement *element) {
    element->applyRenderTag();
    element->_renderFunctionCalls_ = this->_renderFunctionCalls_;

    auto *children = element->_children_;
    for (auto child = children->begin(); child != children->end(); child++) {
        applyRenderTag(*child);
    }
}

F4NRender::~F4NRender() {

}





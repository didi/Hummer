////
//// Created by didi on 2023/11/20.
////
#include "falcon/F4NRender.h"
#include "falcon/F4NUtil.h"


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
        delete *it;
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
    element->_created_ = true;

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
        if (!childElement->_created_) {
            createElement(rootElement, childElement);
        }
        renderInvoker->appendChild(element, childElement);
    }

}

void F4NRender::applyElementAttribute(F4NElement *element) {
    map<string, JsiValue *> *attributes = element->_attributes_;
    JsiObject *jsiObject = new JsiObject();
    for (auto it = attributes->begin(); it != attributes->end(); it++) {
        JsiValue *jsiValue = convertElementParams(element, it->second);
        jsiObject->setValue(it->first, jsiValue);
    }
    renderInvoker->setAttributes(element, jsiObject);
}

void F4NRender::applyElementStyle(F4NElement *element) {
    if (element->_Style_ != nullptr) {
        renderInvoker->setStyles(element, element->_Style_);
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
        delete *it;
    }
    element->_elementFunctionCalls_->clear();
}

F4NElement *F4NRender::createChildElement(F4NElement *thisElement, JsiValue *jsiValue) {
    F4NElement *child = F4NUtil::convert2Element(jsiValue);
    if (child != nullptr && !child->_created_) {
        F4NElement *rootElement = thisElement == nullptr ? nullptr : thisElement->_rootElement_;
        createElement(rootElement, child);
    }
    return child;
}

JsiValue *F4NRender::convertElementParams(F4NElement *thisElement, JsiValue *jsiValue) {
    F4NElement *element = createChildElement(thisElement, jsiValue);
    if (element != nullptr) {
        return new JsiNumber(element->odjId);
    }
    return jsiValue;
}

void F4NRender::applyElementFunctionCall(F4NFunctionCall *call) {
    switch (call->methodId) {
        case F4NElement::MethodId_appendChild: {
            if (call->size > 0) {
                JsiValue *params = call->params[0];
                F4NElement *child = createChildElement(call->thisElement, params);
                if (child == nullptr) {
                    return;
                }
                renderInvoker->appendChild(call->thisElement, child);
            }
        }
            break;
        case F4NElement::MethodId_removeChild: {
            if (call->size > 0) {
                JsiValue *params = call->params[0];
                F4NElement *child = createChildElement(call->thisElement, params);
                if (child == nullptr) {
                    return;
                }
                renderInvoker->removeChild(call->thisElement, child);
            }
        }
            break;
        case F4NElement::MethodId_removeAll:
            renderInvoker->removeAll(call->thisElement);
            break;
        case F4NElement::MethodId_insertBefore: {
            if (call->size >= 2) {
                JsiValue *params0 = call->params[0];
                JsiValue *params1 = call->params[1];
                F4NElement *child = createChildElement(call->thisElement, params0);
                F4NElement *anchor = createChildElement(call->thisElement, params1);
                if (child == nullptr || anchor == nullptr) {
                    return;
                }
                renderInvoker->insertBefore(call->thisElement, child, anchor);
            }
        }
            break;
        case F4NElement::MethodId_replaceChild: {
            if (call->size >= 2) {
                JsiValue *params0 = call->params[0];
                JsiValue *params1 = call->params[1];
                F4NElement *newNode = createChildElement(call->thisElement, params0);
                F4NElement *oldNode = createChildElement(call->thisElement, params1);
                if (newNode == nullptr || oldNode == nullptr) {
                    return;
                }
                renderInvoker->replaceChild(call->thisElement, newNode, oldNode);
            }
        }
            break;
        case F4NElement::MethodId_setAttributes: {
            if (call->size > 0) {
                JsiValue *params0 = call->params[0];
                if (params0->getType() == TYPE_OBJECT) {
                    JsiObject *object = (JsiObject *) params0;
                    map<string, JsiValue *> attributes = object->valueMap_;
                    JsiObject *jsiObject = new JsiObject();
                    for (auto it = attributes.begin(); it != attributes.end(); it++) {
                        JsiValue *jsiValue = convertElementParams(call->thisElement, it->second);
                        jsiObject->setValue(it->first, jsiValue);
                    }
                    renderInvoker->setAttributes(call->thisElement, jsiObject);
                }
            }
        }
            break;
        case F4NElement::MethodId_getAttribute: {
            if (call->size >= 2) {
                JsiValue *params0 = call->params[0];
                JsiValue *params1 = call->params[1];
                string attributeName = ((JsiString *) params0)->value_;
                auto jsiFunction = (JsiFunction *) params1;
                auto *function = new F4NFunction(call->thisElement->context, jsiFunction);

                renderInvoker->getAttribute(call->thisElement, attributeName, function);
            }
        }
            break;
        case F4NElement::MethodId_setStyles: {
            renderInvoker->setStyles(call->thisElement, call->thisElement->_Style_);
        }
            break;
        case F4NElement::MethodId_getReact: {
            if (call->size > 0) {
                JsiFunction *params0 = (JsiFunction *) call->params[0];
                auto *function = new F4NFunction(call->thisElement->context, params0);
                renderInvoker->getReact(call->thisElement, function);
            }
        }
            break;
        case F4NElement::MethodId_addEventListener: {
            if (call->size > 0) {
                string params0 = ((JsiString *) call->params[0])->value_;
                renderInvoker->addEventListener(call->thisElement, params0);
            }
        }
            break;
        case F4NElement::MethodId_removeEventListener: {
            if (call->size > 0) {
                string params0 = ((JsiString *) call->params[0])->value_;
                renderInvoker->removeEventListener(call->thisElement, params0);
            }
        }
            break;
        case F4NElement::MethodId_addAnimation: {
            if (call->size >= 2) {
                JsiValue *params0 = call->params[0];
                JsiValue *params1 = call->params[1];
                string key = ((JsiString *) params1)->value_;
                renderInvoker->addAnimation(call->thisElement, params0, key);
            }
        }

            break;
        case F4NElement::MethodId_removeAnimationForKey: {
            if (call->size > 0) {
                string params0 = ((JsiString *) call->params[0])->value_;
                renderInvoker->removeAnimationForKey(call->thisElement, params0);
            }
        }

            break;
        case F4NElement::MethodId_removeAllAnimation: {
            renderInvoker->removeAllAnimation(call->thisElement);
        }
            break;
        case F4NElement::MethodId_setEventTarget: {
            renderInvoker->setEventTarget(call->thisElement, call->thisElement->eventTarget);
        }
            break;
        case F4NElement::MethodId_invoke:

            //处理参数类型是Function的参数提供回调支持
            if (call->size > 0) {
                for (int i = 0; i < call->size; i++) {
                    JsiValue *value = call->params[i];
                    if (value != nullptr && value->getType() == TYPE_NAPIFunction) {
                        call->params[i] = new F4NFunction(call->thisElement->context, (JsiFunction *) call->params[i]);
                        call->params[i]->protect();
                    }
                }
            }
            //如果参数中有Element需要转换
            if (call->size > 0) {
                for (int i = 0; i < call->size; i++) {
                    call->params[i] = convertElementParams(call->thisElement, call->params[i]);
                }
            }

            renderInvoker->invoke(FACTORY_TYPE_RENDER,
                                  call->thisElement->odjId,
                                  METHOD_TYPE_CALL,
                                  call->thisElement->tag.c_str(),
                                  call->methodName.c_str(),
                                  call->size,
                                  call->params);
            break;

    }


//    renderInvoker->invoke(FACTORY_TYPE_RENDER,
//                          call->thisElement->odjId,
//                          METHOD_TYPE_CALL,
//                          call->thisElement->tag.c_str(),
//                          call->methodName.c_str(),
//                          call->size,
//                          call->params);

}

void F4NRender::applyRenderTag(F4NElement *element) {
    element->applyRenderTag();
    element->_renderFunctionCalls_ = this->_renderFunctionCalls_;

    auto *children = element->_children_;
    for (auto child = children->begin(); child != children->end(); child++) {
        applyRenderTag(*child);
    }
}

void F4NRender::onDestroy() {
    info("F4NRender::onDestroy()");
    commitRenderElementCall();

    for (auto it = _myFunctionCalls_->begin(); it != _myFunctionCalls_->end(); it++) {
        delete *it;
    }
    _myFunctionCalls_->clear();

}

F4NRender::~F4NRender() {
    info("F4NRender::~F4NRender()");

    _renderFunctionCalls_->clear();
    delete _renderFunctionCalls_;
    _renderFunctionCalls_ = nullptr;

    _myFunctionCalls_->clear();
    delete _myFunctionCalls_;
    _myFunctionCalls_ = nullptr;
}





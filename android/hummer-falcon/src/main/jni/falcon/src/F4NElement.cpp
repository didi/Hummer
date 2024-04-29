//
// Created by didi on 2023/11/20.
//

#include "falcon/F4NElement.h"
#include "falcon/F4NDocument.h"
#include "falcon/F4NFunctionCall.h"
#include "falcon/F4NUtil.h"


F4NElement::F4NElement(long objId, JsiContext *context, F4NRenderInvoker *componentFactory) : F4NComponent(objId, context, componentFactory) {

    hmStyle_ = new F4NStyle();
}


void F4NElement::onCreate(string tag, JsiValue *props) {
    F4NComponent::onCreate(tag, props);
    object->registerFunction(MethodId_appendChild, "appendChild", elementFuncWrapper, this);
    object->registerFunction(MethodId_removeChild, "removeChild", elementFuncWrapper, this);
    object->registerFunction(MethodId_removeAll, "removeAll", elementFuncWrapper, this);
    object->registerFunction(MethodId_insertBefore, "insertBefore", elementFuncWrapper, this);
    object->registerFunction(MethodId_replaceChild, "replaceChild", elementFuncWrapper, this);
    object->registerFunction(MethodId_setAttributes, "setAttributes", elementFuncWrapper, this);
    object->registerFunction(MethodId_getAttribute, "getAttribute", elementFuncWrapper, this);
    object->registerFunction(MethodId_setStyles, "setStyles", elementFuncWrapper, this);
    object->registerFunction(MethodId_getReact, "getReact", elementFuncWrapper, this);
    object->registerFunction(MethodId_addAnimation, "addAnimation", elementFuncWrapper, this);
    object->registerFunction(MethodId_removeAnimationForKey, "removeAnimationForKey", elementFuncWrapper, this);
    object->registerFunction(MethodId_removeAllAnimation, "removeAllAnimation", elementFuncWrapper, this);
}


F4NElement *F4NElement::convert2Element(JsiValue *jsiValue) {
    return F4NUtil::convert2Element(jsiValue);
}


F4NStyle *F4NElement::convert2Style(JsiValue *jsiValue) {
    if (jsiValue->getType() == TYPE_OBJECT) {
        return new F4NStyle((JsiObject *) jsiValue);
    }
    return new F4NStyle();
}


JsiValue *F4NElement::appendChild(size_t size, JsiValue **params) {
    if (size >= 1) {
        JsiValue *jsiValue = params[0];
        F4NElement *child = convert2Element(jsiValue);
        appendChild(child);
    }
    return nullptr;
}

void F4NElement::appendChild(F4NElement *child) {
    child->_parentElement_ = this;
    _children_->push_back(child);
}

JsiValue *F4NElement::removeChild(size_t size, JsiValue **params) {
    if (size >= 1) {
        JsiValue *jsiValue = params[0];
        F4NElement *child = convert2Element(jsiValue);
        removeChild(child);
    }
    return nullptr;
}

void F4NElement::removeChild(F4NElement *child) {
    _children_->remove(child);
    child->_parentElement_ = nullptr;
}

JsiValue *F4NElement::removeAll(size_t size, JsiValue **params) {
    removeAll();
    return nullptr;
}


void F4NElement::removeAll() {
    for (auto it = _children_->begin(); it != _children_->end(); it++) {
        (*it)->_parentElement_ = nullptr;
    }
    _children_->clear();
}


JsiValue *F4NElement::insertBefore(size_t size, JsiValue **params) {
    if (size >= 2) {
        F4NElement *child = convert2Element(params[0]);
        F4NElement *anchor = convert2Element(params[1]);
        insertBefore(child, anchor);
    }
    return nullptr;
}

void F4NElement::insertBefore(F4NElement *child, F4NElement *anchor) {
    auto it = find(_children_->begin(), _children_->end(), anchor);
    anchor->_parentElement_ = this;
    _children_->insert(it, child);
}

JsiValue *F4NElement::replaceChild(size_t size, JsiValue **params) {
    if (size >= 2) {
        F4NElement *newNode = convert2Element(params[0]);
        F4NElement *oldNode = convert2Element(params[1]);
        replaceChild(newNode, oldNode);
    }
    return nullptr;
}

void F4NElement::replaceChild(F4NElement *newNode, F4NElement *oldNode) {
    newNode->_parentElement_ = this;
    oldNode->_parentElement_ = nullptr;
    replace(_children_->begin(), _children_->end(), oldNode, newNode);
}


JsiValue *F4NElement::setAttributes(size_t size, JsiValue **params) {
    if (size > 0) {
        JsiValue *jsiValue = params[0];
        if (jsiValue->getType() == TYPE_OBJECT) {
            JsiObject *jsiObject = static_cast<JsiObject *> (jsiValue);
            setAttributes(jsiObject);
        }
    }
    return nullptr;
}

void F4NElement::setAttributes(JsiObject *jsiObject) {
    info("F4NElement::setAttributes() id=%u,params=%s,origin=%s", odjId, jsiObject->toString().c_str(), "");
    map<string, JsiValue *> temp = jsiObject->valueMap_;
    if (temp.size() > 0) {
        for (auto it = temp.begin(); it != temp.end(); it++) {
            auto existing = _attributes_->find(it->first);
            // 如果key已经存在，则删除旧值
            if (existing != _attributes_->end()) {
                _attributes_->erase(existing);
            }
            _attributes_->insert(make_pair(it->first, it->second));
        }
    }
}

JsiValue *F4NElement::getAttribute(size_t size, JsiValue **params) {
    if (size >= 2) {
        string key = static_cast<JsiString *>(params[0])->value_;
        JsiFunction *jsiFunction = static_cast<JsiFunction *> (params[1]);
        getAttribute(key, jsiFunction);
    }
    return nullptr;
}

JsiValue *F4NElement::getAttribute(string name, JsiFunction *jsiFunction) {
    return nullptr;
}

JsiValue *F4NElement::setStyles(size_t size, JsiValue **params) {
    if (size >= 1) {
        F4NStyle *hmStyle = convert2Style(params[0]);
        setStyles(hmStyle);
    }
    return nullptr;
}

void F4NElement::setStyles(F4NStyle *hmStyle) {
    hmStyle_->mergeNewStyle(hmStyle);
}

JsiValue *F4NElement::getReact(size_t size, JsiValue **params) {
    if (size >= 1) {
        JsiFunction *jsiFunction = static_cast<JsiFunction *> (params[0]);
        getReact(jsiFunction);
    }
    return nullptr;
}

void F4NElement::getReact(JsiFunction *jsiFunction) {

}

JsiValue *F4NElement::addEventListener(size_t size, JsiValue **params) {
    if (size >= 1) {
        string event = static_cast<JsiString *>(params[0])->value_;
        addEventListener(event);
    }
    applyInvoke(MethodId_addEventListener, "addEventListener", size, params);
    return nullptr;
}

void F4NElement::addEventListener(string event) {
    _events_->insert(event);
}

JsiValue *F4NElement::removeEventListener(size_t size, JsiValue **params) {
    if (size >= 1) {
        string event = static_cast<JsiString *>(params[0])->value_;
        removeEventListener(event);
    }
    applyInvoke(MethodId_removeEventListener, "removeEventListener", size, params);
    return nullptr;
}

void F4NElement::removeEventListener(string event) {
    auto it = _events_->find(event);
    if (it != _events_->end()) {
        _events_->erase(it);
    }
}

JsiValue *F4NElement::addAnimation(size_t size, JsiValue **params) {
    if (size >= 2) {
        string key = static_cast<JsiString *>(params[1])->value_;
        addAnimation(params[0], key);
    }
    return nullptr;
}

void F4NElement::addAnimation(JsiValue *animation, string key) {
    _animations_->insert(make_pair(key, animation));
}

JsiValue *F4NElement::removeAnimationForKey(size_t size, JsiValue **params) {
    if (size >= 1) {
        string key = static_cast<JsiString *>(params[0])->value_;
        removeAnimationForKey(key);
    }
    return nullptr;
}

void F4NElement::removeAnimationForKey(string key) {
    auto it = _animations_->find(key);
    if (it != _animations_->end()) {
        _animations_->erase(it);
    }
}

JsiValue *F4NElement::removeAllAnimation(size_t size, JsiValue **params) {
    removeAllAnimation();
    return nullptr;
}

void F4NElement::removeAllAnimation() {
    _animations_->clear();
}

JsiValue *F4NElement::setEventTarget(size_t size, JsiValue **params) {
    JsiValue *result = F4NComponent::setEventTarget(size, params);
    applyInvoke(MethodId_setEventTarget, "setEventTarget", size, params);
    return result;
}

JsiValue *F4NElement::setEventTarget(JsiFunction *jsiFunction) {
    auto *function = new F4NFunction(context, jsiFunction, false);
    this->eventTarget = new F4NEventTarget(function);
    return nullptr;
}

JsiValue *F4NElement::invoke(size_t size, JsiValue **params) {
    return F4NComponent::invoke(size, params);
}

JsiValue *F4NElement::invoke(string methodName, size_t size, JsiValue **params) {
    applyInvoke(MethodId_invoke, methodName, size, params);
    return nullptr;
}


void F4NElement::applyRenderTag() {
    this->_alreadyRender_ = true;
}

void F4NElement::applyInvoke(long methodId, string methodName, size_t size, JsiValue **params) {
    if (!_alreadyRender_) {
        if (methodId == MethodId_invoke || methodId == MethodId_getReact || methodId == MethodId_getAttribute) {
            F4NFunctionCall *functionCall = new F4NFunctionCall(this, methodId, methodName, size, params);
            _elementFunctionCalls_->push_back(functionCall);
        }
    } else {
        if (_renderFunctionCalls_ != nullptr) {
            F4NFunctionCall *functionCall = new F4NFunctionCall(this, methodId, methodName, size, params);
            _renderFunctionCalls_->push_back(functionCall);
        }
    }
}


void F4NElement::onDestroy() {
    F4NComponent::onDestroy();
}

void F4NElement::onJsiFinalize(void *finalizeData, void *finalizeHint) {
    F4NComponent::onJsiFinalize(finalizeData, finalizeHint);
}

F4NElement::~F4NElement() {

}


JsiValue *elementFuncWrapper(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue *params[], void *data) {
    auto *bridge = static_cast<F4NElement *>(data);
    JsiValue *result = nullptr;
    switch (methodId) {
        case F4NElement::MethodId_appendChild:
            result = bridge->appendChild(size, params);
            break;
        case F4NElement::MethodId_removeChild:
            result = bridge->removeChild(size, params);
            break;
        case F4NElement::MethodId_removeAll:
            result = bridge->removeAll(size, params);
            break;
        case F4NElement::MethodId_insertBefore:
            result = bridge->insertBefore(size, params);
            break;
        case F4NElement::MethodId_replaceChild:
            result = bridge->replaceChild(size, params);
            break;
        case F4NElement::MethodId_setAttributes:
            result = bridge->setAttributes(size, params);
            break;
        case F4NElement::MethodId_getAttribute:
            result = bridge->getAttribute(size, params);
            break;
        case F4NElement::MethodId_setStyles:
            result = bridge->setStyles(size, params);
            break;
        case F4NElement::MethodId_getReact:
            result = bridge->getReact(size, params);
            break;
        case F4NElement::MethodId_addAnimation:
            result = bridge->addAnimation(size, params);
            break;
        case F4NElement::MethodId_removeAnimationForKey:
            result = bridge->removeAnimationForKey(size, params);
            break;
        case F4NElement::MethodId_removeAllAnimation:
            result = bridge->removeAllAnimation(size, params);
            break;
    }
    bridge->applyInvoke(methodId, methodName, size, params);
    return result;
}

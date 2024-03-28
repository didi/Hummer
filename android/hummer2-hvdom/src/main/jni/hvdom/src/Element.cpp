//
// Created by didi on 2023/11/20.
//

#include "falcon/Element.h"
#include "falcon/Document.h"


Element::Element() : Component() {

}

Element::Element(long objId, JsiContext *context, ComponentFactory *componentFactory) : Component(objId, context, componentFactory) {

    //TODO
}


void Element::onCreate(string tag, JsiValue *props) {
    Component::onCreate(tag, props);
    object->registerFunction(MethodId_appendChild, "appendChild", elementFuncWrapper, this);
    object->registerFunction(MethodId_removeChild, "removeChild", elementFuncWrapper, this);
    object->registerFunction(MethodId_removeAll, "removeAll", elementFuncWrapper, this);
    object->registerFunction(MethodId_insertBefore, "insertBefore", elementFuncWrapper, this);
    object->registerFunction(MethodId_replaceChild, "replaceChild", elementFuncWrapper, this);
    object->registerFunction(MethodId_setAttributes, "setAttributes", elementFuncWrapper, this);
    object->registerFunction(MethodId_getAttribute, "getAttribute", elementFuncWrapper, this);
    object->registerFunction(MethodId_setStyles, "setStyles", elementFuncWrapper, this);
    object->registerFunction(MethodId_getReact, "getReact", elementFuncWrapper, this);
    object->registerFunction(MethodId_addEventListener, "addEventListener", elementFuncWrapper, this);
    object->registerFunction(MethodId_removeEventListener, "removeEventListener", elementFuncWrapper, this);
    object->registerFunction(MethodId_addAnimation, "addAnimation", elementFuncWrapper, this);
    object->registerFunction(MethodId_removeAnimationForKey, "removeAnimationForKey", elementFuncWrapper, this);
    object->registerFunction(MethodId_removeAllAnimation, "removeAllAnimation", elementFuncWrapper, this);
}


Element *Element::convert2Element(JsiValue *jsiValue) {
    return nullptr;
}


HMStyle *Element::convert2Style(JsiValue *jsiValue) {
    return nullptr;
}


JsiValue *Element::appendChild(size_t size, JsiValue **params) {
    if (size >= 1) {
        JsiValue *jsiValue = params[0];
        Element *child = convert2Element(jsiValue);
        appendChild(child);
    }
    return nullptr;
}

void Element::appendChild(Element *child) {
    children_->push_back(child);
}

JsiValue *Element::removeChild(size_t size, JsiValue **params) {
    if (size >= 1) {
        JsiValue *jsiValue = params[0];
        Element *child = convert2Element(jsiValue);
        removeChild(child);
    }
    return nullptr;
}

void Element::removeChild(Element *child) {
    children_->remove(child);
}

JsiValue *Element::removeAll(size_t size, JsiValue **params) {
    removeAll();
    return nullptr;
}


void Element::removeAll() {
    children_->clear();
}


JsiValue *Element::insertBefore(size_t size, JsiValue **params) {
    if (size >= 2) {
        Element *child = convert2Element(params[0]);
        Element *anchor = convert2Element(params[1]);
        insertBefore(child, anchor);
    }
    return nullptr;
}

void Element::insertBefore(Element *child, Element *anchor) {
    auto it = find(children_->begin(), children_->end(), anchor);
    children_->insert(it, child);
}

JsiValue *Element::replaceChild(size_t size, JsiValue **params) {
    if (size >= 2) {
        Element *newNode = convert2Element(params[0]);
        Element *oldNode = convert2Element(params[1]);
        replaceChild(newNode, oldNode);
    }
    return nullptr;
}

void Element::replaceChild(Element *newNode, Element *oldNode) {
    replace(children_->begin(), children_->end(), oldNode, newNode);
}


JsiValue *Element::setAttributes(size_t size, JsiValue **params) {
    if (size > 0) {
        JsiValue *jsiValue = params[0];
        if (jsiValue->getType() == TYPE_OBJECT) {
            JsiObject *jsiObject = static_cast<JsiObject *> (jsiValue);
            setAttributes(jsiObject);
        }
    }
    return nullptr;
}

void Element::setAttributes(JsiObject *jsiObject) {
    map<string, JsiValue *> temp = jsiObject->valueMap_;
    if (temp.size() > 0) {
        attributes_->insert(temp.begin(), temp.end());
    }
}

JsiValue *Element::getAttribute(size_t size, JsiValue **params) {
    if (size >= 2) {
        string key = static_cast<JsiString *>(params[0])->value_;
        JsiFunction *jsiFunction = static_cast<JsiFunction *> (params[1]);
        getAttribute(key, jsiFunction);
    }
    return nullptr;
}

JsiValue *Element::getAttribute(string name, JsiFunction *jsiFunction) {
    return nullptr;
}

JsiValue *Element::setStyles(size_t size, JsiValue **params) {
    if (size >= 1) {
        HMStyle *hmStyle = convert2Style(params[0]);
        setStyles(hmStyle);
    }
    return nullptr;
}

void Element::setStyles(HMStyle *hmStyle) {
    hmStyle_->mergeNewStyle(hmStyle);
}

JsiValue *Element::getReact(size_t size, JsiValue **params) {
    if (size >= 1) {
        JsiFunction *jsiFunction = static_cast<JsiFunction *> (params[0]);
        getReact(jsiFunction);
    }
    return nullptr;
}

void Element::getReact(JsiFunction *jsiFunction) {

}

JsiValue *Element::addEventListener(size_t size, JsiValue **params) {
    if (size >= 1) {
        string event = static_cast<JsiString *>(params[0])->value_;
        addEventListener(event);
    }
    return nullptr;
}

void Element::addEventListener(string event) {
    events_->insert(event);
}

JsiValue *Element::removeEventListener(size_t size, JsiValue **params) {
    if (size >= 1) {
        string event = static_cast<JsiString *>(params[0])->value_;
        removeEventListener(event);
    }
    return nullptr;
}

void Element::removeEventListener(string event) {
    auto it = events_->find(event);
    if (it != events_->end()) {
        events_->erase(it);
    }
}


void Element::onDestroy() {
    Component::onDestroy();
}

void Element::onJsiFinalize(void *finalizeData, void *finalizeHint) {
    Component::onJsiFinalize(finalizeData, finalizeHint);
}

Element::~Element() {

}

JsiValue *Element::addAnimation(size_t size, JsiValue **params) {
    if (size >= 2) {
        string key = static_cast<JsiString *>(params[1])->value_;
        addAnimation(params[0], key);
    }
    return nullptr;
}

void Element::addAnimation(JsiValue *animation, string key) {
    animations_->insert(make_pair(key, animation));
}

JsiValue *Element::removeAnimationForKey(size_t size, JsiValue **params) {
    if (size >= 1) {
        string key = static_cast<JsiString *>(params[0])->value_;
        removeAnimationForKey(key);
    }
    return nullptr;
}

void Element::removeAnimationForKey(string key) {
    auto it = animations_->find(key);
    if (it != animations_->end()) {
        animations_->erase(it);
    }
}

JsiValue *Element::removeAllAnimation(size_t size, JsiValue **params) {
    removeAllAnimation();
    return nullptr;
}

void Element::removeAllAnimation() {
    animations_->clear();
}


JsiValue *elementFuncWrapper(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue *params[], void *data) {
    auto *bridge = static_cast<Element *>(data);

    switch (methodId) {
        case Element::MethodId_appendChild:
            return bridge->setEventTarget(size, params);
        case Element::MethodId_removeChild:
            return bridge->invoke(size, params);
        case Element::MethodId_removeAll:
            return bridge->invoke(size, params);
        case Element::MethodId_insertBefore:
            return bridge->invoke(size, params);
        case Element::MethodId_replaceChild:
            return bridge->invoke(size, params);
        case Element::MethodId_setAttributes:
            return bridge->invoke(size, params);
        case Element::MethodId_getAttribute:
            return bridge->invoke(size, params);
        case Element::MethodId_setStyles:
            return bridge->invoke(size, params);
        case Element::MethodId_getReact:
            return bridge->invoke(size, params);
        case Element::MethodId_addEventListener:
            return bridge->invoke(size, params);
        case Element::MethodId_removeEventListener:
            return bridge->invoke(size, params);
        case Element::MethodId_addAnimation:
            return bridge->addAnimation(size, params);
        case Element::MethodId_removeAnimationForKey:
            return bridge->removeAnimationForKey(size, params);
        case Element::MethodId_removeAllAnimation:
            return bridge->removeAllAnimation(size, params);
    }
    return nullptr;
}



//
//NAPIValue *Element::createValue(NAPIEnv *env) {
//    NAPIExceptionStatus status;
//    NAPIHandleScope handleScope;
////    JSUtils::openHandleScope(env, &handleScope);
//    status = JSUtils::createObject(env, "Object", 0, nullptr, &elementValue_);
//    elementValue_ptr_ = &elementValue_;
//    if (status != NAPIExceptionOK) {
//        error("Element::createValue() error. %d", status);
//    }
//
//    JSUtils::registerFunction(env, elementValue_ptr_, "invoke", invokeWrapper, this);
//    JSUtils::registerFunction(env, elementValue_ptr_, "appendChild", appendChildWrapper, this);
//    JSUtils::registerFunction(env, elementValue_ptr_, "appendChildAt", appendChildAtWrapper, this);
//    JSUtils::registerFunction(env, elementValue_ptr_, "removeChild", removeChildWrapper, this);
//    JSUtils::registerFunction(env, elementValue_ptr_, "removeChildAt", removeChildAtWrapper, this);
//    JSUtils::registerFunction(env, elementValue_ptr_, "setAttribute", setAttributeWrapper, this);
//    JSUtils::registerFunction(env, elementValue_ptr_, "getAttribute", getAttributeWrapper, this);
//    JSUtils::registerFunction(env, elementValue_ptr_, "setStyle", setStyleWrapper, this);
//    JSUtils::registerFunction(env, elementValue_ptr_, "addEventListener", addEventListenerWrapper, this);
//    JSUtils::registerFunction(env, elementValue_ptr_, "removeEventListener", removeEventListenerWrapper, this);
//
////    JSUtils::closeHandleScope(env, &handleScope);
//    return elementValue_ptr_;
//}

//void Element::appendChild(Element *element) {
//    children_->push_back(element);
//}
//
//void Element::appendChild(int index, Element *element) {
//    size_t indexToAccess = index;
//    auto it = children_->begin();
//    advance(it, indexToAccess);
//    children_->insert(it, reinterpret_cast<Element *>(element));
//}
//
//void Element::removeChild(Element *element) {
//    children_->remove(element);
//}
//
//void Element::removeChildAt(int index) {
//    size_t indexToAccess = index;
//    auto it = children_->begin();
//    advance(it, indexToAccess);
//    children_->erase(it);
//}
//
//Element *Element::getChildAt(int index) {
//    size_t indexToAccess = index;
//    auto it = children_->begin();
//    advance(it, indexToAccess);
//    return *it;
//}
//
//list<Element *> Element::getChildList() {
//    return *children_;
//}
//
//
//void Element::setAttribute(string name, JsiValue *hmValue) {
//    (*attributes_)[name] = hmValue;
//}
//
//void Element::setStyle(JsiValue *hmValue) {
//    style_ = hmValue;
//}
//
//JsiValue *Element::getAttribute(string name) {
//    return (*attributes_)[name];
//}
//
//JsiValue *Element::invoke(InvokeFunction *invokeFunction) {
//    invokeFunctions_->push_back(invokeFunction);
//    return nullptr;
//}
//
//void Element::addEventListener(string eventName, JsiFunction *jsListener) {
//    (*eventListeners_)[eventName] = jsListener;
//}
//
//void Element::removeEventListener(string eventName, JsiFunction *jsListener) {
//    if (!eventName.empty()) {
//        auto it = eventListeners_->find(eventName);
//        if (it != eventListeners_->end()) {
//            delete it->second;
//            eventListeners_->erase(it);
//        }
//    } else {
//        for (auto it = eventListeners_->begin(); it != eventListeners_->end(); ++it) {
//            if (it->second == jsListener) {
//                delete it->second;
//                eventListeners_->erase(it);
//
//                break;  // Exit the loop once found and deleted
//            }
//        }
//    }
//}
//
//string Element::toString() {
//    string sb = string("Element{");
//    sb.append("tag=").append(tag_).append(",name=").append(name_).append(",style=").append(style_ == nullptr ? "" : style_->toString()).append(",attributes={");
//
//    for (auto it = attributes_->begin(); it != attributes_->end(); it++) {
//        sb.append(it->first).append("=").append(it->second->toString()).append(",");
//    }
//    sb.append("},eventListeners={");
//
//    for (auto it = eventListeners_->begin(); it != eventListeners_->end(); it++) {
//        sb.append(it->first).append("=").append(it->second->toString()).append(",");
//    }
//    sb.append("},invokeFunctions=[");
//
//    for (auto it = invokeFunctions_->begin(); it != invokeFunctions_->end(); it++) {
//        sb.append((*it)->toString()).append(",");
//    }
//    sb.append("],children=[");
//
//    for (auto it = children_->begin(); it != children_->end(); it++) {
//        sb.append((*it)->toString()).append(",");
//    }
//    sb.append("]");
//    sb.append("}");
//    return sb;
//}
//
//Element::~Element() {
//
//    delete children_;
//    delete properties_;
//    delete attributes_;
//    delete eventListeners_;
//    delete invokeFunctions_;
//
//}
//
///**
// *  名称：
// *  invoke()
// *
// *  参数:
// *  string:functionName
// *  object:params
// *  返回：
// *  object:result?
// */
//NAPIValue invokeWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&env, &handleScope);
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//    Element *thisElement = static_cast<Element *>(data);
//    VDOMDocument *document = thisElement->document;
//
//    bool success = false;
//    const char *functionName;
//    JsiValue *params;
//    if (argc > 0) {
//        NAPIValue napiValue = argv[0];
//        functionName = JSUtils::getJsCString(&env, &napiValue);
//    }
//    if (argc > 1) {
//        NAPIValue napiValue = argv[1];
//        params = JSUtils::toValue(&env, &napiValue);
//    }
//
//    InvokeFunction *invokeFunction = new InvokeFunction();
//    invokeFunction->methodName_ = functionName;
//    invokeFunction->params_ = params;
//
//    thisElement->invoke(invokeFunction);
//
//    success = true;
//    NAPIValue result;
//    napi_get_boolean(env, success, &result);
//    JSUtils::closeHandleScope(&env, &handleScope);
//    return result;
//
//}
//
//
///**
// *  名称：
// *  appendChild()
// *
// *  参数:
// *  object:element
// *  返回：
// *  boolean:success?
// */
//NAPIValue appendChildWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&env, &handleScope);
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//    Element *thisElement = static_cast<Element *>(data);
//
//    info("Element::appendChildWrapper() this=%u,argc=%d", thisElement, argc);
//    bool success = false;
//    if (argc > 0) {
//        VDOMDocument *document = thisElement->document;
//        NAPIValue elementValue = argv[0];
//
//        info("Element::appendChildWrapper() this=%u, document=%u,value=%u", thisElement, document, &elementValue);
//        Element *childElement = document->findElement(&elementValue);
//
//        info("Element::appendChildWrapper() childElement=%u", childElement);
//        if (childElement != nullptr) {
//            thisElement->appendChild(childElement);
//        }
//        success = true;
//    }
//    NAPIValue result;
//    napi_get_boolean(env, success, &result);
//    JSUtils::closeHandleScope(&env, &handleScope);
//    return result;
//}
//
//
///**
// *  名称：
// *  appendChildAt()
// *
// *  参数:
// *  number:index
// *  object:element
// *  返回：
// *  boolean:success?
// */
//NAPIValue appendChildAtWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&env, &handleScope);
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//    Element *thisElement = static_cast<Element *>(data);
//
//    info("Element::appendChildWrapper() this=%u,argc=%d", thisElement, argc);
//    bool success = false;
//    if (argc > 1) {
//        VDOMDocument *document = thisElement->document;
//        NAPIValue indexValue = argv[0];
//        NAPIValue elementValue = argv[1];
//
//        double index;
//        napi_get_value_double(env, indexValue, &index);
//
//        info("Element::appendChildWrapper() this=%u, document=%u,index=%u,value=%u", thisElement, document, index, &elementValue);
//
//        Element *childElement = document->findElement(&elementValue);
//
//        info("Element::appendChildWrapper() childElement=%u", childElement);
//        if (childElement != nullptr) {
//            thisElement->appendChild(index, childElement);
//        }
//        success = true;
//    }
//    NAPIValue result;
//    napi_get_boolean(env, success, &result);
//    JSUtils::closeHandleScope(&env, &handleScope);
//    return result;
//}
//
//
///**
// *  名称：
// *  appendChild()
// *
// *  参数:
// *  object:element
// *  返回：
// *  boolean:success?
// */
//NAPIValue removeChildWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&env, &handleScope);
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//    Element *thisElement = static_cast<Element *>(data);
//
//    bool success = false;
//    if (argc > 0) {
//        VDOMDocument *document = thisElement->document;
//        NAPIValue napiValue = argv[0];
//
//        Element *childElement = document->findElement(&napiValue);
//        if (childElement != nullptr) {
//            thisElement->removeChild(childElement);
//        }
//        success = true;
//    }
//    NAPIValue result;
//    napi_get_boolean(env, success, &result);
//    JSUtils::closeHandleScope(&env, &handleScope);
//    return result;
//}
//
//
///**
// *  名称：
// *  removeChildAt()
// *
// *  参数:
// *  int:index
// *  返回：
// *  boolean:success?
// */
//NAPIValue removeChildAtWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&env, &handleScope);
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//    Element *thisElement = static_cast<Element *>(data);
//
//    bool success = false;
//    if (argc > 0) {
//        VDOMDocument *document = thisElement->document;
//        NAPIValue napiValue = argv[0];
//        double value;
//        napi_get_value_double(env, napiValue, &value);
//        thisElement->removeChildAt((int) value);
//        success = true;
//    }
//    NAPIValue result;
//    napi_get_boolean(env, success, &result);
//    JSUtils::closeHandleScope(&env, &handleScope);
//    return result;
//}
//
///**
// *  名称：
// *  setAttribute()
// *
// *  参数:
// *  string:attributeName
// *  object:attribute
// *  返回：
// *  object:result?
// */
//NAPIValue setAttributeWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&env, &handleScope);
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//    Element *thisElement = static_cast<Element *>(data);
//
//    bool success = false;
//    const char *attributeName;
//    JsiValue *attribute;
//    if (argc > 0) {
//        NAPIValue napiValue = argv[0];
//        attributeName = JSUtils::getJsCString(&env, &napiValue);
//    }
//    if (argc > 1) {
//        NAPIValue napiValue = argv[1];
//        attribute = JSUtils::toValue(&env, &napiValue);
//    }
//
//    thisElement->setAttribute(attributeName, attribute);
//
//    success = true;
//    NAPIValue result;
//    napi_get_boolean(env, success, &result);
//    JSUtils::closeHandleScope(&env, &handleScope);
//    return result;
//}
//
///**
// *  名称：
// *  getAttribute()
// *
// *  参数:
// *  string:attributeName
// *  返回：
// *  object:attribute
// */
//NAPIValue getAttributeWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&env, &handleScope);
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//    Element *thisElement = static_cast<Element *>(data);
//
//    bool success = false;
//    const char *attributeName;
//    JsiValue *attribute;
//    if (argc > 0) {
//        NAPIValue napiValue = argv[0];
//        attributeName = JSUtils::getJsCString(&env, &napiValue);
//    }
//
//    attribute = thisElement->getAttribute(attributeName);
//
//    //TODO
//    success = true;
//    NAPIValue result;
//    napi_get_boolean(env, success, &result);
//    JSUtils::closeHandleScope(&env, &handleScope);
//    return result;
//}
//
///**
// *  名称：
// *  setStyle()
// *
// *  参数:
// *  object:style
// *  返回：
// *  object:result?
// */
//NAPIValue setStyleWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&env, &handleScope);
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//    Element *thisElement = static_cast<Element *>(data);
//
//    bool success;
//    JsiValue *styleValue;
//    if (argc > 0) {
//        NAPIValue napiValue = argv[0];
//        styleValue = JSUtils::toValue(&env, &napiValue);
//    }
//
//    thisElement->setStyle(styleValue);
//
//    success = true;
//    NAPIValue result;
//    napi_get_boolean(env, success, &result);
//    JSUtils::closeHandleScope(&env, &handleScope);
//    return result;
//}
//
//
///**
// *  名称：
// *  addEventListener()
// *
// *  参数:
// *  string:eventName
// *  function:function()
// *  返回：
// *  object:result?
// */
//NAPIValue addEventListenerWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&env, &handleScope);
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//    Element *thisElement = static_cast<Element *>(data);
//    VDOMDocument *document = thisElement->document;
//
//    const char *eventName;
//    if (argc > 0) {
//        NAPIValue napiValue = argv[0];
//        eventName = JSUtils::getJsCString(&env, &napiValue);
//    }
//    if (argc > 1) {
//        NAPIValue *funcValue = &argv[1];
//        JsiFunction *hmFunction = new JsiFunction();
//        hmFunction->env_ = env;
//
//        napi_create_reference(env, *funcValue, 1, &(hmFunction->ref_));
//
//        document->saveJSFunction(funcValue, hmFunction);
//        thisElement->addEventListener(eventName, hmFunction);
//    }
//    JSUtils::closeHandleScope(&env, &handleScope);
//    return nullptr;
//}
//
///**
// *  名称：
// *  removeEventListener()
// *
// *  参数:
// *  string:eventName
// *  function:function()
// *  返回：
// *  object:result?
// */
//NAPIValue removeEventListenerWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&env, &handleScope);
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//    Element *thisElement = static_cast<Element *>(data);
//    VDOMDocument *document = thisElement->document;
//
//    const char *eventName;
//    if (argc > 0) {
//        NAPIValue napiValue = argv[0];
//        eventName = JSUtils::getJsCString(&env, &napiValue);
//    }
//    JsiFunction *function = nullptr;
//    if (argc > 1) {
//        NAPIValue *funcValue = &argv[1];
//        function = document->findJSFunction(funcValue);
//    }
//    thisElement->removeEventListener(eventName, (JsiFunction *) function);
//    JSUtils::closeHandleScope(&env, &handleScope);
//    return nullptr;
//}

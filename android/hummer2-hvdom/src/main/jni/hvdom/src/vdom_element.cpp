//
// Created by didi on 2023/11/20.
//

#include "hvdom/vdom_element.h"
#include "hvdom/vdom_document.h"


Element::Element(string name) {
    name_ = name;
    tag_ = name;
}

NAPIValue *Element::createValue(NAPIEnv *env) {
    NAPIExceptionStatus status;
    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(env, &handleScope);
    status = JSUtils::createObject(env, "Object", 0, nullptr, &elementValue_);
    elementValue_ptr_ = &elementValue_;
    if (status != NAPIExceptionOK) {
        error("Element::createValue() error. %d", status);
    }

    JSUtils::registerFunction(env, elementValue_ptr_, "invoke", invokeWrapper, this);
    JSUtils::registerFunction(env, elementValue_ptr_, "appendChild", appendChildWrapper, this);
    JSUtils::registerFunction(env, elementValue_ptr_, "appendChildAt", appendChildAtWrapper, this);
    JSUtils::registerFunction(env, elementValue_ptr_, "removeChild", removeChildWrapper, this);
    JSUtils::registerFunction(env, elementValue_ptr_, "removeChildAt", removeChildAtWrapper, this);
    JSUtils::registerFunction(env, elementValue_ptr_, "setAttribute", setAttributeWrapper, this);
    JSUtils::registerFunction(env, elementValue_ptr_, "getAttribute", getAttributeWrapper, this);
    JSUtils::registerFunction(env, elementValue_ptr_, "setStyle", setStyleWrapper, this);
    JSUtils::registerFunction(env, elementValue_ptr_, "addEventListener", addEventListenerWrapper, this);
    JSUtils::registerFunction(env, elementValue_ptr_, "removeEventListener", removeEventListenerWrapper, this);

//    JSUtils::closeHandleScope(env, &handleScope);
    return elementValue_ptr_;
}

void Element::appendChild(Element *element) {
    children_->push_back(element);
}

void Element::appendChild(int index, Element *element) {
    size_t indexToAccess = index;
    auto it = children_->begin();
    advance(it, indexToAccess);
    children_->insert(it, reinterpret_cast<Element *>(element));
}

void Element::removeChild(Element *element) {
    children_->remove(element);
}

void Element::removeChildAt(int index) {
    size_t indexToAccess = index;
    auto it = children_->begin();
    advance(it, indexToAccess);
    children_->erase(it);
}

Element *Element::getChildAt(int index) {
    size_t indexToAccess = index;
    auto it = children_->begin();
    advance(it, indexToAccess);
    return *it;
}

list<Element *> Element::getChildList() {
    return *children_;
}


void Element::setAttribute(string name, HMValue *hmValue) {
    (*attributes_)[name] = hmValue;
}

void Element::setStyle(HMValue *hmValue) {
    style_ = hmValue;
}

HMValue *Element::getAttribute(string name) {
    return (*attributes_)[name];
}

HMValue *Element::invoke(InvokeFunction *invokeFunction) {
    invokeFunctions_->push_back(invokeFunction);
    return nullptr;
}

void Element::addEventListener(string eventName, HMFunction *jsListener) {
    (*eventListeners_)[eventName] = jsListener;
}

void Element::removeEventListener(string eventName, HMFunction *jsListener) {
    if (!eventName.empty()) {
        auto it = eventListeners_->find(eventName);
        if (it != eventListeners_->end()) {
            delete it->second;
            eventListeners_->erase(it);
        }
    } else {
        for (auto it = eventListeners_->begin(); it != eventListeners_->end(); ++it) {
            if (it->second == jsListener) {
                delete it->second;
                eventListeners_->erase(it);

                break;  // Exit the loop once found and deleted
            }
        }
    }
}

string Element::toString() {
    string sb = string("Element{");
    sb.append("tag=").append(tag_).append(",name=").append(name_).append(",style=").append(style_ == nullptr ? "" : style_->toString()).append(",attributes={");

    for (auto it = attributes_->begin(); it != attributes_->end(); it++) {
        sb.append(it->first).append("=").append(it->second->toString()).append(",");
    }
    sb.append("},eventListeners={");

    for (auto it = eventListeners_->begin(); it != eventListeners_->end(); it++) {
        sb.append(it->first).append("=").append(it->second->toString()).append(",");
    }
    sb.append("},invokeFunctions=[");

    for (auto it = invokeFunctions_->begin(); it != invokeFunctions_->end(); it++) {
        sb.append((*it)->toString()).append(",");
    }
    sb.append("],children=[");

    for (auto it = children_->begin(); it != children_->end(); it++) {
        sb.append((*it)->toString()).append(",");
    }
    sb.append("]");
    sb.append("}");
    return sb;
}

Element::~Element() {

    delete children_;
    delete properties_;
    delete attributes_;
    delete eventListeners_;
    delete invokeFunctions_;

}

/**
 *  名称：
 *  invoke()
 *
 *  参数:
 *  string:functionName
 *  object:params
 *  返回：
 *  object:result?
 */
NAPIValue invokeWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env, &handleScope);
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    Element *thisElement = static_cast<Element *>(data);
    VDOMDocument *document = thisElement->document;

    bool success = false;
    const char *functionName;
    HMValue *params;
    if (argc > 0) {
        NAPIValue napiValue = argv[0];
        functionName = JSUtils::getJsCString(&env, &napiValue);
    }
    if (argc > 1) {
        NAPIValue napiValue = argv[1];
        params = JSUtils::toValue(&env, &napiValue);
    }

    InvokeFunction *invokeFunction = new InvokeFunction();
    invokeFunction->methodName_ = functionName;
    invokeFunction->params_ = params;

    thisElement->invoke(invokeFunction);

    success = true;
    NAPIValue result;
    napi_get_boolean(env, success, &result);
    JSUtils::closeHandleScope(&env, &handleScope);
    return result;

}


/**
 *  名称：
 *  appendChild()
 *
 *  参数:
 *  object:element
 *  返回：
 *  boolean:success?
 */
NAPIValue appendChildWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env, &handleScope);
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    Element *thisElement = static_cast<Element *>(data);

    info("Element::appendChildWrapper() this=%u,argc=%d", thisElement, argc);
    bool success = false;
    if (argc > 0) {
        VDOMDocument *document = thisElement->document;
        NAPIValue elementValue = argv[0];

        info("Element::appendChildWrapper() this=%u, document=%u,value=%u", thisElement, document, &elementValue);
        Element *childElement = document->findElement(&elementValue);

        info("Element::appendChildWrapper() childElement=%u", childElement);
        if (childElement != nullptr) {
            thisElement->appendChild(childElement);
        }
        success = true;
    }
    NAPIValue result;
    napi_get_boolean(env, success, &result);
    JSUtils::closeHandleScope(&env, &handleScope);
    return result;
}


/**
 *  名称：
 *  appendChildAt()
 *
 *  参数:
 *  number:index
 *  object:element
 *  返回：
 *  boolean:success?
 */
NAPIValue appendChildAtWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env, &handleScope);
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    Element *thisElement = static_cast<Element *>(data);

    info("Element::appendChildWrapper() this=%u,argc=%d", thisElement, argc);
    bool success = false;
    if (argc > 1) {
        VDOMDocument *document = thisElement->document;
        NAPIValue indexValue = argv[0];
        NAPIValue elementValue = argv[1];

        double index;
        napi_get_value_double(env, indexValue, &index);

        info("Element::appendChildWrapper() this=%u, document=%u,index=%u,value=%u", thisElement, document, index, &elementValue);

        Element *childElement = document->findElement(&elementValue);

        info("Element::appendChildWrapper() childElement=%u", childElement);
        if (childElement != nullptr) {
            thisElement->appendChild(index, childElement);
        }
        success = true;
    }
    NAPIValue result;
    napi_get_boolean(env, success, &result);
    JSUtils::closeHandleScope(&env, &handleScope);
    return result;
}


/**
 *  名称：
 *  appendChild()
 *
 *  参数:
 *  object:element
 *  返回：
 *  boolean:success?
 */
NAPIValue removeChildWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env, &handleScope);
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
    Element *thisElement = static_cast<Element *>(data);

    bool success = false;
    if (argc > 0) {
        VDOMDocument *document = thisElement->document;
        NAPIValue napiValue = argv[0];

        Element *childElement = document->findElement(&napiValue);
        if (childElement != nullptr) {
            thisElement->removeChild(childElement);
        }
        success = true;
    }
    NAPIValue result;
    napi_get_boolean(env, success, &result);
    JSUtils::closeHandleScope(&env, &handleScope);
    return result;
}


/**
 *  名称：
 *  removeChildAt()
 *
 *  参数:
 *  int:index
 *  返回：
 *  boolean:success?
 */
NAPIValue removeChildAtWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env, &handleScope);
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    Element *thisElement = static_cast<Element *>(data);

    bool success = false;
    if (argc > 0) {
        VDOMDocument *document = thisElement->document;
        NAPIValue napiValue = argv[0];
        double value;
        napi_get_value_double(env, napiValue, &value);
        thisElement->removeChildAt((int) value);
        success = true;
    }
    NAPIValue result;
    napi_get_boolean(env, success, &result);
    JSUtils::closeHandleScope(&env, &handleScope);
    return result;
}

/**
 *  名称：
 *  setAttribute()
 *
 *  参数:
 *  string:attributeName
 *  object:attribute
 *  返回：
 *  object:result?
 */
NAPIValue setAttributeWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env, &handleScope);
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    Element *thisElement = static_cast<Element *>(data);

    bool success = false;
    const char *attributeName;
    HMValue *attribute;
    if (argc > 0) {
        NAPIValue napiValue = argv[0];
        attributeName = JSUtils::getJsCString(&env, &napiValue);
    }
    if (argc > 1) {
        NAPIValue napiValue = argv[1];
        attribute = JSUtils::toValue(&env, &napiValue);
    }

    thisElement->setAttribute(attributeName, attribute);

    success = true;
    NAPIValue result;
    napi_get_boolean(env, success, &result);
    JSUtils::closeHandleScope(&env, &handleScope);
    return result;
}

/**
 *  名称：
 *  getAttribute()
 *
 *  参数:
 *  string:attributeName
 *  返回：
 *  object:attribute
 */
NAPIValue getAttributeWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env, &handleScope);
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    Element *thisElement = static_cast<Element *>(data);

    bool success = false;
    const char *attributeName;
    HMValue *attribute;
    if (argc > 0) {
        NAPIValue napiValue = argv[0];
        attributeName = JSUtils::getJsCString(&env, &napiValue);
    }

    attribute = thisElement->getAttribute(attributeName);

    //TODO
    success = true;
    NAPIValue result;
    napi_get_boolean(env, success, &result);
    JSUtils::closeHandleScope(&env, &handleScope);
    return result;
}

/**
 *  名称：
 *  setStyle()
 *
 *  参数:
 *  object:style
 *  返回：
 *  object:result?
 */
NAPIValue setStyleWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env, &handleScope);
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    Element *thisElement = static_cast<Element *>(data);

    bool success;
    HMValue *styleValue;
    if (argc > 0) {
        NAPIValue napiValue = argv[0];
        styleValue = JSUtils::toValue(&env, &napiValue);
    }

    thisElement->setStyle(styleValue);

    success = true;
    NAPIValue result;
    napi_get_boolean(env, success, &result);
    JSUtils::closeHandleScope(&env, &handleScope);
    return result;
}


/**
 *  名称：
 *  addEventListener()
 *
 *  参数:
 *  string:eventName
 *  function:function()
 *  返回：
 *  object:result?
 */
NAPIValue addEventListenerWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env, &handleScope);
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    Element *thisElement = static_cast<Element *>(data);
    VDOMDocument *document = thisElement->document;

    const char *eventName;
    if (argc > 0) {
        NAPIValue napiValue = argv[0];
        eventName = JSUtils::getJsCString(&env, &napiValue);
    }
    if (argc > 1) {
        NAPIValue *funcValue = &argv[1];
        HMFunction *hmFunction = new HMFunction();
        hmFunction->env_ = env;

        napi_create_reference(env, *funcValue, 1, &(hmFunction->ref_));

        document->saveJSFunction(funcValue, hmFunction);
        thisElement->addEventListener(eventName, hmFunction);
    }
    JSUtils::closeHandleScope(&env, &handleScope);
    return nullptr;
}

/**
 *  名称：
 *  removeEventListener()
 *
 *  参数:
 *  string:eventName
 *  function:function()
 *  返回：
 *  object:result?
 */
NAPIValue removeEventListenerWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
    NAPIHandleScope handleScope;
    JSUtils::openHandleScope(&env, &handleScope);
    //读取参数count
    size_t argc;
    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
    //读取数据
    NAPIValue argv[argc];
    void *data;
    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);

    Element *thisElement = static_cast<Element *>(data);
    VDOMDocument *document = thisElement->document;

    const char *eventName;
    if (argc > 0) {
        NAPIValue napiValue = argv[0];
        eventName = JSUtils::getJsCString(&env, &napiValue);
    }
    HMFunction *function = nullptr;
    if (argc > 1) {
        NAPIValue *funcValue = &argv[1];
        function = document->findJSFunction(funcValue);
    }
    thisElement->removeEventListener(eventName, (HMFunction *) function);
    JSUtils::closeHandleScope(&env, &handleScope);
    return nullptr;
}

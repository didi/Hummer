//
// Created by didi on 2023/11/29.
//


#include <falcon/Document.h>
#include <falcon/Element.h>
#include <falcon/Component.h>

Document::Document() {
    _objectManager = new ObjectManager();
}

Document::Document(JsiContext *jsiContext) {
    this->_jsiContext = jsiContext;
    _objectManager = new ObjectManager();
}

void Document::onCreate() {
    __Hummer__ = _jsiContext->createGlobalObject("Object", "__Hummer__");
    document = _jsiContext->createObject("Object");
    __Hummer__->setProperty("document", document);

    document->registerFunction(MethodId_createElement, "createElement", docFuncWrapper, this);
    document->registerFunction(MethodId_createComponent, "createComponent", docFuncWrapper, this);
    document->registerFunction(MethodId_render, "render", docFuncWrapper, this);
}

JsiValue *Document::createElement(size_t size, JsiValue **params) {
    if (size < 2) {
        return nullptr;
    }
    string tag = static_cast<JsiString *>(params[0])->value_;
    JsiValue *props = static_cast<JsiValue *>(params[0]);

    long objId = _objectManager->createNextId();
    Element *element = new Element(objId, _jsiContext, componentFactory);
    element->onCreate(tag, props);

    _objectManager->pushObject(objId, element);
    return nullptr;
}

JsiValue *Document::createComponent(size_t size, JsiValue **params) {
    if (size < 2) {
        return nullptr;
    }
    string tag = static_cast<JsiString *>(params[0])->value_;
    JsiValue *props = static_cast<JsiValue *>(params[0]);

    long objId = _objectManager->createNextId();
    Component *component = new Component(objId, _jsiContext, componentFactory);
    component->onCreate(tag, props);

    _objectManager->pushObject(objId, component);
    return nullptr;
}

Element *Document::convert2Element(JsiValue *jsiValue) {
    F4NObject *object = _objectManager->getObject(jsiValue);
    return static_cast<Element *>(object);
}

JsiValue *Document::render(size_t size, JsiValue **params) {
    if (size >= 1) {
        Element *element = convert2Element(params[0]);
        fnContext->render(element);
    }
    return nullptr;
}

void Document::onDestroy() {

}

Document::~Document() {

}


JsiValue *docFuncWrapper(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue **params, void *data) {
    auto *bridge = static_cast<Document *>(data);
    switch (methodId) {
        case Document::MethodId_createElement:
            return bridge->createElement(size, params);
        case Document::MethodId_createComponent:
            return bridge->createComponent(size, params);
        case Document::MethodId_render:
            return bridge->render(size, params);
    }
    return nullptr;
}



//void VDOMDocument::init(JsiContext *jsiContext) {
//    context = jsiContext;
//    registerDocument();
//}
//
//Element *VDOMDocument::createElement(string tag, map<string, JsiValue *> value) {
//    Element *element = new Element(tag);
//    element->document = this;
//    return element;
//}
//
//void VDOMDocument::registerDocument() {
//
//    NAPIExceptionStatus status;
//    NAPIValue document;
//
//    NAPIHandleScope handleScope;
//    JSUtils::openHandleScope(&context->env_, &handleScope);
//
//    status = JSUtils::createObject(&context->env_, "Object", 0, nullptr, &document);
//    if (status != NAPIExceptionOK) {
//        error("Document::createObject() error. %d", status);
//    }
//
//    JSUtils::registerFunction(&context->env_, &document, "createElement", createElementWrapper, this);
//    JSUtils::registerFunction(&context->env_, &document, "render", renderWrapper, this);
//
//    status = JSUtils::setGlobalProperty(&context->env_, "Document", &document);
//    if (status != NAPIExceptionOK) {
//        error("Document::setGlobalProperty() Document error. %d", status);
//    }
//    JSUtils::closeHandleScope(&context->env_, &handleScope);
//}
//
//void VDOMDocument::saveElement(NAPIValue *key, Element *element) {
//    double id = currentIdValue_++;
//
//    JSUtils::setNumberProperty(&context->env_, key, "id", id);
//
//    error("Document::saveElement() id=%.0f,element=%u", id, element);
//    elementIdMap_[id] = element;
//}
//
//Element *VDOMDocument::findElement(NAPIValue *key) {
//    double id = JSUtils::getNumberProperty(&context->env_, key, "id", -1);
//    error("Document::findElement() id=%.0f,key=%u", id, key);
//
//    auto it = elementIdMap_.find(id);
//    if (it != elementIdMap_.end()) {
//        return it->second;
//    }
//    return nullptr;
//}
//
//Element *VDOMDocument::removeElement(NAPIValue *key) {
//    auto it = elementMap_.find(key);
//    if (it != elementMap_.end()) {
//        elementMap_.erase(it);
//    }
//    return nullptr;
//}
//
//void VDOMDocument::saveJSFunction(NAPIValue *key, JsiFunction *jsFunction) {
//    functionMap_[key] = jsFunction;
//}
//
//JsiFunction *VDOMDocument::findJSFunction(NAPIValue *key) {
//    auto it = functionMap_.find(key);
//    if (it != functionMap_.end()) {
//        return it->second;
//    }
//    return nullptr;
//}
//
//JsiFunction *VDOMDocument::removeJSFunction(NAPIValue *key) {
//    auto it = functionMap_.find(key);
//    if (it != functionMap_.end()) {
//        functionMap_.erase(it);
//    }
//    return nullptr;
//}
//
///**
// * 渲染视图
// * @param target
// * @param element
// */
//void VDOMDocument::render(NAPIValue *target, Element *element) {
//
//
//    info("Document::render()");
//    info("Document::render() data=%s", element->toString().c_str());
//
//    vdomRender->renderRoot(element);
//}
//
//
///**
// *  名称：
// *  createElement()
// *
// *  参数:
// *  string:tag,
// *  object:params
// *  返回：
// *  object:element
// */
//NAPIValue createElementWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//    const char *tag = JSUtils::getJsCString(&env, &argv[0]);
//
//    VDOMDocument *document = static_cast<VDOMDocument *>(data);
//    void *arg = document;
//
//    JsiValue *hmValue = JSUtils::toValue(&env, &argv[1]);
//
//    info("Document::createElementWrapper() document=%u,tag=%s,params=%s", arg, tag, hmValue->toString().c_str());
//
//    map<string, JsiValue *> params;
//    Element *element = document->createElement(tag, params);
//    NAPIValue *elementValue = element->createValue(&env);
//    //保存数据
//    document->saveElement(elementValue, element);
//
//    info("Document::createElementWrapper() tag=%s,document=%u,element=%u,value=%u", tag, arg, element, elementValue);
//    return *elementValue;
//}
//
///**
// *  名称：
// *  render()
// *
// *  参数:
// *  object:element
// *  返回：
// *  boolean:success?
// */
//NAPIValue renderWrapper(NAPIEnv env, NAPICallbackInfo callbackInfo) {
//    //读取参数count
//    size_t argc;
//    napi_get_cb_info(env, callbackInfo, &argc, nullptr, nullptr, nullptr);
//    //读取数据
//    NAPIValue argv[argc];
//    void *data;
//    napi_get_cb_info(env, callbackInfo, &argc, argv, nullptr, &data);
//
//
//    VDOMDocument *document = static_cast<VDOMDocument *>(data);
//
//    NAPIValue *elementValue = &argv[0];
//    Element *element = document->findElement(elementValue);
//
//    document->render(elementValue, element);
//
//    return nullptr;
//}


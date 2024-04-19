//
// Created by didi on 2023/11/29.
//

#include <falcon/F4NDocument.h>
#include <falcon/F4NElement.h>
#include <falcon/F4NComponent.h>

F4NDocument::F4NDocument() {
    _objectManager_ = new ObjectManager();
}

F4NDocument::F4NDocument(JsiContext *jsiContext) {
    this->_jsiContext_ = jsiContext;
    _objectManager_ = new ObjectManager();
}

void F4NDocument::onCreate() {
    __Hummer__ = _jsiContext_->createGlobalObject("Object", "__Hummer__");
    _document_ = _jsiContext_->createObject("Object");
    __Hummer__->setProperty("document", _document_);

    //兼容老版本挂载点，创建一个空的即可
    JsiObjectEx *global = _jsiContext_->createGlobalObject("Object", "__GLOBAL__");
    global->release();

    _document_->registerFunction(MethodId_createElement, "createElement", docFuncWrapper, this);
    _document_->registerFunction(MethodId_createComponent, "createComponent", docFuncWrapper, this);
    _document_->registerFunction(MethodId_render, "render", docFuncWrapper, this);
}

JsiValue *F4NDocument::createElement(size_t size, JsiValue **params) {
    if (size < 2) {
        return nullptr;
    }
    string tag = static_cast<JsiString *>(params[0])->value_;
    JsiValue *props = static_cast<JsiValue *>(params[1]);

    long objId = _objectManager_->createNextId();

    F4NElement *element = new F4NElement(objId, _jsiContext_, componentFactory);
    element->context = fnContext;
    element->onCreate(tag, props);


    _objectManager_->pushObject(objId, element);

    JsiValueExt *valueExt = new JsiValueExt(element->getJsObject());
    element->getJsObject()->release();
    return valueExt;
}

JsiValue *F4NDocument::createComponent(size_t size, JsiValue **params) {
    if (size < 2) {
        return nullptr;
    }
    string tag = static_cast<JsiString *>(params[0])->value_;
    JsiValue *props = static_cast<JsiValue *>(params[1]);

    long objId = _objectManager_->createNextId();
    F4NComponent *component = new F4NComponent(objId, _jsiContext_, componentFactory);
    component->context = fnContext;
    component->onCreate(tag, props);

    component->onCreateNativeComponent();

    _objectManager_->pushObject(objId, component);

    JsiValueExt *valueExt = new JsiValueExt(component->getJsObject());
    component->getJsObject()->release();
    return valueExt;
}

F4NElement *F4NDocument::convert2Element(JsiValue *jsiValue) {
    if (jsiValue != nullptr && jsiValue->getType() == TYPE_OBJECT) {
        JsiValue *finalize = ((JsiObject *) jsiValue)->getValue("__finalize__");
        if (finalize->getType() == TYPE_EXT) {
            JsiValueExt *valueExt = (JsiValueExt *) finalize;
            F4NElement *element = static_cast<F4NElement *>(valueExt->data);
            return element;
        }
    }
    return nullptr;
}

JsiValue *F4NDocument::render(size_t size, JsiValue **params) {
    if (size >= 1) {
        F4NElement *element = convert2Element(params[0]);
        fnContext->render(element);
    }
    return nullptr;
}

void F4NDocument::onDestroy() {

}

F4NDocument::~F4NDocument() {

}


JsiValue *docFuncWrapper(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue **params, void *data) {
    auto *bridge = static_cast<F4NDocument *>(data);
    switch (methodId) {
        case F4NDocument::MethodId_createElement:
            return bridge->createElement(size, params);
        case F4NDocument::MethodId_createComponent:
            return bridge->createComponent(size, params);
        case F4NDocument::MethodId_render:
            return bridge->render(size, params);
    }
    return nullptr;
}



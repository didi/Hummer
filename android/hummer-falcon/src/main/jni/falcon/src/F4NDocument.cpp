//
// Created by didi on 2023/11/29.
//

#include <falcon/F4NDocument.h>
#include <falcon/F4NElement.h>
#include <falcon/F4NComponent.h>

F4NDocument::F4NDocument() {
    this->_objectManager_ = new ObjectManager();
}

F4NDocument::F4NDocument(JsiContext *jsiContext) {
    this->_jsiContext_ = jsiContext;
    this->_objectManager_ = new ObjectManager();
}

void F4NDocument::onCreate() {

    //loadScript(),loadScriptWithUrl() 全局挂载方法
    _global_ = _jsiContext_->getGlobalObject();
    _global_->registerFunction(MethodId_loadScript, "loadScript", docFuncWrapper, this);
    _global_->registerFunction(MethodId_loadScriptWithUrl, "loadScriptWithUrl", docFuncWrapper, this);

    //__GLOBAL__ (兼容老版本挂载点，创建一个空的即可)
    __global__ = _jsiContext_->createGlobalObject("Object", "__GLOBAL__");

    //__Hummer__
    __Hummer__ = _jsiContext_->createGlobalObject("Object", "__Hummer__");

    //__Hummer__.document
    _document_ = _jsiContext_->createObject("Object");
    __Hummer__->setProperty("document", _document_);


    //在 “__Hummer__.document” 挂载方法
    _document_->registerFunction(MethodId_createElement, "createElement", docFuncWrapper, this);
    _document_->registerFunction(MethodId_createComponent, "createComponent", docFuncWrapper, this);
    _document_->registerFunction(MethodId_render, "render", docFuncWrapper, this);

    enable = true;
}

JsiValue *F4NDocument::createElement(size_t size, JsiValue **params) {
    if (FALCON_LOG_ENABLE){
        debug("F4NDocument::createElement() params=%s",JsiUtils::buildArrayString(size,params).c_str());
    }
    if (size < 2) {
        return nullptr;
    }
    if (!enable) {
        warn("F4NDocument::createElement() enable=false");
        return nullptr;
    }
    string tag = static_cast<JsiString *>(params[0])->value_;
    JsiValue *props = static_cast<JsiValue *>(params[1]);

    long objId = _objectManager_->createNextId();

    F4NElement *element = new F4NElement(objId, _jsiContext_, componentFactory);
    element->context = fnContext;
    element->onCreate(tag, props);

    _objectManager_->pushObject(objId, element);

    JsiValueRef *valueExt = new JsiValueRef(element->getJsObject());
    return valueExt;
}

JsiValue *F4NDocument::createComponent(size_t size, JsiValue **params) {
    if (FALCON_LOG_ENABLE){
        debug("F4NDocument::createComponent() params=%s",JsiUtils::buildArrayString(size,params).c_str());
    }
    if (size < 2) {
        return nullptr;
    }
    if (!enable) {
        warn("F4NDocument::createComponent() enable=false");
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

    JsiValueRef *valueExt = new JsiValueRef(component->getJsObject());
    return valueExt;
}

F4NElement *F4NDocument::convert2Element(JsiValue *jsiValue) {
    if (jsiValue != nullptr && jsiValue->getType() == TYPE_OBJECT) {
        JsiValue *finalize = ((JsiObject *) jsiValue)->getValue("__finalize__");
        if (finalize->getType() == TYPE_VALUE_REF) {
            JsiValueRef *valueExt = (JsiValueRef *) finalize;
            F4NElement *element = static_cast<F4NElement *>(valueExt->data);
            return element;
        }
    }
    return nullptr;
}

JsiValue *F4NDocument::render(size_t size, JsiValue **params) {
    if (!enable) {
        warn("F4NDocument::render() enable=false");
        return nullptr;
    }
    if (size >= 1) {
        F4NElement *element = convert2Element(params[0]);
        fnContext->render(element);
    }
    return nullptr;
}


JsiValue *F4NDocument::loadScript(size_t size, JsiValue **params) {
    if (size > 0) {
        JsiValue *jsiValue = (JsiValue *) params[0];
        if (jsiValue != nullptr && jsiValue->getType() == TYPE_STRING) {
            JsiString *script = (JsiString *) jsiValue;
            loadScript(script->value_);
        }
    }
    return nullptr;
}

JsiValue *F4NDocument::loadScript(string script) {
    fnContext->loadScript(script, "unknown");
    return nullptr;
}

JsiValue *F4NDocument::loadScriptWithUrl(size_t size, JsiValue **params) {
    if (size >= 2) {
        JsiValue *jsiValue = (JsiValue *) params[0];
        JsiFunction *callback = (JsiFunction *) params[1];
        if (jsiValue != nullptr && jsiValue->getType() == TYPE_STRING) {
            JsiString *script = (JsiString *) jsiValue;
            loadScriptWithUrl(script->value_, callback);
        }
    }
    return nullptr;
}


JsiValue *F4NDocument::loadScriptWithUrl(string url, JsiFunction *jsiFunction) {
    componentFactory->loadScriptWithUrl(url, new F4NFunction(fnContext, jsiFunction));
    return nullptr;
}


void F4NDocument::onDestroy() {
    enable = false;

    _document_->release();
    _global_->release();
    __Hummer__->release();
    __global__->release();
    _document_->release();
    _objectManager_->release();
}

F4NDocument::~F4NDocument() {
    delete _document_;
    delete _global_;
    delete __Hummer__;
    delete __global__;
    delete _objectManager_;
}

JsiValue *docFuncWrapper(JsiObjectRef *value, long methodId, const char *methodName, size_t size, JsiValue **params, void *data) {
    auto *bridge = static_cast<F4NDocument *>(data);
    switch (methodId) {
        case F4NDocument::MethodId_createElement:
            return bridge->createElement(size, params);
        case F4NDocument::MethodId_createComponent:
            return bridge->createComponent(size, params);
        case F4NDocument::MethodId_render:
            return bridge->render(size, params);
        case F4NDocument::MethodId_loadScript:
            return bridge->loadScript(size, params);
        case F4NDocument::MethodId_loadScriptWithUrl:
            return bridge->loadScriptWithUrl(size, params);
    }
    return nullptr;
}



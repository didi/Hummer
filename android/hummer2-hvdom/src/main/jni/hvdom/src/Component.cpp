//
// Created by didi on 2024/3/5.
//


#include "falcon/Component.h"

Component::Component() : F4NObject() {

}

Component::Component(long objId, JsiContext *context, ComponentFactory *componentFactory) : F4NObject(context) {
    this->odjId = objId;
    this->componentFactory = componentFactory;
    jsiComponent = new JsiComponent("", odjId);

    JsiObjectEx *id = jsiContext->createJsNumber(odjId);
    object->setProperty("__objId__", id);

    //需要主动释放引用，释放引用才能触发回收资源
    id->release();
}

void Component::onCreate(string tag, JsiValue *props) {
    F4NObject::onCreate(tag, props);
    jsiComponent->name_ = tag;

    object->registerFunction(MethodId_setEventTarget, "setEventTarget", componentFuncWrapper, this);
    object->registerFunction(MethodId_invoke, "invoke", componentFuncWrapper, this);
}

JsiValue *Component::setEventTarget(size_t size, JsiValue *params[]) {
    if (size > 0) {
        JsiValue *jsiValue = params[0];
        if (jsiValue->getType() == ValueType::TYPE_NAPIFunction) {
            JsiFunction *jsiFunction = static_cast<JsiFunction *>(jsiValue);
//            JsiFunction *jsiFunction
        }
    }
    return nullptr;
}

JsiValue *Component::invoke(size_t size, JsiValue *params[]) {

    if (size > 0) {
        JsiValue *method = params[0];
        string methodName;
        if (method->getType() == ValueType::TYPE_STRING) {
            JsiString *text = dynamic_cast<JsiString *>(method);
            methodName = text->value_;
        }
        size_t pramsSize = size - 1;
        JsiValue **newParams;
        if (pramsSize > 0) {
            newParams = new JsiValue *[pramsSize];
        }
        copy(params, params + pramsSize, newParams);
        componentFactory->invoke(FACTORY_TYPE_INVOKE, odjId, METHOD_TYPE_CALL, tag,
                                 methodName, pramsSize, newParams);
    }

}


void Component::onDestroy() {
    F4NObject::onDestroy();
}

void Component::onJsiFinalize(void *finalizeData, void *finalizeHint) {
    F4NObject::onJsiFinalize(finalizeData, finalizeHint);
}

void *Component::getFinalizeHint() {
    return F4NObject::getFinalizeHint();
}

void Component::release() {
    F4NObject::release();
}

Component::~Component() {
    componentFactory = nullptr;
    delete jsiComponent;
}


JsiValue *componentFuncWrapper(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue *params[], void *data) {
    auto *bridge = static_cast<Component *>(data);

    switch (methodId) {
        case Component::MethodId_setEventTarget:
            return bridge->setEventTarget(size, params);
        case Component::MethodId_invoke:
            return bridge->invoke(size, params);
    }
    return nullptr;
}

//
// Created by didi on 2024/3/5.
//


#include "falcon/F4NComponent.h"
#include "falcon/F4NUtil.h"
#include "falcon/F4NContext.h"


F4NComponent::F4NComponent(long objId, JsiContext *context, F4NRenderInvoker *renderInvoker) : F4NObject(context) {
    this->odjId = objId;
    this->renderInvoker = renderInvoker;

    JsiObjectEx *id = jsiContext->createJsNumber(odjId);
    object->setProperty("__objId__", id);

    //需要主动释放引用，释放引用才能触发回收资源
    id->release();
}

void F4NComponent::onCreate(string tag, JsiValue *props) {
    F4NObject::onCreate(tag, props);
    if (props != nullptr && props->getType() == TYPE_OBJECT) {
        JsiObject *jsiObject = (JsiObject *) props;
        JsiValue *viewType = jsiObject->getValue("viewType");
        if (viewType != nullptr && viewType->getType() == TYPE_BOOLEAN) {
            main = ((JsiBoolean *) viewType)->value_;
        }
    }

    if (tag == "Hummer") {
        main = false;
    }
    if (tag == "Memory") {
        main = false;
    }
    if (tag == "Storage") {
        main = false;
    }
    if (tag == "Request") {
        main = false;
    }
    if (tag == "WebSocket") {
        main = false;
    }

    object->registerFunction(MethodId_setEventTarget, "setEventTarget", componentFuncWrapper, this);
    object->registerFunction(MethodId_addEventListener, "addEventListener", componentFuncWrapper, this);
    object->registerFunction(MethodId_removeEventListener, "removeEventListener", componentFuncWrapper, this);
    object->registerFunction(MethodId_invoke, "invoke", componentFuncWrapper, this);
}

void F4NComponent::onCreateNativeComponent() {
    string methodName = "<init>";
    JsiValue **newParams = nullptr;
    renderInvoker->invoke(FACTORY_TYPE_INVOKE, odjId, METHOD_TYPE_NEW, tag,
                          methodName, 0, newParams);

}

JsiValue *F4NComponent::setEventTarget(size_t size, JsiValue *params[]) {
    if (size > 0) {
        JsiValue *jsiValue = params[0];
        if (jsiValue->getType() == ValueType::TYPE_NAPIFunction) {
            JsiFunction *jsiFunction = static_cast<JsiFunction *>(jsiValue);
            setEventTarget(jsiFunction);
        }
    }
    return nullptr;
}

JsiValue *F4NComponent::setEventTarget(JsiFunction *jsiFunction) {
    F4NFunction *f4NFunction = new F4NFunction(context, jsiFunction, false);
    this->eventTarget = new F4NEventTarget(f4NFunction);
    this->renderInvoker->setEventTarget(this, eventTarget);
    return nullptr;
}


JsiValue *F4NComponent::addEventListener(size_t size, JsiValue **params) {
    if (size >= 1) {
        return renderInvoker->invoke(FACTORY_TYPE_INVOKE,
                                     odjId,
                                     METHOD_TYPE_CALL,
                                     tag,
                                     "addEventListener",
                                     size,
                                     params);
    }
    return nullptr;
}

void F4NComponent::addEventListener(string event) {
}

JsiValue *F4NComponent::removeEventListener(size_t size, JsiValue **params) {
    if (size >= 1) {
        return renderInvoker->invoke(FACTORY_TYPE_INVOKE,
                                     odjId,
                                     METHOD_TYPE_CALL,
                                     tag,
                                     "removeEventListener",
                                     size,
                                     params);
    }
    return nullptr;
}

void F4NComponent::removeEventListener(string event) {

}

JsiValue *F4NComponent::invoke(size_t size, JsiValue *params[]) {
    if (size > 0) {
        string methodName = F4NUtil::optString(params[0]);
        if (!methodName.empty()) {
            size_t newSize = size - 1;
            JsiValue **newParams = nullptr;
            if (newSize > 0) {
                newParams = new JsiValue *[newSize];
                for (int i = 0; i < newSize; i++) {
                    newParams[i] = params[i + 1];
                }
            }
            JsiValue *result = invoke(methodName, newSize, newParams);
//            delete newParams;
            return result;
        } else {
            warn("Component::invoke() methodName is null or not string.");
        }
    }
    return nullptr;
}

JsiValue *F4NComponent::invoke(F4NFunctionCall *call) {
    context->buildElementParams(call->size, call->params);

    JsiValue *result = renderInvoker->invoke(FACTORY_TYPE_INVOKE,
                                             odjId,
                                             METHOD_TYPE_CALL,
                                             tag,
                                             call->methodName,
                                             call->size,
                                             call->params);
    delete call;
    return result;
}

JsiValue *F4NComponent::invoke(string methodName, size_t size, JsiValue **params) {

    for (int i = 0; i < size; i++) {
        JsiValue *value = params[i];
        if (value != nullptr && value->getType() == TYPE_NAPIFunction) {
            params[i] = new F4NFunction(context, (JsiFunction *) params[i]);
        }
    }

    if (main) {
        context->applyElementRender(size, params);
        F4NFunctionCall *functionCall = new F4NFunctionCall(nullptr, MethodId_invoke, methodName, size, params);
        context->submitUITask([&, functionCall]() {
            invoke(functionCall);
        });
    } else {
        JsiValue *result = renderInvoker->invoke(FACTORY_TYPE_INVOKE,
                                                 odjId,
                                                 METHOD_TYPE_CALL,
                                                 tag,
                                                 methodName,
                                                 size,
                                                 params);
        return result;
    }
    return nullptr;
}


void F4NComponent::onDestroy() {
    F4NObject::onDestroy();
}

void F4NComponent::onJsiFinalize(void *finalizeData, void *finalizeHint) {
    info("Component::onJsiFinalize id=%ld,tag=%s,props=%s", odjId, tag.c_str(), props->toString().c_str());
    F4NObject::onJsiFinalize(finalizeData, finalizeHint);
//    delete this;
}

void *F4NComponent::getFinalizeHint() {
    return F4NObject::getFinalizeHint();
}

void F4NComponent::release() {
    F4NObject::release();
}

F4NComponent::~F4NComponent() {
    renderInvoker = nullptr;

    delete eventTarget;
}


JsiValue *componentFuncWrapper(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue *params[], void *data) {
    auto *bridge = static_cast<F4NComponent *>(data);
    switch (methodId) {
        case F4NComponent::MethodId_setEventTarget:
            return bridge->setEventTarget(size, params);
        case F4NComponent::MethodId_addEventListener:
            return bridge->addEventListener(size, params);
        case F4NComponent::MethodId_removeEventListener:
            return bridge->removeEventListener(size, params);
        case F4NComponent::MethodId_invoke:
            return bridge->invoke(size, params);
    }
    return nullptr;
}

//
// Created by didi on 2023/12/14.
//
#include "hvdom/vdom_native_bridge.h"
#include "hvdom/vdom_utils.h"

VDOMNativeBridge::VDOMNativeBridge() {

}

void VDOMNativeBridge::init(JsiContext *jsiContext, ComponentFactory *componentFactory) {
    jsiContext_ = jsiContext;
    componentFactory_ = componentFactory;

    JsiObject bridge = jsiContext->createGlobalObject("Object", "bridge");
    bridge.registerFunction(MethodId_newInstance, "newInstance", funcWrapper, this);
    bridge.registerFunction(MethodId_releaseInstance, "releaseInstance", funcWrapper, this);
    bridge.registerFunction(MethodId_callStaticMethod, "callStaticMethod", funcWrapper, this);
    bridge.registerFunction(MethodId_callMethod, "callMethod", funcWrapper, this);
}

HMValue *VDOMNativeBridge::newInstance(JsiObject *value, long methodId, const char *methodName, size_t size, HMValue *params[]) {
//    HMValue *result = componentFactory_->newInstance(BridgeClsId, BridgeMethod_newInstance, size, params);
//    return result;
    return nullptr;
}

HMValue *VDOMNativeBridge::releaseInstance(JsiObject *value, long methodId, const char *methodName, size_t size, HMValue *params[]) {
//    HMValue *result = componentFactory_->releaseInstance(BridgeClsId, BridgeMethod_callStaticMethod, size, params);
//    return result;
    return nullptr;
}

HMValue *VDOMNativeBridge::callStaticMethod(JsiObject *value, long methodId, const char *methodName, size_t size, HMValue *params[]) {
//    info("VDOMNativeBridge::callStaticMethod() methodId=%u,methodName=%s,size=%d", methodId, methodName, size);
//
//    info("VDOMNativeBridge::callStaticMethod() %s",params[0]->toString().c_str());
//    info("VDOMNativeBridge::callStaticMethod() %s",params[1]->toString().c_str());

    HMValue *result = componentFactory_->callStaticMethod(BridgeClsId, BridgeMethod_callStaticMethod, size, params);
//    info("VDOMNativeBridge::callStaticMethod()");
    return result;
//    return nullptr;
}

HMValue *VDOMNativeBridge::callMethod(JsiObject *value, long methodId, const char *methodName, size_t size, HMValue **params) {
//    HMValue *result = componentFactory_->callMethod(BridgeClsId, BridgeMethod_callStaticMethod, size, params);
//    return result;
    return nullptr;
}


VDOMNativeBridge::~VDOMNativeBridge() {

}


HMValue *funcWrapper(JsiObject *value, long methodId, const char *methodName, size_t size, HMValue *params[], void *data) {
    VDOMNativeBridge *bridge = static_cast<VDOMNativeBridge *>(data);

    switch (methodId) {
        case MethodId_newInstance:
            return bridge->newInstance(value, methodId, methodName, size, params);
        case MethodId_releaseInstance:
            return bridge->releaseInstance(value, methodId, methodName, size, params);
        case MethodId_callStaticMethod:
            return bridge->callStaticMethod(value, methodId, methodName, size, params);
        case MethodId_callMethod:
            return bridge->callMethod(value, methodId, methodName, size, params);
    }
    return nullptr;
}

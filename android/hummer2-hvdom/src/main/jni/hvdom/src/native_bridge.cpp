////
//// Created by didi on 2023/12/14.
////
//#include "falcon/native_bridge.h"
//#include "falcon/utils.h"
//
//VDOMNativeBridge::VDOMNativeBridge() {
//
//}
//
//void VDOMNativeBridge::init(JsiContext *jsiContext, ComponentFactory *componentFactory) {
//    jsiContext_ = jsiContext;
//    componentFactory_ = componentFactory;
//
//    JsiObjectEx* bridge = jsiContext->createGlobalObject("Object", "bridge");
//    bridge->registerFunction(MethodId_newInstance, "newInstance", funcWrapper, this);
//    bridge->registerFunction(MethodId_releaseInstance, "releaseInstance", funcWrapper, this);
//    bridge->registerFunction(MethodId_callStaticMethod, "callStaticMethod", funcWrapper, this);
//    bridge->registerFunction(MethodId_callMethod, "callMethod", funcWrapper, this);
//}
//
//JsiValue *VDOMNativeBridge::newInstance(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue *params[]) {
////    HMValue *result = componentFactory_->newInstance(BridgeClsId, BridgeMethod_newInstance, size, params);
////    return result;
//    return nullptr;
//}
//
//JsiValue *VDOMNativeBridge::releaseInstance(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue *params[]) {
////    HMValue *result = componentFactory_->releaseInstance(BridgeClsId, BridgeMethod_callStaticMethod, size, params);
////    return result;
//    return nullptr;
//}
//
//JsiValue *VDOMNativeBridge::callStaticMethod(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue *params[]) {
////    info("VDOMNativeBridge::callStaticMethod() methodId=%u,methodName=%s,size=%d", methodId, methodName, size);
////
////    info("VDOMNativeBridge::callStaticMethod() %s",params[0]->toString().c_str());
////    info("VDOMNativeBridge::callStaticMethod() %s",params[1]->toString().c_str());
//
//    JsiValue *result = componentFactory_->callStaticMethod(BridgeClsId, BridgeMethod_callStaticMethod, size, params);
////    info("VDOMNativeBridge::callStaticMethod()");
//    return result;
////    return nullptr;
//}
//
//JsiValue *VDOMNativeBridge::callMethod(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue **params) {
////    HMValue *result = componentFactory_->callMethod(BridgeClsId, BridgeMethod_callStaticMethod, size, params);
////    return result;
//    return nullptr;
//}
//
//
//VDOMNativeBridge::~VDOMNativeBridge() {
//
//}
//
//
//JsiValue *funcWrapper(JsiObjectEx *value, long methodId, const char *methodName, size_t size, JsiValue *params[], void *data) {
//    VDOMNativeBridge *bridge = static_cast<VDOMNativeBridge *>(data);
//
//    switch (methodId) {
//        case MethodId_newInstance:
//            return bridge->newInstance(value, methodId, methodName, size, params);
//        case MethodId_releaseInstance:
//            return bridge->releaseInstance(value, methodId, methodName, size, params);
//        case MethodId_callStaticMethod:
//            return bridge->callStaticMethod(value, methodId, methodName, size, params);
//        case MethodId_callMethod:
//            return bridge->callMethod(value, methodId, methodName, size, params);
//    }
//    return nullptr;
//}

//
// Created by didi on 2023/12/3.
//


#include "HummerComponentFactory.h"
#include "Logger.h"
#include "HummerBridge.h"
#include "FalconEngine.h"
#include "HummerTest.h"



static jmethodID J_MethodID_invoke;

static jint TYPE = 1;


static jclass J_HMValue;
static jfieldID J_HMValue_identify;


static MainThreadHandler *mainThreadHandler;

HummerComponentFactory::HummerComponentFactory() {


}

void HummerComponentFactory::init(JNIEnv *env) {

    mainThreadHandler = new MainThreadHandler();
    mainThreadHandler->init();

    jclass J_FalconContext = env->FindClass("com/didi/hummer2/FalconContext");

    J_MethodID_invoke = env->GetMethodID(J_FalconContext, "invoke", "(JJJLjava/lang/String;Ljava/lang/String;I[Lcom/didi/hummer2/bridge/JsiValue;)Ljava/lang/Object;");

    J_HMValue = env->FindClass("com/didi/hummer2/bridge/JsiValue");

    J_HMValue_identify = env->GetFieldID(J_HMValue, "identify", "J");

}



JsiValue *HummerComponentFactory::invoke(long type, long objId, long methodType, string componentName, string methodName, size_t argc, JsiValue **argv) {
    LOGI("HummerComponentFactory::invoke() methodType=%u,objId=%u,prams=%s", methodType, objId, argv[0]->toString().c_str());
    JNIEnv *jniEnv = JNI_GetEnv();
    jobject obj = (jobject) contextId;

    jobjectArray jvArray = nullptr;
    if (argc > 0) {
        jvArray = jniEnv->NewObjectArray(argc, J_HMValue, nullptr);
        for (int i = 0; i < argc; i++) {
            jobject value = value2JObject(jniEnv, argv[i]);
            jniEnv->SetObjectArrayElement(jvArray, i, value);
            jniEnv->DeleteLocalRef(value);
        }
    }
    jstring componentNameJString;
    jstring methodNameJString;

    jobject result = jniEnv->CallObjectMethod(obj,
                                              J_MethodID_invoke,
                                              (jlong) type,
                                              (jlong) objId,
                                              (jlong) methodType,
                                              componentNameJString,
                                              methodNameJString,
                                              (jint) argc, jvArray);

    return nullptr;
}

HummerComponentFactory::~HummerComponentFactory() {

}


//
//JsiValue *HummerComponentFactory::newInstance(long clsId, long objId, size_t argc, JsiValue *prams[]) {
//    LOGI("HummerComponentFactory::newInstance() clsId=%u,objId=%u,prams=%s", clsId, objId, prams[0]->toString().c_str());
//    JNIEnv *jniEnv = JNI_GetEnv();
//    jobject obj = (jobject) contextId;
//
//    jobjectArray jvArray = nullptr;
//    if (argc > 0) {
//        jvArray = jniEnv->NewObjectArray(argc, jniEnv->FindClass("java/lang/Object"), nullptr);
//        for (int i = 0; i < argc; i++) {
//            jobject value = value2JObject(jniEnv, prams[i]);
//            jniEnv->SetObjectArrayElement(jvArray, i, value);
//            jniEnv->DeleteLocalRef(value);
//        }
//    }
//
//    jobject result = jniEnv->CallObjectMethod(obj, J_newInstance, TYPE, (jlong) clsId, (jlong) objId, jvArray);
//
////    if (jniEnv->ExceptionCheck()) {
////        error("Exception occurred during CallObjectMethod");
////        jniEnv->ExceptionDescribe();
////        jniEnv->ExceptionClear();
////        return;
////    }
////    jobject desiredObject = jniEnv->IsInstanceOf(result, J_HMValue) ? result : nullptr;
//    jobject desiredObject = result;
//    if (desiredObject != nullptr) {
//        jlong identify = jniEnv->GetLongField(desiredObject, J_HMValue_identify);
//        jniEnv->DeleteLocalRef(result);
//        JsiValue *data = reinterpret_cast< JsiValue *>(identify);
//        return data;
//    }
//    return nullptr;
//}
//
//JsiValue *HummerComponentFactory::releaseInstance(long clsId, long objId, size_t argc, JsiValue *prams[]) {
//    LOGI("HummerComponentFactory::releaseInstance() clsId=%u,objId=%u,prams=%s", clsId, objId, "");
//    JNIEnv *jniEnv = JNI_GetEnv();
//    jobject obj = (jobject) contextId;
//
//    jobjectArray jvArray = nullptr;
//    if (argc > 0) {
//        jvArray = jniEnv->NewObjectArray(argc, jniEnv->FindClass("java/lang/Object"), nullptr);
//        for (int i = 0; i < argc; i++) {
//            jobject value = value2JObject(jniEnv, prams[i]);
//            jniEnv->SetObjectArrayElement(jvArray, i, value);
//            jniEnv->DeleteLocalRef(value);
//        }
//    }
//
//    jobject result = jniEnv->CallObjectMethod(obj, J_releaseInstance, TYPE, (jlong) clsId, (jlong) objId, jvArray);
//
////    jobject desiredObject = jniEnv->IsInstanceOf(result, J_HMValue) ? result : nullptr;
//    jobject desiredObject = result;
//    if (desiredObject != nullptr) {
//        jlong identify = jniEnv->GetLongField(desiredObject, J_HMValue_identify);
//        jniEnv->DeleteLocalRef(result);
//        JsiValue *data = reinterpret_cast< JsiValue *>(identify);
//        return data;
//    }
//    return nullptr;
//}
//
//JsiValue *HummerComponentFactory::callStaticMethod(long clsId, long methodId, size_t argc, JsiValue *prams[]) {
////    LOGI("HummerComponentFactory::callStaticMethod() clsId=%u,methodId=%u,prams=%s", clsId, methodId, prams[0]->toString().c_str());
//
//    JNIEnv *jniEnv = JNI_GetEnv();
//
//    jobject obj = (jobject) contextId;
//
//    jobjectArray jvArray = nullptr;
//    jvArray = jniEnv->NewObjectArray(argc, jniEnv->FindClass("java/lang/Object"), nullptr);
//    if (argc > 0) {
//        for (int i = 0; i < argc; i++) {
//            jobject value = value2JObject(jniEnv, prams[i]);
//            jniEnv->SetObjectArrayElement(jvArray, i, value);
//            jniEnv->DeleteLocalRef(value);
//        }
//    }
//
//    HummerTest::toCreateJavaNumber();
////    HummerTest::testNumber1();
////    HummerTest::testNumber2();
////    HummerTest::testString1();
////    HummerTest::testString2();
////    HummerTest::testObject1();
////    HummerTest::testObject2();
//
////    LOGI("HummerComponentFactory::callStaticMethod() clsId=%u,methodId=%u,prams=%s", clsId, methodId,"*");
//    jobject result = jniEnv->CallObjectMethod(obj, J_callStaticMethod, TYPE, (jlong) clsId, (jlong) methodId, jvArray);
//
////    LOGI("HummerComponentFactory::callStaticMethod() clsId=%u,methodId=%u,prams=%s", clsId, methodId,"**");
//
////    LOGI("HummerComponentFactory::callStaticMethod() result=%u", result);
//
////    jobject desiredObject = jniEnv->IsInstanceOf(resultRef, J_HMValue) ? resultRef : nullptr;
//    jobject desiredObject = result;
////    LOGI("HummerComponentFactory::callStaticMethod() resultRef=%u", desiredObject);
//    if (desiredObject != 0) {
//        jlong identify = jniEnv->GetLongField(desiredObject, J_HMValue_identify);
//        jniEnv->DeleteLocalRef(desiredObject);
//        JsiValue *data = reinterpret_cast< JsiValue *>(identify);
//        return data;
//    }
//    return nullptr;
//}
//
//JsiValue *HummerComponentFactory::callMethod(long clsId, long objId, long methodId, size_t argc, JsiValue *prams[]) {
//    LOGI("HummerComponentFactory::callMethod() clsId=%u,objId=%u,methodId=%u,prams=%s", clsId, objId, methodId, prams[0]->toString().c_str());
//
//    if (clsId == ServiceClsId) {
//
//        thread::id id = this_thread::get_id();
//        info("HummerComponentFactory::callMethod() ServiceClsId %u ::%u", ServiceClsId, id);
//        Message aMessage = Message(1, "222");
//        mainThreadHandler->sendMessage(aMessage);
//
//        return nullptr;
//    }
//    JNIEnv *jniEnv = JNI_GetEnv();
//
//    jobject obj = (jobject) contextId;
////    jobject value = value2JObject(jniEnv, prams[0]);
////    error("HummerComponentFactory::callMethod() value=%u", value);
//
//    jobjectArray jvArray = nullptr;
//    if (argc > 0) {
//        jvArray = jniEnv->NewObjectArray(argc, jniEnv->FindClass("java/lang/Object"), nullptr);
//        for (int i = 0; i < argc; i++) {
//            jobject value = value2JObject(jniEnv, prams[i]);
//            jniEnv->SetObjectArrayElement(jvArray, i, value);
//            jniEnv->DeleteLocalRef(value);
//        }
//    }
//    jobject result = jniEnv->CallObjectMethod(obj, J_callMethod, TYPE, (jlong) clsId, (jlong) objId, (jlong) methodId, jvArray);
//
////    jobject desiredObject = jniEnv->IsInstanceOf(result, J_HMValue) ? result : nullptr;
//    jobject desiredObject = result;
//    if (desiredObject != nullptr) {
//        jlong identify = jniEnv->GetLongField(desiredObject, J_HMValue_identify);
//        jniEnv->DeleteLocalRef(result);
//        JsiValue *data = reinterpret_cast< JsiValue *>(identify);
//        return data;
//    }
//    return nullptr;
//}

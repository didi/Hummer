//
// Created by didi on 2023/12/3.
//


#include "HummerInvokeFactory.h"
#include "Logger.h"
#include "HummerBridge.h"
#include "FalconEngine.h"
#include "HummerTest.h"


static jmethodID J_MethodID_invoke;

static jint TYPE = 1;


static jclass J_HMValue;
static jfieldID J_HMValue_identify;


static jclass J_Long;
static jmethodID J_Long_longValue;


static MainThreadHandler *mainThreadHandler;

HummerInvokeFactory::HummerInvokeFactory() {


}

void HummerInvokeFactory::init(JNIEnv *env) {

    mainThreadHandler = new MainThreadHandler();
    mainThreadHandler->init();

    jclass J_FalconContext = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/falcon/FalconContext"));

    J_MethodID_invoke = env->GetMethodID(J_FalconContext, "invoke", "(JJJLjava/lang/String;Ljava/lang/String;I[Lcom/didi/hummer2/bridge/JsiValue;)Ljava/lang/Object;");

    J_HMValue = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/bridge/JsiValue"));

    J_HMValue_identify = env->GetFieldID(J_HMValue, "identify", "J");

    jclass J_Long = (jclass) env->NewGlobalRef(env->FindClass("java/lang/Long"));
    J_Long_longValue = env->GetMethodID(J_Long, "longValue", "()J");

}

JsiValue *HummerInvokeFactory::invoke(long type, long objId, long methodType, string componentName, string methodName, size_t argc, JsiValue **argv) {
    LOGI("HummerComponentFactory::invoke() name=%s,methodType=%u,objId=%u,methodName=%s,prams=%s",
         componentName.c_str(),
         methodType,
         objId,
         methodName.c_str(),
         JSUtils::buildArrayString(argc, argv).c_str());

    JNIEnv *jniEnv = JNI_GetEnv();
    jobject obj = (jobject) contextId;

    jobjectArray jvArray = nullptr;
    if (argc > 0) {
        jvArray = jniEnv->NewObjectArray(argc, J_HMValue, NULL);
        for (int i = 0; i < argc; i++) {
            jobject value = value2JObject(jniEnv, argv[i]);
            jniEnv->SetObjectArrayElement(jvArray, i, value);
            jniEnv->DeleteLocalRef(value);
        }
    }
    jstring componentNameJString = jniEnv->NewStringUTF(componentName.c_str());
    jstring methodNameJString = jniEnv->NewStringUTF(methodName.c_str());

    jobject result = jniEnv->CallObjectMethod(obj,
                                              J_MethodID_invoke,
                                              (jlong) type,
                                              (jlong) objId,
                                              (jlong) methodType,
                                              componentNameJString,
                                              methodNameJString,
                                              (jint) argc, jvArray);


    jniEnv->DeleteLocalRef(componentNameJString);
    jniEnv->DeleteLocalRef(methodNameJString);
    jniEnv->DeleteLocalRef(jvArray);

    if (result != nullptr) {
        if (jniEnv->IsInstanceOf(result, J_HMValue)) {
            jlong value = jniEnv->GetLongField(result, J_HMValue_identify);
            JsiValue *jsiValue = (JsiValue *) value;

            LOGI("HummerComponentFactory::invoke() name=%s,methodType=%u,objId=%u,methodName=%s,result=%s",
                 componentName.c_str(),
                 methodType,
                 objId,
                 methodName.c_str(),
                 jsiValue->toString().c_str());
            return jsiValue;
        }

//        if (jniEnv->IsInstanceOf(result, J_Long)) {
//            jlong value = jniEnv->CallLongMethod(result, J_Long_longValue);
//            JsiValue *jsiValue = (JsiValue *) value;
//
//            LOGI("HummerComponentFactory::invoke() name=%s,methodType=%u,objId=%u,methodName=%s,result=%s",
//                 componentName.c_str(),
//                 methodType,
//                 objId,
//                 methodName.c_str(),
//                 jsiValue->toString().c_str());
//            return jsiValue;
//        }

    }

    return nullptr;
}

HummerInvokeFactory::~HummerInvokeFactory() {

}

//
// Created by didi on 2024/3/28.
//
#include <jni.h>
#include "HMEventTraceHandler.h"
#include "FalconEngine.h"
#include "HummerBridge.h"

HMEventTraceHandler::HMEventTraceHandler(F4NContext *f4NContext) {
    f4NContext_ = f4NContext;
}

void HMEventTraceHandler::onTraceEvent(string event, JsiValue *value) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jobject context = (jobject) f4NContext_->nativeContext;
    jstring eventString = jniEnv->NewStringUTF(event.c_str());
    jobject params = value2JObject(jniEnv, value);
    jniEnv->CallVoidMethod(context, J_MethodID_onTraceEvent, eventString, params);

    jniEnv->ReleaseStringUTFChars(eventString, event.c_str());
    delete value;
}

HMEventTraceHandler::~HMEventTraceHandler() {
    f4NContext_ = nullptr;
}

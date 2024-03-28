//
// Created by didi on 2024/3/28.
//

#include <jni.h>
#include "HMExceptionHandler.h"
#include "FalconEngine.h"

HMExceptionHandler::HMExceptionHandler(F4NContext *f4NContext) {
    f4NContext_ = f4NContext;
}

void HMExceptionHandler::onThrowException(string value) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jobject context = (jobject) f4NContext_->nativeContext;
    jstring params = jniEnv->NewStringUTF(value.c_str());
    jniEnv->CallVoidMethod(context, J_MethodID_onCatchJsException, params);

    jniEnv->ReleaseStringUTFChars(params, value.c_str());
}

HMExceptionHandler::~HMExceptionHandler() {
    f4NContext_ = nullptr;
}

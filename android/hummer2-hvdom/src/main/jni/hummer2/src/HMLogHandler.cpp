//
// Created by didi on 2024/3/28.
//

#include <jni.h>
#include "HMLogHandler.h"
#include "FalconEngine.h"

HMLogHandler::HMLogHandler(F4NContext *f4NContext) {
    f4NContext_ = f4NContext;
}

void HMLogHandler::log(int level, string value) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jobject context = (jobject) f4NContext_->nativeContext;
    jstring msg = jniEnv->NewStringUTF(value.c_str());
    jniEnv->CallVoidMethod(context, J_MethodID_printNativeLog, level, msg);
    jniEnv->ReleaseStringUTFChars(msg, value.c_str());
}

HMLogHandler::~HMLogHandler() {
    f4NContext_ = nullptr;
}

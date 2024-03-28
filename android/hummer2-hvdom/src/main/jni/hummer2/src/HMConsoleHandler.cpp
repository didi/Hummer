//
// Created by didi on 2024/3/28.
//

#include <jni.h>
#include "HMConsoleHandler.h"
#include "FalconEngine.h"

HMConsoleHandler::HMConsoleHandler(F4NContext *f4NContext) {
    f4NContext_ = f4NContext;
}

void HMConsoleHandler::log(int level, string value) {
    JNIEnv *jniEnv = JNI_GetEnv();
    jobject context = (jobject) f4NContext_->nativeContext;
    jstring msg = jniEnv->NewStringUTF(value.c_str());
    jniEnv->CallVoidMethod(context, J_MethodID_printJsLog, level, msg);

    jniEnv->ReleaseStringUTFChars(msg, value.c_str());
}

HMConsoleHandler::~HMConsoleHandler() {
    f4NContext_ = nullptr;
}

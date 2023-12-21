//
// Created by didi on 2023/12/14.
//

#include "HMUtils.h"
#include <MainThreadHandler.h>

static JavaVM *HMUtil_JavaVM = nullptr;

static MainThreadHandler *mainThreadHandler_;

void HMUtils::init(JavaVM *vm) {
    HMUtil_JavaVM = vm;
    mainThreadHandler_ = new MainThreadHandler();
    mainThreadHandler_->init();
}

MainThreadHandler *HMUtils::getMainThreadHandler() {
    return mainThreadHandler_;
}

bool HMUtils::isMainThread() {
    ALooper *main = ALooper_forThread();
    if (main != nullptr) {
        return true;
    }
    return false;
}

JNIEnv *HMUtils::GetJNIEnv() {
    JNIEnv *env;
    LOGI("JNI_GetEnv (AttachCurrentThread)");
    int status = (*HMUtil_JavaVM).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        status = (*HMUtil_JavaVM).AttachCurrentThread(&env, NULL);
        if (status != 0) {
            LOGE("failed to attach current thread.");
        }
    }
    return env;
}

void HMUtils::DetachJNIEnv() {
    LOGI("JNI_DetachEnv (DetachCurrentThread)");
    JNIEnv *env;
    int status = (*HMUtil_JavaVM).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        (*HMUtil_JavaVM).DetachCurrentThread();
    }
}


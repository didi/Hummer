//
// Created by XiaoFeng on 2021/6/22.
//

#include "../include/HummerJNI.h"
#include "../include/JSUtils.h"

JavaVM *HMUtil_JavaVM = NULL;

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved) {
    JNIEnv *env;
    HMUtil_JavaVM = vm;
    if (vm->GetEnv((void **) &env, JNI_VERSION_1_6) != JNI_OK) {
        return -1;
    }
    JSUtils::init(env);
    return JNI_VERSION_1_6;
}

JNIEnv *JNI_GetEnv() {
    JNIEnv *env;
    int status = (*HMUtil_JavaVM).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        status = (*HMUtil_JavaVM).AttachCurrentThread(&env, NULL);
        if (status != 0) {
            LOGE("Failed to attach");
        }
    }
    return env;
}

void JNI_DetachEnv() {
    JNIEnv *env;
    int status = (*HMUtil_JavaVM).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        (*HMUtil_JavaVM).DetachCurrentThread();
    }
}
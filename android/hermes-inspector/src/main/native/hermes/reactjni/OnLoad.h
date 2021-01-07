//
// Created by huangjy on 2018/11/14.
//

#ifndef NATIVE_JS_ANDROID_HUMMERJNI_H
#define NATIVE_JS_ANDROID_HUMMERJNI_H

#include <jni.h>
#include <string>
#include <android/log.h>

#define LOG_TAG "Hummer-Hermes-Inspector"

#define LOGI(...)  __android_log_print(ANDROID_LOG_INFO,LOG_TAG,__VA_ARGS__)
#define LOGE(...)  __android_log_print(ANDROID_LOG_ERROR,LOG_TAG,__VA_ARGS__)
#define LOGD(...)  __android_log_print(ANDROID_LOG_DEBUG,LOG_TAG,__VA_ARGS__)


extern "C" JNIEnv *JNI_GetEnv();

extern "C" void JNI_DetachEnv();

#endif //NATIVE_JS_ANDROID_HUMMERJNI_H

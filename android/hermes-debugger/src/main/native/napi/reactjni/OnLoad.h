//
// Created by XiaoFeng on 2020/12/21.
//

#ifndef NATIVE_JS_ANDROID_HUMMERJNI_H
#define NATIVE_JS_ANDROID_HUMMERJNI_H

#include <jni.h>
#include <android/log.h>

#define LOG_TAG "Hummer-Hermes-Debugger"

#define LOGI(...)  __android_log_print(ANDROID_LOG_INFO,LOG_TAG,__VA_ARGS__)
#define LOGE(...)  __android_log_print(ANDROID_LOG_ERROR,LOG_TAG,__VA_ARGS__)
#define LOGD(...)  __android_log_print(ANDROID_LOG_DEBUG,LOG_TAG,__VA_ARGS__)

#endif //NATIVE_JS_ANDROID_HUMMERJNI_H

//
// Created by huangjy on 2018/11/14.
//

#ifndef NATIVE_JS_ANDROID_HUMMERJNI_H
#define NATIVE_JS_ANDROID_HUMMERJNI_H

#include <jni.h>
#include <string>
#include <android/log.h>
#include "../JavaScriptCore/include/JavaScript.h"
#include "TypeConvertor.h"

#define NATIVE(package, rettype, method) \
extern "C" JNIEXPORT rettype JNICALL Java_com_didi_hummer_core_engine_jsc_jni_##package##_##method

#define LOG_TAG "Hummer-JSC"

#define LOGI(...)  __android_log_print(ANDROID_LOG_INFO,LOG_TAG,__VA_ARGS__)
#define LOGE(...)  __android_log_print(ANDROID_LOG_ERROR,LOG_TAG,__VA_ARGS__)
#define LOGD(...)  __android_log_print(ANDROID_LOG_DEBUG,LOG_TAG,__VA_ARGS__)


extern "C" JNIEnv *JNI_GetEnv();

extern "C" void JNI_DetachEnv();

#endif //NATIVE_JS_ANDROID_HUMMERJNI_H

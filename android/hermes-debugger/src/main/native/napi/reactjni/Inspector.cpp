//
// Created by XiaoFeng on 2021/8/5.
//

#include <jni.h>
#include <js_native_api.h>
#include "JSUtils.h"
#include "OnLoad.h"

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_hermes_inspector_Inspector_enableDebugging(JNIEnv *env, jclass clazz, jlong ctx_ptr, jstring page_title) {
    auto globalEnv = JSUtils::toJsContext(ctx_ptr);
    auto pageTitle = env->GetStringUTFChars(page_title, nullptr);

    NAPIEnableDebugger(globalEnv, pageTitle);

    env->ReleaseStringUTFChars(page_title, pageTitle);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_hermes_inspector_Inspector_disableDebugging(JNIEnv *env, jclass clazz, jlong ctx_ptr) {
    auto globalEnv = JSUtils::toJsContext(ctx_ptr);
    NAPIDisableDebugger(globalEnv);
}

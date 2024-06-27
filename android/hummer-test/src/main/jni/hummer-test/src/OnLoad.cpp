//
// Created by didi on 2023/11/28.
//

#include <Logger.h>
#include "OnLoad.h"


// 保存一个全局vm
static JavaVM *_JavaVM_ = NULL;

// Hummer2 加载入口
JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved) {
    JNIEnv *env;
    _JavaVM_ = vm;
    LOGI("JNI_OnLoad");
    if (vm->GetEnv((void **) &env, JNI_VERSION_1_6) != JNI_OK) {
        return -1;
    }

//    //HummerLogger
//    HummerLogger::init();
//    //HMUtils
//    HMUtils::init(vm);
//    //HummerInvokeFactory
//    HummerInvokeFactory::init(env);
//    //HummerBridge
//    HummerBridge::init(env);
//    //FalconEngine
//    FalconEngine::init(vm, env);
//    //FalconContext
//    FalconContext::init(vm, env);

//    HummerTest::init(vm, env);

    HummerTest::init(vm, env);

    LOGI("JNI_OnLoad OK");
    return JNI_VERSION_1_6;
}



// Hummer2 卸载
JNIEXPORT void JNI_OnUnload(JavaVM *vm, void *reserved) {
    LOGI("JNI_OnUnload");
    _JavaVM_ = NULL;
}

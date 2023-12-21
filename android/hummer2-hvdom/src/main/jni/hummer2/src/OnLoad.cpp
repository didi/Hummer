//
// Created by didi on 2023/11/28.
//

#include <Logger.h>
#include "OnLoad.h"


// 保存一个全局vm
static JavaVM *HMUtil_JavaVM = NULL;

// Hummer2 加载入口
JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved) {
    JNIEnv *env;
    HMUtil_JavaVM = vm;
    LOGI("JNI_OnLoad");
    if (vm->GetEnv((void **) &env, JNI_VERSION_1_6) != JNI_OK) {
        return -1;
    }



    //Logger
    VdomLogger::init();
    //Utils
    HMUtils::init(vm);
    //VDOM
    HummerComponentFactory::init(env);
    //HummerBridge
    HummerBridge::init(env);
    //Hummer2JNI
    Hummer2JNI::init(vm,env);

    LOGI("JNI_OnLoad OK");
    return JNI_VERSION_1_6;
}

// Hummer2 卸载
JNIEXPORT void JNI_OnUnload(JavaVM *vm, void *reserved) {
    LOGI("JNI_OnUnload");
    HMUtil_JavaVM = NULL;
}

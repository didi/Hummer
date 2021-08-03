//
// Created by XiaoFeng on 2020/12/21.
//

#include <JInspector.h>
#include <OnLoad.h>

using namespace facebook::jni;
using namespace facebook::react;

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved) {
    JNIEnv *env;
    if (vm->GetEnv((void **) &env, JNI_VERSION_1_6) != JNI_OK) {
        return -1;
    }
    Environment::initialize(vm);
    JInspector::registerNatives();
    return JNI_VERSION_1_6;
}
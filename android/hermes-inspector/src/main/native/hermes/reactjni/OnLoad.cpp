//
// Created by huangjy on 2018/11/27.
//

#include <fbjni/fbjni.h>

#include "JInspector.h"
#include "OnLoad.h"

using namespace facebook::jni;
using namespace facebook::react;

JavaVM *javaVM = NULL;

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm,void* reserved){
//    JNIEnv *env;
//    javaVM = vm;
//    if(vm->GetEnv((void**)&env,JNI_VERSION_1_6)!=JNI_OK){
//        return -1;
//    }
//    return JNI_VERSION_1_6;

    return initialize(vm, [] {
        JInspector::registerNatives();
    });
}

JNIEnv *JNI_GetEnv(){
    JNIEnv *env;
    int status = (*javaVM).GetEnv((void **)&env, JNI_VERSION_1_6);
    if(status == JNI_EDETACHED){
        status = (*javaVM).AttachCurrentThread(&env, NULL);
        if ( status != 0) {
            LOGE("Failed to attach");
        }
    }
    return env;
}

void JNI_DetachEnv(){
    JNIEnv *env;
    int status = (*javaVM).GetEnv((void **)&env, JNI_VERSION_1_6);
    if(status == JNI_EDETACHED){
        (*javaVM).DetachCurrentThread();
    }
}
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
//    LOGI("JNI_GetEnv (AttachCurrentThread)");
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

jobject HMUtils::getJavaList(JNIEnv *env, list<string> *value) {

    // 获取 List 类
    jclass arrayListClass = env->FindClass("java/util/ArrayList");
    if (arrayListClass == nullptr) {
        return nullptr;
    }

    // 获取 ArrayList 构造函数
    jmethodID arrayListConstructor = env->GetMethodID(arrayListClass, "<init>", "()V");
    if (arrayListConstructor == nullptr) {
        return nullptr;
    }

    // 创建 ArrayList 对象
    jobject javaList = env->NewObject(arrayListClass, arrayListConstructor);
    if (javaList == nullptr) {
        return nullptr;
    }

    // 获取 ArrayList 的 add 方法
    jmethodID arrayListAdd = env->GetMethodID(arrayListClass, "add", "(Ljava/lang/Object;)Z");
    if (arrayListAdd == nullptr) {
        return nullptr;
    }

    // 获取 String 类
    jclass stringClass = env->FindClass("java/lang/String");
    if (stringClass == nullptr) {
        return nullptr;
    }

    list<string> keys = *value;
    // 遍历 C++ 的 std::list<std::string>
    for (const auto &str: keys) {
        // 将 C++ 字符串转换为 Java 字符串
        jstring javaString = env->NewStringUTF(str.c_str());
        if (javaString == nullptr) {
            return nullptr;
        }
        // 将 Java 字符串添加到 ArrayList
        env->CallBooleanMethod(javaList, arrayListAdd, javaString);

        // 释放 Java 字符串
        env->DeleteLocalRef(javaString);
    }
    return javaList;
}










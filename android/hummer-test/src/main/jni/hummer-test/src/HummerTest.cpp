//
// Created by didi on 2024/6/14.
//

#include "HummerTest.h"
#include "Logger.h"
#include "JsiValueTest.h"
#include "F4NObjectTest.h"
#include "F4NComponentTest.h"
#include "F4NElementTest.h"


JavaVM *_JavaVM_ = nullptr;

JNIEnv *HummerGetEnv() {
    JNIEnv *env = nullptr;
    int status = (*_JavaVM_).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        LOGI("JNI_GetEnv (AttachCurrentThread)");
        status = (*_JavaVM_).AttachCurrentThread(&env, NULL);
        if (status != 0) {
            LOGE("failed to attach current thread.");
        }
    }
    return env;
}

void HummerDetachEnv() {
    JNIEnv *env = nullptr;
    int status = (*_JavaVM_).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        LOGI("JNI_DetachEnv (DetachCurrentThread)");
        (*_JavaVM_).DetachCurrentThread();
    }
}


extern "C"
void Java_com_didi_hummer2_test_engine_TestEngineLoader_test(JNIEnv *env, jclass clazz, jstring script) {
    const char *text = env->GetStringUTFChars(script, JNI_FALSE);
    HummerTest::test(text);
    env->ReleaseStringUTFChars(script, text);
}

extern "C"
void Java_com_didi_hummer2_test_engine_TestEngineLoader_testEvaluateJavaScript(JNIEnv *env, jclass clazz, jstring cmd, jstring script) {
    const char *cmdString = env->GetStringUTFChars(cmd, JNI_FALSE);
    const char *scriptString = env->GetStringUTFChars(script, JNI_FALSE);
    HummerTest::testEvaluateJavaScript(cmdString, scriptString);

    env->ReleaseStringUTFChars(cmd, cmdString);
    env->ReleaseStringUTFChars(script, scriptString);
}

void HummerTest::init(JavaVM *vm, JNIEnv *env) {
    LOGI("HummerTest::init()");
}

void HummerTest::test(string text) {
    LOGI("HummerTest::test() text=%s", text.c_str());

    JsiValueTest jsiValueTest;
    jsiValueTest.testJsiValueProtect();
    jsiValueTest.testJsiValueProtect2();

}

void HummerTest::testEvaluateJavaScript(const string &cmd, const string &script) {
    LOGI("HummerTest::testEvaluateJavaScript() script=%s", script.c_str());

    if (cmd == "F4NObjectTest") {
        F4NObjectTest *f4NObjectTest = new F4NObjectTest();
        f4NObjectTest->test(script);
    } else if (cmd == "F4NComponentTest") {
        F4NComponentTest *test = new F4NComponentTest();
        test->test(script);

    } else if (cmd == "F4NElementTest") {
        F4NElementTest *test = new F4NElementTest();
        test->test(script);

    }

}

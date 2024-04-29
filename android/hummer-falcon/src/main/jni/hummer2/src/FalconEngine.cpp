//
// Created by XiaoFeng on 2021/6/22.
//

#include "FalconEngine.h"
#include "HMConsoleHandler.h"
#include "HMLogHandler.h"
#include "HMExceptionHandler.h"
#include "HMEventTraceHandler.h"


JavaVM *_JavaVM_ = NULL;


JNIEnv *JNI_GetEnv() {
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


void JNI_DetachEnv() {
    JNIEnv *env = nullptr;
    int status = (*_JavaVM_).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        LOGI("JNI_DetachEnv (DetachCurrentThread)");
        (*_JavaVM_).DetachCurrentThread();
    }
}

/**
 *  全局唯一
 */
static F4NRuntime *_vdomRuntime = nullptr;

void FalconEngine_createEngine_(JNIEnv *env, jclass cls) {
    if (_vdomRuntime == nullptr) {
        LOGI("HummerVdomEngine::createEngine()");
        F4NRuntime *vdomRuntime = new F4NRuntime();
        vdomRuntime->init();
        _vdomRuntime = vdomRuntime;
    }
}

void FalconEngine_releaseEngine_(JNIEnv *env, jclass cls) {
    LOGI("HummerVdomEngine::releaseEngine()");
    if (_vdomRuntime != nullptr) {
        _vdomRuntime->release();
        delete _vdomRuntime;
    }
}

jlong FalconEngine_createVdomContext_(JNIEnv *env, jclass cls) {
    if (_vdomRuntime == nullptr) {
        LOGD("HummerVdomEngine::createVdomContext() null");
    } else {
        LOGD("HummerVdomEngine::createVdomContext() no null");
    }
    F4NContext *vdomContext = _vdomRuntime->createContext();

    uintptr_t identify = reinterpret_cast<uintptr_t>(vdomContext);
    return identify;
}

void FalconEngine_destroyVdomContext_(JNIEnv *env, jclass cls, jlong contextId) {
    LOGI("HummerVdomEngine::destroyVdomContext()");
    F4NContext *vdomContext = (F4NContext *) contextId;
    _vdomRuntime->destroyContext(vdomContext);
    env->DeleteGlobalRef((jobject) vdomContext->nativeContext);
}

jboolean FalconEngine_bindVdomContext_(JNIEnv *env, jclass cls, jlong contextId, jobject context, jobject configOption) {
    F4NContext *f4NContext = (F4NContext *) contextId;
    jobject globalContext = env->NewGlobalRef(context);
    LOGI("HummerVdomEngine::bindVdomContext() contextId=%u，context=%u,globalContext=%u", contextId, context, globalContext);

    f4NContext->nativeContext = (uintptr_t) globalContext;

    HummerInvokeFactory *componentFactory = new HummerInvokeFactory();
    componentFactory->jniEnv = env;
    componentFactory->contextId = (long) globalContext;


    F4NConfigOptions *vdomConfig = new F4NConfigOptions();
    vdomConfig->singleThread = false;

    MainThreadHandler *threadHandler = new MainThreadHandler();
    threadHandler->init();

    LOGI("HummerVdomEngine::bindVdomContext() 1");
    f4NContext->init(vdomConfig, componentFactory);
    f4NContext->setMainThreadHandler(threadHandler);

    f4NContext->setConsoleHandler(new HMConsoleHandler(f4NContext));
    f4NContext->setLogHandler(new HMLogHandler(f4NContext));
    f4NContext->setExceptionHandler(new HMExceptionHandler(f4NContext));
    f4NContext->setEventTraceHandler(new HMEventTraceHandler(f4NContext));

    LOGI("HummerVdomEngine::bindVdomContext() 2");
    LOGI("HummerVdomEngine::bindVdomContext() 3");
    f4NContext->start();
    LOGI("HummerVdomEngine::bindVdomContext() 4");
    return JNI_TRUE;
}

jobject FalconEngine_evaluateJavaScript_(JNIEnv *env, jclass cls, jlong contextId, jstring script, jstring scriptId) {
    LOGI("HummerVdomEngine::evaluateJavaScript() contextId=%u", contextId);

    F4NContext *vdomContext = (F4NContext *) contextId;

    const char *value = env->GetStringUTFChars(script, hm_false_ptr);
    const char *source = env->GetStringUTFChars(scriptId, hm_false_ptr);

    vdomContext->evaluateJavaScript(value, source);

    env->ReleaseStringUTFChars(script, value);
    env->ReleaseStringUTFChars(scriptId, source);

    return nullptr;
}

jobject FalconEngine_evaluateBytecode_(JNIEnv *env, jclass cls, jlong contextId, jbyteArray byteArray, jstring scriptId) {
    return nullptr;
}


static JNINativeMethod _FalconEngineMethods[] = {
        {"createEngine",         "()V",                                                                               (void *) FalconEngine_createEngine_},
        {"releaseEngine",        "()V",                                                                               (void *) FalconEngine_releaseEngine_},
        {"createFalconContext",  "()J",                                                                               (void *) FalconEngine_createVdomContext_},
        {"destroyFalconContext", "(J)V",                                                                              (void *) FalconEngine_destroyVdomContext_},
        {"bindFalconContext",    "(JLcom/didi/hummer2/falcon/FalconContext;Lcom/didi/hummer2/falcon/ConfigOption;)Z", (void *) FalconEngine_bindVdomContext_},
        {"evaluateJavaScript",   "(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/Object;",                         (void *) FalconEngine_evaluateJavaScript_},
        {"evaluateBytecode",     "(J[BLjava/lang/String;)Ljava/lang/Object;",                                         (void *) FalconEngine_evaluateBytecode_},
};

static jclass J_FalconEngine;

void FalconEngine::init(JavaVM *vm, JNIEnv *env) {
    _JavaVM_ = vm;
    //HummerEngine
    J_FalconEngine = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/falcon/FalconEngine"));

    jint state = env->RegisterNatives(J_FalconEngine, _FalconEngineMethods, 7);
    if (state == JNI_OK) {
        LOGI("HummerVdomEngine::init() OK");
    }

    LOGI("Hummer2JNI::init() OK");
}

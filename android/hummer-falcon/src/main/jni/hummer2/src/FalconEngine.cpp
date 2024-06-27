//
// Created by XiaoFeng on 2021/6/22.
//

#include "FalconEngine.h"
#include "HMConsoleHandler.h"
#include "HMLogHandler.h"
#include "HMExceptionHandler.h"
#include "HMEventTraceHandler.h"
#include "HMContextListener.h"
#include "HMPageLifeCycle.h"


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


void FalconEngine_createEngine_(JNIEnv *env, jclass cls) {
    if (F4NRuntime::instance() == nullptr) {
        LOGI("FalconEngine::createEngine()");
//        F4NRuntime *runtime = new F4NRuntime();
//        runtime->init();
//        _f4NRuntime = runtime;
    }
}

void FalconEngine_releaseEngine_(JNIEnv *env, jclass cls) {
    LOGI("FalconEngine::releaseEngine()");
//    if (_f4NRuntime != nullptr) {
//        _f4NRuntime->release();
//        delete _f4NRuntime;
//    }
}

jlong FalconEngine_createContext_(JNIEnv *env, jclass cls) {
    if (F4NRuntime::instance() == nullptr) {
        LOGD("FalconEngine::createContext() null");
    } else {
        LOGD("FalconEngine::createContext() no null");
    }
    F4NContext *f4NContext = F4NRuntime::instance()->createContext();

    uintptr_t identify = reinterpret_cast<uintptr_t>(f4NContext);
    return identify;
}

void FalconEngine_destroyContext_(JNIEnv *env, jclass cls, jlong contextId) {
    LOGI("FalconEngine::destroyContext()");
    F4NContext *f4NContext = (F4NContext *) contextId;
    F4NRuntime::instance()->destroyContext(f4NContext);
//    env->DeleteGlobalRef((jobject) f4NContext->nativeContext);
}

jboolean FalconEngine_bindContext_(JNIEnv *env, jclass cls, jlong contextId, jobject context, jobject configOption) {
    F4NContext *f4NContext = (F4NContext *) contextId;
    jobject globalContext = env->NewGlobalRef(context);
    LOGI("FalconEngine::bindContext() contextId=%ld，context=%u,globalContext=%ld", contextId, context, globalContext);

    f4NContext->nativeContext = (uintptr_t) globalContext;

    HummerInvokeFactory *invokeFactory = new HummerInvokeFactory();
    invokeFactory->jniEnv = env;
    invokeFactory->contextId = (long) globalContext;

    F4NConfigOptions *configOptions = new F4NConfigOptions();
    configOptions->singleThread = false;

    MainThreadHandler *threadHandler = new MainThreadHandler();
    threadHandler->init();

    f4NContext->init(configOptions, invokeFactory);
    f4NContext->setMainThreadHandler(threadHandler);

    f4NContext->setConsoleHandler(new HMConsoleHandler(f4NContext));
    f4NContext->setLogHandler(new HMLogHandler(f4NContext));
    f4NContext->setExceptionHandler(new HMExceptionHandler(f4NContext));
    f4NContext->setEventTraceHandler(new HMEventTraceHandler(f4NContext));
    f4NContext->setContextStateListener(new HMContextListener(f4NContext));
    f4NContext->setPageLifeCycle(new HMPageLifeCycle(f4NContext));

    f4NContext->start();
    return JNI_TRUE;
}

jobject FalconEngine_evaluateJavaScript_(JNIEnv *env, jclass cls, jlong contextId, jstring script, jstring scriptId) {
    LOGI("FalconEngine::evaluateJavaScript() contextId=%u", contextId);

    F4NContext *f4NContext = (F4NContext *) contextId;

    const char *value = env->GetStringUTFChars(script, hm_false_ptr);
    const char *source = env->GetStringUTFChars(scriptId, hm_false_ptr);

    f4NContext->evaluateJavaScript(value, source);

    env->ReleaseStringUTFChars(script, value);
    env->ReleaseStringUTFChars(scriptId, source);

    return nullptr;
}

jobject FalconEngine_evaluateBytecode_(JNIEnv *env, jclass cls, jlong contextId, jbyteArray byteArray, jstring scriptId) {
    return nullptr;
}


jobject FalconEngine_dispatchEvent_(JNIEnv *env, jclass cls, jlong contextId, jstring eventName, jlongArray params) {
    F4NContext *f4NContext = (F4NContext *) contextId;
    const char *eventNameString = env->GetStringUTFChars(eventName, hm_false_ptr);
    if (params != nullptr) {
        jsize size = env->GetArrayLength(params);
        // 分配本地内存来保存数组元素
        jlong *array = env->GetLongArrayElements(params, NULL);

        JsiValue *jsiValue[size];
        for (int i = 0; i < size; i++) {
            jsiValue[i] = (JsiValue *) array[i];
        }
        //释放本地内存
        env->ReleaseLongArrayElements(params, array, 0);
        f4NContext->dispatchEvent(eventNameString, size, jsiValue);
        JsiUtils::releaseJsiValue(size, jsiValue);
    } else {
        f4NContext->dispatchEvent(eventNameString, 0, nullptr);
    }
    env->ReleaseStringUTFChars(eventName, eventNameString);
    return nullptr;
}


static JNINativeMethod _FalconEngineMethods[] = {
        {"createEngine",         "()V",                                                                               (void *) FalconEngine_createEngine_},
        {"releaseEngine",        "()V",                                                                               (void *) FalconEngine_releaseEngine_},
        {"createFalconContext",  "()J",                                                                               (void *) FalconEngine_createContext_},
        {"destroyFalconContext", "(J)V",                                                                              (void *) FalconEngine_destroyContext_},
        {"bindFalconContext",    "(JLcom/didi/hummer2/falcon/FalconContext;Lcom/didi/hummer2/falcon/ConfigOption;)Z", (void *) FalconEngine_bindContext_},
        {"evaluateJavaScript",   "(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/Object;",                         (void *) FalconEngine_evaluateJavaScript_},
        {"evaluateBytecode",     "(J[BLjava/lang/String;)Ljava/lang/Object;",                                         (void *) FalconEngine_evaluateBytecode_},
        {"dispatchEvent",        "(JLjava/lang/String;[J)Ljava/lang/Object;",                                         (void *) FalconEngine_dispatchEvent_},
};

static jclass J_FalconEngine;

void FalconEngine::init(JavaVM *vm, JNIEnv *env) {
    _JavaVM_ = vm;
    //HummerEngine
    J_FalconEngine = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/falcon/FalconEngine"));

    jint state = env->RegisterNatives(J_FalconEngine, _FalconEngineMethods, 8);
    if (state == JNI_OK) {
        LOGI("FalconEngine::init() OK");
    }

    LOGI("Hummer2JNI::init() OK");
}


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

/**
 *  全局唯一
 */
static F4NRuntime *_vdomRuntime = nullptr;

void FalconEngine_createEngine_(JNIEnv *env, jclass cls) {
    if (_vdomRuntime == nullptr) {
        LOGI("FalconEngine::createEngine()");
        F4NRuntime *vdomRuntime = new F4NRuntime();
        vdomRuntime->init();
        _vdomRuntime = vdomRuntime;
    }
}

void FalconEngine_releaseEngine_(JNIEnv *env, jclass cls) {
    LOGI("FalconEngine::releaseEngine()");
    if (_vdomRuntime != nullptr) {
        _vdomRuntime->release();
        delete _vdomRuntime;
    }
}

jlong FalconEngine_createContext_(JNIEnv *env, jclass cls) {
    if (_vdomRuntime == nullptr) {
        LOGD("FalconEngine::createContext() null");
    } else {
        LOGD("FalconEngine::createContext() no null");
    }
    F4NContext *vdomContext = _vdomRuntime->createContext();

    uintptr_t identify = reinterpret_cast<uintptr_t>(vdomContext);
    return identify;
}

void FalconEngine_destroyContext_(JNIEnv *env, jclass cls, jlong contextId) {
    LOGI("FalconEngine::destroyContext()");
    F4NContext *vdomContext = (F4NContext *) contextId;
    vdomContext->stop();
    _vdomRuntime->destroyContext(vdomContext);
    env->DeleteGlobalRef((jobject) vdomContext->nativeContext);
}

jboolean FalconEngine_bindContext_(JNIEnv *env, jclass cls, jlong contextId, jobject context, jobject configOption) {
    F4NContext *f4NContext = (F4NContext *) contextId;
    jobject globalContext = env->NewGlobalRef(context);
    LOGI("FalconEngine::bindContext() contextId=%ld，context=%u,globalContext=%ld", contextId, context, globalContext);

    f4NContext->nativeContext = (uintptr_t) globalContext;

    HummerInvokeFactory *componentFactory = new HummerInvokeFactory();
    componentFactory->jniEnv = env;
    componentFactory->contextId = (long) globalContext;

    F4NConfigOptions *vdomConfig = new F4NConfigOptions();
    vdomConfig->singleThread = false;

    MainThreadHandler *threadHandler = new MainThreadHandler();
    threadHandler->init();

    f4NContext->init(vdomConfig, componentFactory);
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


jobject FalconEngine_dispatchEvent_(JNIEnv *env, jclass cls, jlong contextId, jstring eventName, jlongArray params) {
    F4NContext *f4NContext = (F4NContext *) contextId;
    const char *eventNameString = env->GetStringUTFChars(eventName, hm_false_ptr);
    if (params != nullptr) {
        jsize size = env->GetArrayLength(params);
        // 分配本地内存来保存数组元素
        jlong *array = env->GetLongArrayElements(params, NULL);

        JsiValue **hmValue = new JsiValue *[size];
        for (int i = 0; i < size; i++) {
            hmValue[i] = (JsiValue *) array[i];
        }
        //释放本地内存
        env->ReleaseLongArrayElements(params, array, 0);
        f4NContext->dispatchEvent(eventNameString, size, hmValue);
    } else {
        f4NContext->dispatchEvent(eventNameString, 0, nullptr);
    }
    env->ReleaseStringUTFChars(eventName, eventNameString);
    return nullptr;
}


static JNINativeMethod _FalconEngineMethods[] = {
        {"createEngine",         "()V",                                                                               (void *) FalconEngine_createEngine_},
        {"releaseEngine",        "()V",                                                                               (void *) FalconEngine_releaseEngine_},
        {"createFalconContext",  "()J", (void *) FalconEngine_createContext_},
        {"destroyFalconContext", "(J)V", (void *) FalconEngine_destroyContext_},
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


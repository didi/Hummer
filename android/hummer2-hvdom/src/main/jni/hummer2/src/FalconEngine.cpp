//
// Created by XiaoFeng on 2021/6/22.
//

#include "FalconEngine.h"
#include "HMConsoleHandler.h"
#include "HMLogHandler.h"
#include "HMExceptionHandler.h"
#include "HMEventTraceHandler.h"


JavaVM *HMUtil_JavaVM = NULL;


JNIEnv *JNI_GetEnv() {
    JNIEnv *env;
    int status = (*HMUtil_JavaVM).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        LOGI("JNI_GetEnv (AttachCurrentThread)");
        status = (*HMUtil_JavaVM).AttachCurrentThread(&env, NULL);
        if (status != 0) {
            LOGE("failed to attach current thread.");
        }
    }
    return env;
}

void JNI_DetachEnv() {
    JNIEnv *env;
    int status = (*HMUtil_JavaVM).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        LOGI("JNI_DetachEnv (DetachCurrentThread)");
        (*HMUtil_JavaVM).DetachCurrentThread();
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

    HummerComponentFactory *componentFactory = new HummerComponentFactory();
    componentFactory->jniEnv = env;
    componentFactory->contextId = (long) globalContext;


    ConfigOptions *vdomConfig = new ConfigOptions();
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
        {"createEngine",         "()V",                                                                 (void *) FalconEngine_createEngine_},
        {"releaseEngine",        "()V",                                                                 (void *) FalconEngine_releaseEngine_},
        {"createFalconContext",  "()J",                                                                 (void *) FalconEngine_createVdomContext_},
        {"destroyFalconContext", "(J)V",                                                                (void *) FalconEngine_destroyVdomContext_},
        {"bindFalconContext",    "(JLcom/didi/hummer2/FalconContext;Lcom/didi/hummer2/ConfigOption;)Z", (void *) FalconEngine_bindVdomContext_},
        {"evaluateJavaScript",   "(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/Object;",           (void *) FalconEngine_evaluateJavaScript_},
        {"evaluateBytecode",     "(J[BLjava/lang/String;)Ljava/lang/Object;",                           (void *) FalconEngine_evaluateBytecode_},
};


void FalconEngine::init(JavaVM *vm, JNIEnv *env) {
    HMUtil_JavaVM = vm;

    jclass J_falcon_context = env->FindClass("com/didi/hummer2/FalconContext");

    J_FalconContext = (jclass) env->NewGlobalRef(J_falcon_context);

    J_MethodID_printNativeLog = env->GetMethodID(J_FalconContext, "printNativeLog", "(ILjava/lang/String;Ljava/lang/String;)V");
    J_MethodID_printJsLog = env->GetMethodID(J_FalconContext, "printJsLog", "(ILjava/lang/String;Ljava/lang/String;)V");
    J_MethodID_onCatchJsException = env->GetMethodID(J_FalconContext, "onCatchJsException", "(Ljava/lang/String;Ljava/lang/Exception;)V");
    J_MethodID_onTraceEvent = env->GetMethodID(J_FalconContext, "onTraceEvent", "(Ljava/lang/String;Ljava/util/Map;)V");

    //HummerEngine
    jclass _FalconEngineCls = (jclass) env->NewGlobalRef(env->FindClass("com/didi/hummer2/FalconEngine"));

    jint state = env->RegisterNatives(_FalconEngineCls, _FalconEngineMethods, 6);
    if (state == JNI_OK) {
        LOGI("HummerVdomEngine::init() OK");
    }

    LOGI("Hummer2JNI::init() OK");
}

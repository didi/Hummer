//
// Created by XiaoFeng on 2021/6/22.
//

#include "Hummer2JNI.h"


JavaVM *HMUtil_JavaVM = NULL;


JNIEnv *JNI_GetEnv() {
    JNIEnv *env;
    LOGI("JNI_GetEnv (AttachCurrentThread)");
    int status = (*HMUtil_JavaVM).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        status = (*HMUtil_JavaVM).AttachCurrentThread(&env, NULL);
        if (status != 0) {
            LOGE("failed to attach current thread.");
        }
    }
    return env;
}

void JNI_DetachEnv() {
    JNIEnv *env;
    LOGI("JNI_DetachEnv (DetachCurrentThread)");
    int status = (*HMUtil_JavaVM).GetEnv((void **) &env, JNI_VERSION_1_6);
    if (status == JNI_EDETACHED) {
        (*HMUtil_JavaVM).DetachCurrentThread();
    }
}

/**
 *  全局唯一
 */
static VDOMRuntime *_vdomRuntime = nullptr;

void HummerVdomEngine_createEngine_(JNIEnv *env, jclass cls) {
    if (_vdomRuntime == nullptr) {
        LOGI("HummerVdomEngine::createEngine()");
        VDOMRuntime *vdomRuntime = new VDOMRuntime();
        vdomRuntime->init();
        _vdomRuntime = vdomRuntime;
    }
}

void HummerVdomEngine_releaseEngine_(JNIEnv *env, jclass cls) {
    LOGI("HummerVdomEngine::releaseEngine()");
    if (_vdomRuntime != nullptr) {
        _vdomRuntime->release();
        delete _vdomRuntime;
    }
}

jlong HummerVdomEngine_createVdomContext_(JNIEnv *env, jclass cls) {
    if (_vdomRuntime == nullptr) {
        LOGD("HummerVdomEngine::createVdomContext() null");
    } else {
        LOGD("HummerVdomEngine::createVdomContext() no null");
    }
    VDOMContext *vdomContext = _vdomRuntime->createContext();

    uintptr_t identify = reinterpret_cast<uintptr_t>(vdomContext);
    return identify;
}

void HummerVdomEngine_destroyVdomContext_(JNIEnv *env, jclass cls, jlong contextId) {
    LOGI("HummerVdomEngine::destroyVdomContext()");
    VDOMContext *vdomContext = (VDOMContext *) contextId;
    _vdomRuntime->destroyContext(vdomContext);
}

jboolean HummerVdomEngine_bindVdomContext_(JNIEnv *env, jclass cls, jlong contextId, jobject context) {
    VDOMContext *vdomContext = (VDOMContext *) contextId;
    jobject globalContext = env->NewGlobalRef(context);
    LOGI("HummerVdomEngine::bindVdomContext() contextId=%u，context=%u,globalContext=%u", contextId, context, globalContext);

    vdomContext->nativeContext = (uintptr_t) globalContext;

    HummerComponentFactory *componentFactory = new HummerComponentFactory();
    componentFactory->jniEnv = env;
    componentFactory->contextId = (long) globalContext;


    VDOMConfig vdomConfig = VDOMConfig();
    vdomConfig.singleThread = false;

    MainThreadHandler *threadHandler = new MainThreadHandler();
    threadHandler->init();

    LOGI("HummerVdomEngine::bindVdomContext() 1");
    vdomContext->init(vdomConfig, componentFactory);
    vdomContext->setMainThreadHandler(threadHandler);
    LOGI("HummerVdomEngine::bindVdomContext() 2");
    LOGI("HummerVdomEngine::bindVdomContext() 3");
    vdomContext->start();
    LOGI("HummerVdomEngine::bindVdomContext() 4");
    return JNI_TRUE;
}

jobject HummerVdomEngine_evaluateJavaScript_(JNIEnv *env, jclass cls, jlong contextId, jstring script, jstring scriptId) {
    LOGI("HummerVdomEngine::evaluateJavaScript() contextId=%u", contextId);

    VDOMContext *vdomContext = (VDOMContext *) contextId;

    const char *value = env->GetStringUTFChars(script, hm_false_ptr);
    const char *source = env->GetStringUTFChars(scriptId, hm_false_ptr);

    vdomContext->evaluateJavaScript(value, source);

    env->ReleaseStringUTFChars(script, value);
    env->ReleaseStringUTFChars(scriptId, source);

    return nullptr;
}


void Hummer2JNI::init(JavaVM *vm, JNIEnv *env) {
    HMUtil_JavaVM = vm;

    static JNINativeMethod _HummerVdomEngineMethods[] = {
            {"createEngine",       "()V",                                                       (void *) HummerVdomEngine_createEngine_},
            {"releaseEngine",      "()V",                                                       (void *) HummerVdomEngine_releaseEngine_},
            {"createVdomContext",  "()J",                                                       (void *) HummerVdomEngine_createVdomContext_},
            {"destroyVdomContext", "(J)V",                                                      (void *) HummerVdomEngine_destroyVdomContext_},
            {"bindVdomContext",    "(JLcom/didi/hummer2/HummerVdomContext;)Z",                  (void *) HummerVdomEngine_bindVdomContext_},
            {"evaluateJavaScript", "(JLjava/lang/String;Ljava/lang/String;)Ljava/lang/Object;", (void *) HummerVdomEngine_evaluateJavaScript_},
    };

    //HummerVdomEngine
    jclass _HummerVdomEngineCls = (jclass) env->NewGlobalRef(
            env->FindClass("com/didi/hummer2/HummerVdomEngine"));

    jint state = env->RegisterNatives(_HummerVdomEngineCls, _HummerVdomEngineMethods, 6);
    if (state == JNI_OK) {
        LOGI("HummerVdomEngine::init() OK");
    }

    LOGI("Hummer2JNI::init() OK");
}

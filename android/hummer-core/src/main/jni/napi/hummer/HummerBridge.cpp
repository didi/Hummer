//
// Created by XiaoFeng on 2021/6/22.
//

#include <map>
#include <HummerJNI.h>
#include <JSUtils.h>

static std::map<long, jobject> HUMMER_BRIDGE_MAP;
static jmethodID HUMMER_BRIDGE_INVOKE_ID = nullptr;

static int INDEX_CLASS_NAME = 0;
static int INDEX_OBJECT_ID = 1;
static int INDEX_METHOD_NAME = 2;

static NAPIValue invoke(NAPIEnv globalEnv, NAPICallbackInfo info) {
    size_t argc;
    napi_get_cb_info(globalEnv, info, &argc, nullptr, nullptr, nullptr);
    NAPIValue argv[argc];
    napi_get_cb_info(globalEnv, info, &argc, argv, nullptr, nullptr);

    JNIEnv* env = JNI_GetEnv();

    jlongArray params = nullptr;
    if (argc > 3) {
        int methodParamsCount = (int) argc - 3;
        params = env->NewLongArray(methodParamsCount);
        jlong paramsC[methodParamsCount];
        for (int i = 3; i < argc; i++) {
            paramsC[i - 3] = JSUtils::toJsValuePtr(globalEnv, argv[i]);
        }
        env->SetLongArrayRegion(params, 0, methodParamsCount, paramsC);
    }

    int64_t objId;
    napi_get_value_int64(globalEnv, argv[INDEX_OBJECT_ID], &objId);
    jstring className = JSUtils::toJavaString(globalEnv, argv[INDEX_CLASS_NAME]);
    jstring methodName = JSUtils::toJavaString(globalEnv, argv[INDEX_METHOD_NAME]);

    long ctxId = JSUtils::toJsContextPtr(globalEnv);
    jobject bridge = HUMMER_BRIDGE_MAP[ctxId];
    if (bridge == nullptr) {
        return JSUtils::createJsUndefined(globalEnv);
    }

    jlong ret = env->CallLongMethod(
            bridge, HUMMER_BRIDGE_INVOKE_ID,
            className, objId, methodName,
            params);

    env->DeleteLocalRef(className);
    env->DeleteLocalRef(methodName);
    env->DeleteLocalRef(params);

    JNI_DetachEnv();

    NAPIValue value = JSUtils::toJsValue(globalEnv, ret);
    return value;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerBridge_initHummerBridge(JNIEnv *env, jobject thiz, jlong js_context) {
    jobject bridge = env->NewGlobalRef(thiz);
    HUMMER_BRIDGE_MAP[js_context] = bridge;
    HUMMER_BRIDGE_INVOKE_ID = env->GetMethodID(
            env->GetObjectClass(thiz),
            "invoke",
            "(Ljava/lang/String;JLjava/lang/String;[J)J");

    auto globalEnv = JSUtils::toJsContext(js_context);
    NAPIValue globalObj = JSUtils::createJsGlobal(globalEnv);

    auto funcName = "invoke";
    NAPIValue func;
    napi_create_function(globalEnv, funcName, NAPI_AUTO_LENGTH, invoke, nullptr, &func);
    napi_set_named_property(globalEnv, globalObj, funcName, func);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerBridge_releaseHummerBridge(JNIEnv *env, jobject thiz, jlong js_context) {
    env->DeleteGlobalRef(HUMMER_BRIDGE_MAP[js_context]);
    HUMMER_BRIDGE_MAP.erase(js_context);
}
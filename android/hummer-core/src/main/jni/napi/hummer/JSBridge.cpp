//
// Created by XiaoFeng on 2021/6/29.
//

#include <map>
#include <HummerJNI.h>
#include <JSUtils.h>

static std::map<int64_t, jobject> HUMMER_BRIDGE_MAP;
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

    jobjectArray params = nullptr;
    if (argc > 3) {
        int paramsCount = (int) argc - 3;
        jclass strClass = env->FindClass("java/lang/Object");
        params = env->NewObjectArray(paramsCount, strClass, nullptr);
        for (int i = 0; i < paramsCount; i++) {
            jobject p = JSUtils::JsValueToJavaObject(globalEnv, argv[i + 3]);
            env->SetObjectArrayElement(params, i, p);
        }
    }

    double objId;
    napi_get_value_double(globalEnv, argv[INDEX_OBJECT_ID], &objId);
    jstring className = JSUtils::toJavaString(globalEnv, argv[INDEX_CLASS_NAME]);
    jstring methodName = JSUtils::toJavaString(globalEnv, argv[INDEX_METHOD_NAME]);

    int64_t ctxId = JSUtils::toJsContextPtr(globalEnv);
    jobject bridge = HUMMER_BRIDGE_MAP[ctxId];
    if (bridge == nullptr) {
        return JSUtils::createJsUndefined(globalEnv);
    }

    jobject ret = env->CallObjectMethod(
            bridge, HUMMER_BRIDGE_INVOKE_ID,
            className, (int64_t) objId, methodName,
            params);

    env->DeleteLocalRef(className);
    env->DeleteLocalRef(methodName);
    env->DeleteLocalRef(params);

    JNI_DetachEnv();

    return JSUtils::JavaObjectToJsValue(globalEnv, ret);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSBridge_initBridge(JNIEnv *env, jobject thiz, jlong js_context) {
    jobject bridge = env->NewGlobalRef(thiz);
    HUMMER_BRIDGE_MAP[js_context] = bridge;
    HUMMER_BRIDGE_INVOKE_ID = env->GetMethodID(
            env->GetObjectClass(thiz),
            "invoke",
            "(Ljava/lang/String;JLjava/lang/String;[Ljava/lang/Object;)Ljava/lang/Object;");


    auto globalEnv = JSUtils::toJsContext(js_context);
    NAPIValue globalObj = JSUtils::createJsGlobal(globalEnv);

    auto funcName = "invoke";
    NAPIValue func;
    napi_create_function(globalEnv, funcName, invoke, nullptr, &func);
    napi_set_named_property(globalEnv, globalObj, funcName, func);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSBridge_releaseBridge(JNIEnv *env, jobject thiz, jlong js_context) {
    env->DeleteGlobalRef(HUMMER_BRIDGE_MAP[js_context]);
    HUMMER_BRIDGE_MAP.erase(js_context);
}
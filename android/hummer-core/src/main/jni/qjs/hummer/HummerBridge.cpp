#include <map>
#include <HummerJNI.h>
#include <TypeConvertor.h>
#include <QuickJSCache.h>

static std::map<long, jobject> HUMMER_BRIDGE_MAP;
static jmethodID HUMMER_BRIDGE_INVOKE_ID = nullptr;

static int INDEX_CLASS_NAME = 0;
static int INDEX_OBJECT_ID = 1;
static int INDEX_METHOD_NAME = 2;

static JSValue invoke(JSContext* ctx, JSValueConst thisObject, int argumentCount, JSValueConst* arguments) {
    long ctxId = QJS_CONTEXT_ID(ctx);
    jobject bridge = HUMMER_BRIDGE_MAP[ctxId];
    if (bridge == nullptr) return JS_NULL;

    JNIEnv* env = JNI_GetEnv();

    jlongArray params = nullptr;
    if (argumentCount > 3) {
        int methodParamsCount = argumentCount - 3;
        params = env->NewLongArray(methodParamsCount);
        jlong paramsC[methodParamsCount];
        for (int i = 3; i < argumentCount; i++) {
            paramsC[i - 3] = QJS_VALUE_PTR(arguments[i]);
        }
        env->SetLongArrayRegion(params, 0, methodParamsCount, paramsC);
    }

    int64_t objId;
    JS_ToInt64(ctx, &objId, arguments[INDEX_OBJECT_ID]);
    jstring className = TypeConvertor::JSString2JavaString(ctx, arguments[INDEX_CLASS_NAME]);
    jstring methodName = TypeConvertor::JSString2JavaString(ctx, arguments[INDEX_METHOD_NAME]);

    jlong ret = env->CallLongMethod(
            bridge, HUMMER_BRIDGE_INVOKE_ID,
            className, objId, methodName,
            params);

    env->DeleteLocalRef(className);
    env->DeleteLocalRef(methodName);
    env->DeleteLocalRef(params);

    JNI_DetachEnv();

    return QJS_VALUE(ret);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerBridge_initHummerBridge(JNIEnv *env, jobject thiz, jlong js_context) {
    auto jsContext = QJS_CONTEXT(js_context);

    jobject bridge = env->NewGlobalRef(thiz);
    HUMMER_BRIDGE_MAP[js_context] = bridge;

    HUMMER_BRIDGE_INVOKE_ID = env->GetMethodID(
            env->GetObjectClass(thiz),
            "invoke",
            "(Ljava/lang/String;JLjava/lang/String;[J)J");

    auto funcName = "invoke";
    auto invokeFunc = JS_NewCFunction(jsContext, invoke, funcName, 0);

    JS_SetPropertyStr(jsContext,
            JS_GetGlobalObject(jsContext),
            "invoke",
            invokeFunc);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerBridge_releaseHummerBridge(JNIEnv *env, jobject thiz, jlong js_context) {
    env->DeleteGlobalRef(HUMMER_BRIDGE_MAP[js_context]);
    HUMMER_BRIDGE_MAP.erase(js_context);
}
#include <map>
#include "HummerJNI.h"
#include "QuickJSCache.h"
#include "HummerRecycler.h"

static std::map<long, jobject> HUMMER_BRIDGE_MAP;
static jmethodID HUMMER_BRIDGE_INVOKE_ID = nullptr;

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerRecycler_init(JNIEnv *env, jobject thiz, jlong js_context) {
    jobject bridge = env->NewGlobalRef(thiz);
    HUMMER_BRIDGE_MAP[js_context] = bridge;
    HUMMER_BRIDGE_INVOKE_ID = env->GetMethodID(env->GetObjectClass(thiz), "recycle", "(J)V");
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerRecycler_release(JNIEnv *env, jobject thiz, jlong js_context) {
    HUMMER_BRIDGE_MAP.erase(js_context);
}

void HummerRecycler::recycle(long ctxId, int64_t objId) {
    jobject bridge = HUMMER_BRIDGE_MAP[ctxId];
    if (bridge != nullptr) {
        JNIEnv *env = JNI_GetEnv();
        env->CallVoidMethod(bridge, HUMMER_BRIDGE_INVOKE_ID, objId);
        JNI_DetachEnv();
    }
}
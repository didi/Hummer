#include <map>
#include <HummerJNI.h>
#include <QuickJSCache.h>
#include <HummerRecycler.h>

static std::map<long, jobject> HUMMER_RECYCLER_MAP;
static jmethodID HUMMER_RECYCLER_INVOKE_ID = nullptr;

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerRecycler_init(JNIEnv *env, jobject thiz, jlong js_context) {
    jobject recycler = env->NewGlobalRef(thiz);
    HUMMER_RECYCLER_MAP[js_context] = recycler;
    HUMMER_RECYCLER_INVOKE_ID = env->GetMethodID(env->GetObjectClass(thiz), "recycle", "(J)V");
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerRecycler_release(JNIEnv *env, jobject thiz, jlong js_context) {
    env->DeleteGlobalRef(HUMMER_RECYCLER_MAP[js_context]);
    HUMMER_RECYCLER_MAP.erase(js_context);
}

void HummerRecycler::recycle(long ctxId, int64_t objId) {
    jobject bridge = HUMMER_RECYCLER_MAP[ctxId];
    if (bridge != nullptr) {
        JNIEnv *env = JNI_GetEnv();
        env->CallVoidMethod(bridge, HUMMER_RECYCLER_INVOKE_ID, objId);
        JNI_DetachEnv();
    }
}
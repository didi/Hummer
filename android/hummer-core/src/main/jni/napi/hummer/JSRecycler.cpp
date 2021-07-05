//
// Created by XiaoFeng on 2021/6/29.
//

#include <map>
#include <HummerJNI.h>
#include <JSRecycler.h>

static std::map<int64_t, jobject> HUMMER_RECYCLER_MAP;
static jmethodID HUMMER_RECYCLER_INVOKE_ID = nullptr;

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSRecycler_init(JNIEnv *env, jobject thiz, jlong js_context) {
    jobject recycler = env->NewGlobalRef(thiz);
    HUMMER_RECYCLER_MAP[js_context] = recycler;
    HUMMER_RECYCLER_INVOKE_ID = env->GetMethodID(env->GetObjectClass(thiz), "recycle", "(J)V");
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_napi_jni_JSRecycler_release(JNIEnv *env, jobject thiz, jlong js_context) {
    env->DeleteGlobalRef(HUMMER_RECYCLER_MAP[js_context]);
    HUMMER_RECYCLER_MAP.erase(js_context);
}

void JSRecycler::recycle(int64_t ctxId, int64_t objId) {
    jobject bridge = HUMMER_RECYCLER_MAP[ctxId];
    if (bridge != nullptr) {
        JNIEnv *env = JNI_GetEnv();
        env->CallVoidMethod(bridge, HUMMER_RECYCLER_INVOKE_ID, objId);
        JNI_DetachEnv();
    }
}
//
// Created by XiaoFeng on 2020-08-21.
//

#include <jni.h>
#include <map>
#include "HummerJNI.h"
#include "HermesCache.h"
#include "JSException.h"
#include <hermes.h>
#include <jsi.h>

using namespace facebook::hermes;
using namespace facebook::jsi;

static int INDEX_CLASS_NAME = 0;
static int INDEX_OBJECT_ID = 1;
static int INDEX_METHOD_NAME = 2;

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerBridge_initHummerBridge(JNIEnv *env, jobject thiz, jlong js_context) {
    auto runtime = RUNTIME(js_context);

    jobject bridge = env->NewGlobalRef(thiz);

    jmethodID invokeId = env->GetMethodID(
            env->GetObjectClass(thiz),
            "invoke",
            "(Ljava/lang/String;JLjava/lang/String;[J)J");

    Function invoke = Function::createFromHostFunction(
            *runtime,
            PropNameID::forAscii(*runtime, "invoke"),
            4,
            [bridge, invokeId](Runtime &rt,
               const Value &thisVal,
               const Value *arguments,
               size_t argumentCount) {
                JNIEnv* env = JNI_GetEnv();

                jlongArray params = nullptr;
                if (argumentCount > 3) {
                    int methodParamsCount = argumentCount - 3;
                    params = env->NewLongArray(methodParamsCount);
                    jlong paramsC[methodParamsCount];
                    for (int i = 3; i < argumentCount; i++) {
                        Value value = Value(rt, arguments[i]);
                        paramsC[i - 3] = VALUE_ID(value);

                        // JS向Native传递的参数需要Protect一下，不然会有提前被释放的风险，但是会增加内存开销
//                        JS_DupValue(ctx, arguments[i]);
                    }
                    env->SetLongArrayRegion(params, 0, methodParamsCount, paramsC);
                }

                int64_t objId = arguments[INDEX_OBJECT_ID].getNumber();
                jstring className = env->NewStringUTF(arguments[INDEX_CLASS_NAME].getString(rt).utf8(rt).c_str());
                jstring methodName = env->NewStringUTF(arguments[INDEX_METHOD_NAME].getString(rt).utf8(rt).c_str());

                jlong ret = env->CallLongMethod(
                        bridge, invokeId,
                        className, objId, methodName,
                        params);

                env->DeleteLocalRef(className);
                env->DeleteLocalRef(methodName);
                env->DeleteLocalRef(params);

                JNI_DetachEnv();

                return VALUE(rt, ret);
            });

    try {
        runtime->global().setProperty(*runtime, "invoke", invoke);
    } catch (const facebook::jsi::JSIException &err) {
        reportException(runtime, err.what());
    } catch (const JSError &error) {
        reportException(runtime, error.what());
    } catch (const std::exception &ex) {
        reportException(runtime, ex.what());
    }
}

extern "C"
JNIEXPORT void JNICALL
Java_com_didi_hummer_core_engine_jsc_jni_HummerBridge_releaseHummerBridge(JNIEnv *env, jobject thiz, jlong js_context) {

}
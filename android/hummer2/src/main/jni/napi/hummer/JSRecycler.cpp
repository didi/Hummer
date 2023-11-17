//
// 原理：当JS对象被回收时，内部Recycler对象也会被回收，会触发Recycler的析构方法，从而触发这里的recycle方法，通过objId把Java对象移出对象池，释放对应的Java对象。
// 缺陷：这里有一个逻辑缺陷，当JS对象某个方法参数是一个Callback闭包函数时，如果闭包内部不显式引用外部对象，外部对象是不会被隐式持有的，当该方法走完后该JS对象就会被回收，但此时闭包并没有释放，还在继续执行逻辑（如定时器）。
// 此时如果想让对应的Java对象也不被回收，需要手动调用jsValue.protect()方法使JS对象引用计数+1，JS对象不回收，Java对象就不会被回收，注意这种情况需要在页面退出时的onDestroy方法中调用jsValue.unprotect()，使引用计数平衡，这样JS对象就会正常被回收了。
//
// Created by XiaoFeng on 2021/6/29.
//

#include "HummerJNI.h"
#include "JSRecycler.h"
#include "JSUtils.h"

namespace Recycler {
    typedef struct {
        int64_t ctxId;
        int64_t objId;
    } Recycler;

    const char *class_name = "Recycler";

    void class_finalizer(void *finalizeData, void *finalizeHint) {
        auto s = static_cast<Recycler *>(finalizeData);
        if (!s) {
            return;
        }

        JNIEnv *env = JNI_GetEnv();
        env->CallStaticVoidMethod(JSUtils::jsEngineCls, JSUtils::callJavaRecyclerMethodID, s->ctxId, s->objId);
        JNI_DetachEnv();

        free(s);
    }

    NAPIValue class_constructor(NAPIEnv env, NAPICallbackInfo info) {
        NAPIValue _this;
        napi_get_cb_info(env, info, nullptr, nullptr, &_this, nullptr);

        size_t argc;
        napi_get_cb_info(env, info, &argc, nullptr, nullptr, nullptr);
        NAPIValue argv[argc];
        napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr);

        auto s = static_cast<Recycler *>(malloc(sizeof(Recycler)));
        if (!s) {
            return _this;
        }

        s->ctxId = JSUtils::toJsContextPtr(env);
        double objId;
        napi_get_value_double(env, argv[0], &objId);
        s->objId = objId;

        NAPIValue result;
        napi_create_external(env, s, class_finalizer, nullptr, &result);
        return result;
    }
}

void JSRecycler::registerClass(NAPIEnv env) {
    NAPIValue result;
    auto status = NAPIDefineClass(env, Recycler::class_name, Recycler::class_constructor, nullptr, &result);
    if (status != NAPIExceptionOK) {
        return;
    }

    NAPIValue global = JSUtils::createJsGlobal(env);
    napi_set_named_property(env, global, Recycler::class_name, result);
}